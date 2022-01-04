const { Before, After } = require("@cucumber/cucumber");
const assert = require("assert").strict;
const request = require("supertest");
const app = require("../../src/server");

//Hooks
After(async function () {
  await request(app).delete("/api/users/delete-all");
});

Before({ tags: "@create_user_id_1" }, async function () {
  const user = {
    username: "username01",
    password: "pass12345",
    email: "email01@gmail.com",
    status: 1,
    roles_id: 1,
  };
  await request(app).post("/api/users/create").send(user);
});

Before({ tags: "@clear_data_input" }, async function () {
  await request(app).delete("/api/users/delete-all");
});
