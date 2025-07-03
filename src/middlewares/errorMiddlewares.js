import ApiResponse from "../utils/apiResponse";

const errorMiddleware = (error, request, response, next) => {
  console.error(error);
  if (error.status) {
    response
      .status(error.status)
      .json(new ApiResponse(response).clientError(error.message, error.status));
    return;
  } else {
    console.log("Hubo un error", error);
    response
      .status(500)
      .json(new ApiResponse(response).clientError(error.message, error.status));
  }
};
export default errorMiddleware;
