const { Pool } = require("pg");
const squel = require("squel").useFlavour("postgres");
const config = require("../config/default.json");

const usersSeeds = [
  {
    fullname: "Alcom",
    email: "alcom@gmail.com",
    password: "1234"
  },
  {
    fullname: "Bill",
    email: "bill@gmail.com",
    password: "abcd"
  }
];

const seed = async () => {
  const pg = await new Pool(config.db).connect();
  try {
    await pg.query("BEGIN");

    // Users Seeds
    console.log("Seeding Users...");
    await Promise.all(
      usersSeeds.map(usersSeed =>
        pg.query(
          squel
            .insert()
            .into("movymatch.users")
            .setFields(usersSeed)
            .toParam()
        )
      )
    );
    console.log("Seeding Users... [DONE]");
    await pg.query("COMMIT");
  } catch (e) {
    await pg.query("ROLLBACK"); //Reverses the changes in case of an error
    throw e;
  } finally {
    pg.release();
  }
};
seed().catch(e => {
  setImmediate(() => {
    throw e;
  });
});
