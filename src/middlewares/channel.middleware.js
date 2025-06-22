import channel_repository from "../repositories/channel_repository";

const channelMiddleware = async (req, res, next) => {
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
      response.status(error.status).send({
        message: error.message,
        ok: false,
      });
      return;
    } else {
      console.log("Hubo un error", error);
      response
        .status(500)
        .send({ message: "Error interno del servidor", ok: false });
    }
  }
};

export default channelMiddleware;
