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
    return this.send({
      status: 200,
      ok: true,
      message,
      data,
    });
  }

  created(message = "Created successfully", data = {}) {
    return this.send({
      status: 201,
      ok: true,
      message,
      data,
    });
  }

  error(message = "Internal server error", status = 500, data = {}) {
    return this.send({
      status,
      ok: false,
      message,
      data,
    });
  }

  badRequest(message = "Bad request", data = {}) {
    return this.error(message, 400, data);
  }

  notFound(message = "Not found", data = {}) {
    return this.error(message, 404, data);
  }
}

export default ApiResponse;
