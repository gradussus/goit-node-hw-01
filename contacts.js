const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const desiredContact = contacts.find((c) => c.id === contactId);
    return desiredContact || console.log(`Sorry, no contact with this ID`);
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    if (contacts.length === 0) {
      return console.log("Sorry, you have already deleted all contacts");
    }
    const contactsAfterRemove = contacts.filter((c) => c.id !== contactId);
    if (contacts.length === contactsAfterRemove.length) {
      return console.log(
        `Sorry. We do not delete contact with ID ${contactId}, because we do not have contact with this ID`
      );
    }
    await fs.writeFile(contactsPath, JSON.stringify(contactsAfterRemove));
    return console.log(`Success. Contact with ID ${contactId} is deleted`);
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
