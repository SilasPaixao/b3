export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/b3',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'sp===8730'
}
