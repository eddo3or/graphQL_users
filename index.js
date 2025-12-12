const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schemas/userSchema.js");
const { resolvers } = require("./controllers/userController.js");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Server GraphQL ready at ${url} `);
});
