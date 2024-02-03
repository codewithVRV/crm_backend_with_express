import express from "express"
import userRouter from "./user_routes";
import ticketRouter from "./ticket_routes";

const v1Router = express.Router()

v1Router.use("/users", userRouter)
v1Router.use("/tickets", ticketRouter)


export default v1Router;