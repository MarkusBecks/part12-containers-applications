db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    },
  ],
})

db.createCollection('contacts')

db.contacts.insert({ name: 'Arto Hellas', number: '040-123456' })
db.contacts.insert({ name: 'Ada Lovelace', number: '39-44-5323523' })
db.contacts.insert({ name: 'Dan Abramov', number: '12-43-234345' })
db.contacts.insert({ name: 'Mary Poppendiec', number: '39-23-6423122' })
