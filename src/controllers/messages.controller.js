import { MessagesService } from "../services/messages.service.js";

class MessagesController {
  constructor() {
    this.messagesService = new MessagesService();
  }

  async create(request, response) {
    try {
      const { channel_id } = request.params;
      const { text } = request.body;
      const message = await this.messagesService.create(channel_id, text);
      response.send(message);
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: "Error interno del servidor" });
    }
  }
  async getAllByChannel(request, response) {
    try {
      const { channel_id } = request.params;
      const messages = await this.messagesService.getAllByChannel(channel_id);
      response.send(messages);
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: "Error interno del servidor" });
    }
  }

}

export default new MessagesController();
