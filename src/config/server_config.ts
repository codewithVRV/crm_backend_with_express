// const dotenv = require("dotenv")
import dotenv from "dotenv"


dotenv.config()

export default  {
    PORT: process.env.PORT,
    MAIL_FROM: process.env.MAIL_FROM,
    SENDGRID_API_KEY: (process.env.SENDGRID_API_KEY === undefined) ? "" : process.env.SENDGRID_API_KEY,
    SALT_ROUNDS: (process.env.SALT_ROUNDS == undefined) ? 10 : +process.env.SALT_ROUNDS,
    SECRET_KEY: (process.env.SECRET_KEY == undefined) ? "dummy" : process.env.SECRET_KEY,
    EXPIRE_TOKEN: (process.env.EXPIRE_TOKEN == undefined) ? "1h" : process.env.EXPIRE_TOKEN,
}