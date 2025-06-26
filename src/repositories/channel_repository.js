import Channel from "../models/Channel.model.js";

class ChannelRepository {
  async create({ title, description, isPrivate, workspace_id, created_at }) {
    try {
      const channel = new Channel({
        title,
        isPrivate,
        description,
        created_at,
        workspace_id,
      });
      await channel.save();
      console.log("channel creado exitosamente!");
    } catch (error) {
      console.error("Error al crear el channel:", error);
      throw error;
    }

    console.log("channel creado exitosamente!");
  }
  async findByName(title, workspaceId) {
    try {
      const channel = await Channel.findOne({
        title,
        workspace_id: workspaceId,
      });
      return channel;
    } catch (error) {
      throw error;
    }
  }
  async findById(id) {
    try {
      const channel = await Channel.findById(id);
      return channel;
    } catch (error) {
      throw error;
    }
  }

  async getAllByWorkspace(workspaceId) {
    try {
      const channels = await Channel.find({ workspace_id: workspaceId });
      return channels;
    } catch (error) {
      throw error;
    }
  }
}

const channel_repository = new ChannelRepository();

export default channel_repository;
