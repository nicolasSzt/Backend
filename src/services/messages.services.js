import messages_repository from "../repositories/messages.respository.js";
class MessagesService {
  constructor() {
    this.messages_repository = messages_repository;
  }
  async create(user_id, channel_id, text) {
    try {
      const message = await this.messages_repository.create({
        user_id,
        channel_id,
        text,
      });
      return message;
    } catch (error) {
      throw error;
    }
  }
  async getAllByChannel(channel_id) {
    try {
      const messages = await this.messages_repository.getAllByChannel(
        channel_id
      );
      return messages;
    } catch (error) {
      throw error;
    }
  }
}
export default MessagesService;
