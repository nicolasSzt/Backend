import ChannelMessage from "../models/channel_messages.model.js";

class ChannelMessagesRepository {
  async create({ channel_id, user_id, content }) {
    try {
      const channel_message = new ChannelMessage({
        channel_id,
        user_id,
        content,
      });
      await channel_message.save();
      return channel_message;
    } catch (error) {
      console.error("Error creating message:", error);
      throw error;
    }
  }

  async getAllByChannel(channel_id) {
    try {
      const messages = await ChannelMessage.find({ channel_id });
      return messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
}

const channel_messages_repository = new ChannelMessagesRepository();
export default channel_messages_repository;
