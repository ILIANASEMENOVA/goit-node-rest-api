import * as fs from "node:fs/promises";

import * as path from "path";

import { nanoid } from "nanoid";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

//  Розкоментуй і запиши значення
const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function getAllContacts() {
  // ...твій код. Повертає масив контактів.
  const conatacts = await fs.readFile(contactsPath);
  return JSON.parse(conatacts);
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await getAllContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

const updateContact = async (contactId, data) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

async function deleteContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function createContact(data) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contacts = await getAllContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export default {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
