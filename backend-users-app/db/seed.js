const { db } = require("./index.js");
const faker = require("faker");

let users = [];

for (let i = 0; i < 10; i++) {
  let username = faker.internet.userName();
  let email = faker.internet.email();
  let password = faker.internet.password();
  users.push(`('${username}', '${email}', '${password}')`);
}

users = users.join(", ");

db.none(`INSERT INTO users(username, email, password) VALUES ${users};`)
.catch(err => console.log(err));
