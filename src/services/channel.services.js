import channel_repository from "../repositories/channel_repository.js";

class ChannelService {
  /**
     * @param {string} workspaceId - El id del workspace donde se creará el canal.
     * @param {string} name - El nombre del canal a crear.
     * @return {Object.channels} - Un objeto que contiene la lista actualizada de canales en el workspace.

     * @throws {Object} - Si el nombre del canal ya existe o no cumple con las validaciones.
     * @throws {Object.status} {number} - El código de estado de la respuesta (400).
     * @throws {Object.message} {string} - El mensaje de error.

    * @throws {Object} - Si el workspace no existe.
     * @throws {Object.status} {number} - El código de estado de la respuesta (404).
     * @throws {Object.message} {string} - El mensaje de error.
     */
  async create(workspaceId, name, description) {
    try {
      if (typeof name !== "string" || name.length >= 12) {
        throw {
          status: 400,
          message:
            "El nombre del canal debe ser un string con menos de 12 caracteres",
        };
      }
      const existingChannel = await channel_repository.findByName(
        name,
        workspaceId
      );
      if (existingChannel) {
        throw { status: 400, message: "El nombre del canal ya está en uso" };
      }
      const default_is_private = false;
      await channel_repository.create({
        description: description,
        name: name,
        workspace_id: workspaceId,
        isPrivate: default_is_private,
      });
      const channels = await channel_repository.getAllByWorkspace(workspaceId);
      return {
        channels,
      };
    } catch (error) {
      throw error;
    }
  }
  async getAllByWorkspaceId(workspace_id) {
    return await channel_repository.getAllByWorkspace(workspace_id);
  }
}

const channel_service = new ChannelService();
export default channel_service;
