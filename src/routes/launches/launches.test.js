const request = require("supertest");

const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const completeLaunchDate = {
    launchDate: "December 25, 2030",
    mission: "Kepler Exploration X",
    rocket: "Explorer X1",
    target: "Kepler-1652 b",
  };

  const launchDataWithoutDate = {
    // launchDate: "December 25, 2030",
    mission: "Kepler Exploration X",
    rocket: "Explorer X1",
    target: "Kepler-1652 b",
  };

  const launchWithInvalidDate = {
    launchDate: "Hello",
    mission: "Kepler Exploration X",
    rocket: "Explorer X1",
    target: "Kepler-1652 b",
  };

  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchDate)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchDate.launchDate).valueOf();
    const responseDate = response.body.launchDate.valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date",
    });
  });
});
