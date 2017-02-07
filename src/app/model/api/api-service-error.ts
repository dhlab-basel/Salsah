/**
 * Error class used as API request response in ApiService
 */
export class ApiServiceError {

    /**
     * Status number
     */
    status: number = 0;

    /**
     * Status text
     */
    statusText: string = "";

    /**
     * API request
     */
    request: string = "";

}
