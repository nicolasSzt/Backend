import ChannelMessage from "../models/channel_messages.model.js";

class MessagesRepository {
  async create({ channel_id, user_id, content }) {
    try {
      const message = new ChannelMessage({
        channel_id,
        user_id,
        content,
      });
      await message.save();
      console.log("Message created successfully!");
      return message;
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

const messages_repository = new MessagesRepository();
export default messages_repository;

