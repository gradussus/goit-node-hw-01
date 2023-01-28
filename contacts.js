const fs = require('fs').promises;
const path = require('path')
const { v4 } = require("uuid");

const contactsPath = path.resolve("./db/contacts.json")

async function listContacts() {
    const contacts = await fs.readFile(contactsPath)
    return JSON.parse(contacts)
  }
  
async  function getContactById(contactId) {
    const contacts = await listContacts()
    const desiredContact = contacts.find((c) => c.id === contactId)
    console.log(desiredContact)
    return desiredContact || console.log(`Sorry, no contact with this ID`)
  }
  
async  function removeContact(contactId) {
    const contacts = await listContacts()
    const contactsAfterRemove = contacts.filter(c => c.id !== contactId)
    console.table(contactsAfterRemove)
    fs.writeFile(contactsPath, JSON.stringify(contactsAfterRemove))
  }
  
async  function addContact(name, email, phone) {
    const contacts = await listContacts()
    const newContact = {id: v4(), name, email, phone}
    contacts.push(newContact)
    console.table(contacts)
    fs.writeFile(contactsPath, JSON.stringify(contacts))
  }

module.exports = {listContacts, getContactById, removeContact, addContact }