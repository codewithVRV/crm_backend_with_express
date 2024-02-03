import { ReasonPhrases, StatusCodes } from "http-status-codes";
import GenericError from "./generic";

export default class UnAuthorizedError extends GenericError {

    constructor(message?:string) {
        const errorMessage: string = (message) ? message : "Invalid login credentials! Please try again later!";
        super(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, errorMessage, "UnAuthorizedError");

    }

}