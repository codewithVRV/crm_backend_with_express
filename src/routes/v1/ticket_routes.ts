import express from "express"
import { isAdminOrEngineer, isLoggedIn } from "../../validators/auth_validator";
import ticket_controller from "../../conrollers/ticket_controller";
import { updateTicketValidator } from "../../validators/ticket_validator";

const ticketRouter = express.Router()

ticketRouter.post("/", [isLoggedIn], ticket_controller.createTicket)
ticketRouter.patch("/:id", [isLoggedIn, isAdminOrEngineer, updateTicketValidator], ticket_controller.updateTicket)


export default ticketRouter;