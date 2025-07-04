class ApiResponse {
  constructor(response) {
    this.response = response;
  }

  send({ status = 200, message = "Success", data = {}, ok = true }) {
    return this.response.status(status).json({
      ok,
      status,
      message,
      data,
    });
    
  }

  success(message = "Success", data = {}) {
    return this.response.json({
      status: 200,
      ok: true,
      message,
      data,
    });
  }

  created(message = "Created successfully", data = {}) {
    return this.response.json({
      status: 201,
      ok: true,
      message,
      data,
    });
  }

  error(message = "Internal server error", status = 500, data = {}) {
    return this.json({
      status,
      ok: false,
      message,
      data,
    });
  }
  clientError(message = "Bad request", data = {}) {
    return this.response.json({
      status: 400,
      ok: false,
      message,
      data,
    });
  }
}

export default ApiResponse;
