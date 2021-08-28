# Back-end

## Getting started

1. Clone the repository
2. `cd src/back-end`
3. Install the dependencies
   ```bash
   $ npm install
   ```
4. Set up the environment variables
   ```bash
   $ cp .env.sample .env
   $ vi .env
   ```
5. Run the application in development mode
   ```bash
   $ npm run dev
   ```

## Environment variables

| Name              | Description                                    |
| ----------------- | ---------------------------------------------- |
| Port              | The port to listen by the webserver            |
| Host              | The host the web app listens to. Eg: localhost |
| DB_URI            | The mongo database connection url              |
| ACCESS_TOKEN_TTL  | Access token expiration time                   |
| REFRESH_TOKEN_TTL | Refresh token expiration time                  |
| PUBLIC_KEY        | Key for the jwt access token                   |
| PRIVATE_KEY       | Key for the jwt refresh token                  |
