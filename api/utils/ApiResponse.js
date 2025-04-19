class ApiResponse {
    constructor(statsusCode = 200, message = "Success", data = null) {
        this.statusCode = statsusCode;
        this.message = message;
        this.data = data;
        this.success = true;
    }
}
export default ApiResponse;