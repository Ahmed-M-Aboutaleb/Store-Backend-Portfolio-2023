# Store Back-End

## Description

This is the back-end for the store application. It is built using NestJS and uses a Mongodb database.

## Installation

Create a .env file in the root directory and add the following variables:

```bash
NODE_ENV=<your node environment>
SERVER_PORT=<your server port>

MONGO_URI=<your mongodb uri>
JWT_SECRET=<your jwt secret>
```

Install the dependencies:

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

This project is [GNU licensed](LICENSE).
