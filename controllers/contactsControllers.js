import contacts from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

// import contactsSchemas from "../schemas/contactsSchemas";

export const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.getAllContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.deleteContact(id);
    if (!result) {
      throw HttpError(404, "not found");
    }
    res.json({ message: "delete sucsess" });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const result = await contacts.createContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};
