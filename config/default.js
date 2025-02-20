module.exports = {
  port: process.env.PORT || 3000,
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/mydb'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key'
  }
}; 