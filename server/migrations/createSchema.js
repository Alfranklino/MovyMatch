exports.up = pgm => {
  pgm.sql(`
        CREATE TABLE "movymatch"."users" (
            "id" SERIAL PRIMARY KEY NOT NULL,
            "password" VARCHAR(255) NOT NULL,
            "email" VARCHAR(255) NOT NULL UNIQUE,
            "date_created" DATE NOT NULL DEFAULT CURRENT_DATE,
            "date_of_birth" DATE,
            "fullname" VARCHAR(128),
            "phone_number" VARCHAR(32),
            "avatar" TEXT,
            "location" VARCHAR(64),
            "status" VARCHAR(64)
        );
    `),
    pgm.sql(`
        CREATE TABLE "movymatch"."movies" (
            "id" SERIAL PRIMARY KEY NOT NULL,
            "tmdbid" VARCHAR(255) NOT NULL UNIQUE,
            "imdbid" VARCHAR(255) NOT NULL UNIQUE
        );
    `),
    pgm.sql(`
        CREATE TABLE "movymatch"."watchedmovies" (
            "id" SERIAL PRIMARY KEY NOT NULL,
            "user_id" INT NOT NULL,
            "movie_tmdbid" VARCHAR(255) NOT NULL,
            "date_created" DATE NOT NULL DEFAULT CURRENT_DATE
        );
    `);
};
