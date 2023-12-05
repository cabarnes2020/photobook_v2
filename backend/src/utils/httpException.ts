

// Creating own error class to override default "Error" class
//Do this to get rid of html error stacks in postman, and just overall readibility and control for errors
export default class HttpException extends Error {
    status?: number;
    message: string;

    constructor(status: number, message: string){
        super(message);
        this.status = status;
        this.message = message;
    }
}