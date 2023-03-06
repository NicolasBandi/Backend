import ChatRepository from '../models/repositories/chatsRepository.js';
import Message from '../models/messageModel.js';
import MessageDto from '../models/dto/messagesDto.js';

const repository = new ChatRepository();

export async function create(data) {
  const message = await repository.create(new Message(data));
  return new MessageDto(message);
}

export async function get() {
  const messages = await repository.get();
  return messages.map((message) => new MessageDto(message));
}

export async function getByEmail(email) {
  const messages = await repository.getByEmail(email);
  return messages.map((message) => new MessageDto(message));
}

export default {
  create,
  get,
  getByEmail,
};
