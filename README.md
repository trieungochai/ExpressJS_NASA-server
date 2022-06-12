Automating Full Stack Applications with NPM

1.  cd NASA

    <code>npm init -y</code>

2.  cd NASA/package.json

        "scripts": {
          "install-server": "npm install --prefix server",
          "install-client": "npm install --prefix client",
          "install": "npm run install-server && install-client",
          <!-- cd server && npm run watch -->
          "server": "npm run watch --prefix server",
          <!-- cd client && npm run watch -->
          "client": "npm start --prefix client",
          "watch": "npm run server & npm run client",
          "test": "npm run test --prefix server && npm run test --prefix client"
    },
