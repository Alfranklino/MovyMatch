const queryResolvers = require("./resolvers/query/queryResolvers");
const mutationUserResolvers = require("./resolvers/mutation/mutationResolvers");

module.exports = {
  ...queryResolvers,
  ...mutationUserResolvers
};
