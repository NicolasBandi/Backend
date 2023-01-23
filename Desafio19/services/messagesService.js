import MessageRepository from "../models/repositories/messagesRepository.js";
import Message from "../models/messageModel.js";
import MessageDto from "../models/dto/messagesDto.js";

const repository = new MessageRepository();

export async function create(data) {
  //   const dataClean = pick(data, ['firstname','lastname','dni'])
  const message = await repository.create(new Message(data));
  return new MessageDto(message);
}

export async function get() {
  const message = await repository.get();
//   console.log('service', message);
  return message.map((message) => new MessageDto(message));
//   return new MessageDto(message)
}

export default {
  create,
  get,
};