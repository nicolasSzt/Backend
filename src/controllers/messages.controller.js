import channel_messages_service from "../services/channel_messages.services.js";
import ApiResponse from "../utils/apiResponse.js";

class MessagesController {
  async create(request, response) {
    const apiResponse = new ApiResponse(response);
    try {
      const { content } = request.body;

      if (!content || content.trim() === "") {
        return apiResponse.error("Content is required", 400);
      }

      const messages_list = await channel_messages_service.create({
        user_id: request.user.id,
        channel_id: request.channel._id,
        content,
      });

      return apiResponse.created("Mensaje creado exitosamente", {
        messages: messages_list,
      });
    } catch (error) {
      console.error("Hubo un error", error);
      if (error.status) {
        return apiResponse.error(error.message, error.status);
      }
      return apiResponse.error();
    }
  }

  async getAllByChannel(request, response) {
    const apiResponse = new ApiResponse(response);
    try {
      const { channel_id } = request.params;
      
      const messages_list = await channel_messages_service.getAllByChannelId({
        channel_id: channel_id,
      });

      return apiResponse.success("Mensajes obtenidos exitosamente", {
        messages: messages_list,
      });
    } catch (error) {
      console.error("Hubo un error", error);
      if (error.status) {
        return apiResponse.error(error.message, error.status);
      }
      return apiResponse.error();
    }
  }
}

const messages_controller = new MessagesController();
export default messages_controller;
