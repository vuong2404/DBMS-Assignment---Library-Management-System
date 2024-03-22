require("dotenv").config();

module.exports = {
<<<<<<< HEAD
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3001,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "Ngocquynguyen1",
  DB_DATABASE: process.env.DB_DATABASE || "library",
  SECRET_JWT: process.env.SECRET_JWT || "",
};
=======
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3003,
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_DATABASE: process.env.DB_DATABASE || 'lms',
    SECRET_JWT: process.env.SECRET_JWT || "",
};  
>>>>>>> d9f7b62d53dd44e4b7c2ad2994b21a74615245a0
