import messagesService from "../services/messagesService.js";

export async function create(req, res, next) {
  try {
    const message = await messagesService.create(req.body);
    return res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}

export async function get(req, res, next) {
  try {
    const message = await messagesService.get();
    return res.status(200).json(message);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  get,
};
