
[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Preparation

```bash
$ docker run --name postgres -p5432:5432 -e POSTGRES_PASSWORD=root -e POSTGRES_DB=exchange -e POSTGRES_USER=root -d postgres:11.5
```
## Installation

```bash
$ npm install
```

## Debug
https://github.com/nestjs/nest/issues/993#issuecomment-461189430

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
