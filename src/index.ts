import express, {Express, Request, Response, } from "express"
import { PrismaClient } from "@prisma/client"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import responseTime from "response-time"
const app : Express = express()
const prisma = new PrismaClient()



import ServerConfig from "../src/config/server_config"
import apiRouter from "./routes"
import { isAdmin, isLoggedIn } from "./validators/auth_validator"




app.use(cookieParser())
app.use(responseTime())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.text())

app.use("/api", apiRouter)
app.get("/api/v1/ping", [isLoggedIn, isAdmin], (req : Request, res : Response) => {
    return res.json({mess: "validate request successfully"})
})
app.listen(ServerConfig.PORT, async () => {
    console.log(`App is listening port at no ${ServerConfig.PORT}`)
    // const user = await prisma.user.create({
    //     data: {
    //         name: "vishnu kumar",
    //         email: "vk47@gmail.com",
    //         password: "12345",
    //     }
    // })
    // console.log("user is", user)
    // const user = await prisma.user.findMany()

})