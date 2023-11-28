

// Creating own error class to override default "Error" class
//Do this to get rid of html error stacks in postman, and just overall readibility and control for errors
export default class HttpException extends Error {
    status?: number;
    message: string;
    error: string | null;

    constructor(message: string, status: number, error: string | null){
        super(message);
        this.status = status;
        this.message = message;
        this.error = error || null
    }
}