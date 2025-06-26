import channel_service from "../services/channel.services.js";
import ApiResponse from "../utils/apiResponse.js";

class ChannelController {
  async create(request, response) {
    const apiResponse = new ApiResponse(response);
    try {
      const { workspace_id } = request.params;
      const { title, description } = request.body;

      const { channels } = await channel_service.create(
        workspace_id,
        title,
        description
      );

      return apiResponse.created(
        "Canal creado exitosamente",
        { channels }
      );
    } catch (error) {
      if (error.status) {
        return apiResponse.error(error.message, error.status);
      }
      console.error("Hubo un error", error);
      return apiResponse.error();
    }
  }

  async getAllByWorkspaceId(request, response) {
    const apiResponse = new ApiResponse(response);
    try {
      const { workspace_id } = request.params;
      const channels = await channel_service.getAllByWorkspaceId(workspace_id);

      return apiResponse.success(
        "Canales obtenidos exitosamente",
        { channels }
      );
    } catch (error) {
      if (error.status) {
        return apiResponse.error(error.message, error.status);
      }
      console.error("Hubo un error", error);
      return apiResponse.error();
    }
  }
}

const channel_controller = new ChannelController();
export default channel_controller;
