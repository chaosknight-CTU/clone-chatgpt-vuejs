class ApiError extends Error {
  constructor(code, message) {
    super();
    this.statusCode = code;
    this.message = message;
  }
}

export default ApiError;
