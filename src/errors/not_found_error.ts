import { ReasonPhrases, StatusCodes } from "http-status-codes";
import GenericError from "./generic";

export default class NotFoundError extends GenericError {

    constructor(resourceName: string, property: string, propertyValue: string) {
        const errorMessage: string = `The Resource: ${resourceName} with property ${property} : ${propertyValue} not Found!`;
        super(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, errorMessage, "NotFoundError");

    }

}