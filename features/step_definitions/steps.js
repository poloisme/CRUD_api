const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
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

//create a new user
Given("A user {}", function (request) {
  this.context["request"] = JSON.parse(request);
});

When("I send POST request to {}", async function (path) {
  this.context["response"] = await request(app)
    .post(path)
    .send(this.context["request"]);
});

Then("I get response POST request code {int}", async function (code) {
  assert.equal(this.context["response"].statusCode, code);
});

//get all user
When("I send GET request to {}", async function (path) {
  this.context["response"] = await request(app).get(path);
});

Then("I get response GET all user request code {int}", async function (code) {
  assert.equal(this.context["response"].statusCode, code);
});

//get a user by id
Given("The user with {int} exist", function (id) {
  this.context["id"] = id;
});

When("I send GET one user request to {}", async function (path) {
  this.context["response"] = await request(app).get(
    `${path}/${this.context["id"]}`
  );
});

Then("I get response GET one user request code {int}", async function (code) {
  assert.equal(this.context["response"].statusCode, code);
});

//update a user by id
Given("The user update with {int} exist", function (id) {
  this.context["id"] = id;
});

When(
  "I send PUT request update one user with a {} to {}",
  async function (req, path) {
    this.context["request"] = JSON.parse(req);
    this.context["response"] = await request(app)
      .put(`${path}/${this.context["id"]}`)
      .send(this.context["request"]);
  }
);

Then("I get response PUT request code {int}", async function (code) {
  assert.equal(this.context["response"].statusCode, code);
});

//delete a user by id
Given("The user delete with {int} exist", function (id) {
  this.context["id"] = id;
});

When("I send DELETE request to {}", async function (path) {
  this.context["response"] = await request(app).delete(
    `${path}/${this.context["id"]}`
  );
});

Then("I get response DELETE request code {int}", async function (code) {
  assert.equal(this.context["response"].statusCode, code);
});

//delete all user
When("I send DELETE all request to {}", async function (path) {
  this.context["response"] = await request(app).delete(path);
});

Then("I get response DELETE all request code {int}", async function (code) {
  assert.equal(this.context["response"].statusCode, code);
});
