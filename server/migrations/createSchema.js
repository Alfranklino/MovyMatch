exports.up = pgm => {
  //1. Users Table
  pgm.sql(`
        CREATE TABLE "movymatch"."users" (
            "id" VARCHAR(255) PRIMARY KEY NOT NULL,
            "email" VARCHAR(255) NOT NULL,
            "date_created" DATE NOT NULL DEFAULT CURRENT_DATE,
            "fullname" VARCHAR(128),
            "phone_number" VARCHAR(32),
            "avatar" TEXT,
            "location" VARCHAR(64)
        );
    `);
};
