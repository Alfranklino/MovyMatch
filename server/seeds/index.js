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
  },
  {
    fullname: "Gina",
    email: "gina@gmail.com",
    password: "1234"
  },
  {
    fullname: "John",
    email: "john@gmail.com",
    password: "abcd"
  }
];

const moviesSeeds = [
  {
    tmdbid: "420818",
    imdbid: "tt6105098"
  },
  {
    tmdbid: "299534",
    imdbid: "tt4154796"
  },
  {
    tmdbid: "384018",
    imdbid: "tt6806448"
  },
  {
    tmdbid: "429617",
    imdbid: "tt6320628"
  },
  {
    tmdbid: "399579",
    imdbid: "tt0437086"
  },
  {
    tmdbid: "287947",
    imdbid: "tt0448115"
  },
  {
    tmdbid: "301528",
    imdbid: "tt1979376"
  }
];

const watchedMoviesSeeds = [
  {
    user_id: 1,
    movie_tmdbid: "301528"
  },
  {
    user_id: 1,
    movie_tmdbid: "287947"
  },
  {
    user_id: 2,
    movie_tmdbid: "301528"
  },
  {
    user_id: 2,
    movie_tmdbid: "420818"
  },
  {
    user_id: 2,
    movie_tmdbid: "384018"
  },
  {
    user_id: 3,
    movie_tmdbid: "301528"
  },
  {
    user_id: 3,
    movie_tmdbid: "429617"
  },
  {
    user_id: 4,
    movie_tmdbid: "420818"
  },
  {
    user_id: 4,
    movie_tmdbid: "399579"
  },
  {
    user_id: 4,
    movie_tmdbid: "301528"
  },
  {
    user_id: 2,
    movie_tmdbid: "299534"
  },
  {
    user_id: 1,
    movie_tmdbid: "420818"
  },
  {
    user_id: 1,
    movie_tmdbid: "399579"
  },
  {
    user_id: 4,
    movie_tmdbid: "384018"
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

    // Movies Seeds
    console.log("Seeding Movies...");
    await Promise.all(
      moviesSeeds.map(moviesSeed =>
        pg.query(
          squel
            .insert()
            .into("movymatch.movies")
            .setFields(moviesSeed)
            .toParam()
        )
      )
    );
    console.log("Seeding Movies... [DONE]");

    // WatchedMovies Seeds
    console.log("Seeding WatchedMovies...");
    await Promise.all(
      watchedMoviesSeeds.map(watchedMovieSeed =>
        pg.query(
          squel
            .insert()
            .into("movymatch.watchedmovies")
            .setFields(watchedMovieSeed)
            .toParam()
        )
      )
    );
    console.log("Seeding WatchedMovies... [DONE]");

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
