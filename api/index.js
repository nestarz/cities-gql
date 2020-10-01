const users = require("../geonames-france-cities-with-a-population-1000.json");

const typeDefs = `
  type Query {
    cities(name: String, country: String): [City]
  }
  type City {
    admin4_code: String,
    name: String,
    modification_date: String,
    country: String,
    feature_class: String,
    admin3_code: String,
    alternate_names: String,
    feature_code: String,
    longitude: Float,
    geoname_id: String,
    timezone: String,
    dem: Int,
    country_code: String,
    ascii_name: String,
    latitude: Float,
    admin1_code: String,
    coordinates: [Float],
    admin2_code: String,
    population: Int
  }
`;

const resolvers = {
  Query: {
    cities: (_, args) =>
      users
        .filter(
          ({ fields: { name, country } }) =>
            args.name.toLowerCase() === name.toLowerCase() &&
            (!args.country ||
              args.country.toLowerCase() === country.toLowerCase())
        )
        .map(({ fields }) => fields),
  },
};

// const express = require("express");
// const { ApolloServer, gql } = require("apollo-server-express");

const { ApolloServer } = require("@saeris/apollo-server-vercel");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

module.exports = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  },
});

// const app = express();
// server.applyMiddleware({ app });

// app.listen(3001, () => {
//   console.log("Go to http://localhost:3000/graphiql to run queries!");
// });
