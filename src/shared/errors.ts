/* eslint-disable max-len */
import HttpStatusCodes from 'http-status-codes';


export abstract class CustomError extends Error {

    public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor(msg: string, httpStatus: number) {
        super(msg);
        this.HttpStatus = httpStatus;
    }
}


export class ParamMissingError extends CustomError {

    public static readonly Msg = 'One or more of the required parameters was missing.';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
    }
}


export class ConstellationNotFoundError extends CustomError {

    public static readonly Msg = 'A constellation with the given id does not exists in the database.';
    public static readonly HttpStatus = HttpStatusCodes.NOT_FOUND;

    constructor() {
        super(ConstellationNotFoundError.Msg, ConstellationNotFoundError.HttpStatus);
    }
}

export class DuplicateError extends CustomError {

    public static readonly Msg = 'A constellation with the same name already exists.';
    public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

    constructor() {
        super(DuplicateError.Msg, DuplicateError.HttpStatus);
    }
}
