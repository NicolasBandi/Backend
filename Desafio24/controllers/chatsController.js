import chatsService from "../services/chatsService.js";

export async function create(req, res, next) {
  try {
    const message = await chatsService.create(req.body);
    return res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}

export async function get(req, res, next) {
  try {
    const messages = await chatsService.get();
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
}

export async function getByEmail(req, res, next) {
  try {
    const messages = await chatsService.getByEmail(req.params.email);
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  get,
  getByEmail,
};
