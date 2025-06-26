import ChannelMessage from "../models/channel_messages.model.js";

class ChannelRepository {
  async create({ channel_id, content, user_id, created_at }) {
    try {
      const channel = new ChannelMessage({
        channel_id,
        content,
        user_id,
        created_at,
      });

      await channel.save();
      console.log("channel creado exitosamente!");
    } catch (error) {
      console.error("Error creating channel:", error);
    }
  }
  async getAllByChannelId(channel_id) {
    const channel_messages = await ChannelMessage.find({
      channel_id: channel_id,
    }).populate("user_id", "name");

    const channel_messages_formatted = channel_messages.map(
      (channel_message) => {
        return {
          _id: channel_message._id,
          user: channel_message.user_id,
          content: channel_message.content,
          created_at: channel_message.created_at,
        };
      }
    );
    return channel_messages_formatted;
  }
}

const channel_repository = new ChannelRepository();

export default channel_repository;
