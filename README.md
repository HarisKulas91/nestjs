## ORM & DB migrations

The project uses [Prisma ORM](https://www.prisma.io/), which is configured to introspect the DB schema and then build a typed DB client upon the introspected schema. This affects db migration flow you might be used to, therefore we've decided to describe the flow in a more detailed way:

1. For changing DB schema, we've included a db migration framework [db-migrate](https://db-migrate.readthedocs.io/en/latest/) that is already configured to use local database and expects migrations files in plain `sql`.

Here are the basic commands:

```bash
# Create a new migration file
$ npx db-migrate create <migration_name>

# Apply the schema changes
$ npx db-migrate up

# Revert the schema changes
$ npx db-migrate down
```

2. After you're done with the schema changes, introspect the schema and build the db client:

```bash
# Introspect the db schema
$ npx prisma db pull

# Build the db client
$ npx prisma generate
```

## Installation

Please read these instructions carefully.

Make sure you have installed the latest NodeJS version, Docker, Docker Compose. You would also need to have [pg_restore](https://www.postgresql.org/docs/9.2/app-pgrestore.html) available on your PATH and ports `3000` and `5432` are not already in use.

1. Install the packages and spin up a postgres database

```bash
$ npm install
$ npx prisma generate
$ docker compose up -d
```

2. Create the tables and seed the db with real data

```bash
# You'll be asked to enter a DB password. Look for it in .env (POSTGRES_PASSWORD).
$ npm run db:seed
```

3. Run the load test
   This step is required for Level 2, but we recommend doing it regardless of you're going to do Level 2 or not. As mentioned in Level 2 requirements, you'll need to commit `before.json` and `after.json` load test report in order to benchmark the optimization efforts. This step will generate `before.json`.

```bash
# run the app
$ npm run start:dev

# run load test and generate the report
npm run test:load -- -o before.json
```

## Running the app

```bash
# make sure the required services are running
$ docker compose up -d

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

# load tests - app should run on localhost:3000 before runing the load test
$ npm run test:load -- -o <load_test_report_filename.json (i.e before.json)>
```
