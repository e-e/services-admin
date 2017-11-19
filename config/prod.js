module.exports = {
  port: process.env.PORT,
  admin: {
    un: process.env.SUPER_UN,
    pw: process.env.SUPER_PW
  },
  mongodb: {
    uri: process.env.MONGO_URI,
    un: process.env.MONGO_UN,
    pw: process.env.MONGO_PW
  }
};
