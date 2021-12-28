const { Given, When, Then, AfterAll, After } = require("@cucumber/cucumber");
const assert = require("assert").strict;
const request = require("supertest");
const app = require("../../src/server");

//[POST] create new user
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

//[GET] get all user
When("I send GET request to {}", async function (path) {
  this.context["response"] = await request(app).get(path);
});

Then("I get response GET all user request code {int}", async function (code) {
  assert.equal(this.context["response"].statusCode, code);
});

//[GET] get one user
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

// Given("The other user with {int} exist", function (id) {
//   this.context["id"] = id;
// });

// When("I send GET one other user request to {}", async function (path) {
//   this.context["response"] = await request(app).get(
//     `${path}/${this.context["id"]}`
//   );
// });

// Then("I get receive {}", async function (response) {
//   assert.deepEqual(this.context["response"].body.data, JSON.parse(response));
// });

//[PUT] update one user
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

//[DELETE] delete one user
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

//[DELETE] delete all user
When("I send DELETE all request to {}", async function (path) {
  this.context["response"] = await request(app).delete(path);
});

Then("I get response DELETE all request code {int}", async function (code) {
  assert.equal(this.context["response"].statusCode, code);
});
