import channel_repository from "../repositories/channel_repository.js";
import ApiResponse from "../utils/apiResponse.js";

const channelMiddleware = async (req, res, next) => {
  const apiResponse = new ApiResponse(res);
  const { channel_id } = req.params;
  const workspace = req.workspace;
  try {
    const channel = await channel_repository.findById(channel_id);
    if (!channel) {
      throw { status: 404, message: "Channel not found" };
    }
    if (channel.workspace_id.toString() !== workspace._id.toString()) {
      throw {
        status: 403,
        message: "This channel is not part of this workspace",
      };
    }
    req.channel = channel;
    next();
  } catch (error) {
    if (error.status) {
      return apiResponse.error(error.message, error.status);
    } else {
      console.error("Hubo un error", error);
      return apiResponse.error();
    }
  }
};

export default channelMiddleware;
