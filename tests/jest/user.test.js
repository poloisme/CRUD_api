const request = require("supertest");
const app = require("../../src/server");

describe("POST /api/users/create", () => {
  describe("create new user success", () => {
    //should response status code 201
    test("should response status code 201", async () => {
      const user = {
        username: "username01",
        password: "pass12345",
        email: "email01@gmail.com",
        status: 1,
        roles_id: 1,
      };
      const res = await request(app).post("/api/users/create").send(user);
      expect(res.statusCode).toBe(201);
    });
    //should response a json object
    test("should response object user", async () => {
      const user = {
        username: "username02",
        password: "pass12345",
        email: "email02@gmail.com",
        status: 10,
        roles_id: 1,
      };
      const res = await request(app).post("/api/users/create").send(user);
      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty("id");
      expect(res.body.data).toHaveProperty("username", user.username);
      expect(res.body.data).toHaveProperty("password_hash");
      expect(res.body.data).toHaveProperty("email", user.email);
      expect(res.body.data).toHaveProperty("status", user.status);
      expect(res.body.data).toHaveProperty("roles_id", user.roles_id);
    });
    //should response status code 201
    test("when data not required not to exist(status, roles_id) should response status code 201", async () => {
      const user = {
        username: "username03",
        password: "pass12345",
        email: "email03@gmail.com",
        status: 10,
      };
      const res = await request(app).post("/api/users/create").send(user);
      expect(res.statusCode).toBe(201);
    });
  });
  describe("create new user fail", () => {
    //should response status code 400
    test("when username invalid(username not enough length) should response status code 400", async () => {
      const user = {
        username: "use",
        password: "pass12345",
        email: "email09@gmail.com",
        status: 10,
        roles_id: 1,
      };
      const res = await request(app).post("/api/users/create").send(user);
      expect(res.statusCode).toBe(400);
    });
    test("when email invalid should response status code 400", async () => {
      const user = {
        username: "username01",
        password: "pass12345",
        email: "email01@gmail",
        status: 10,
        roles_id: 1,
      };
      const res = await request(app).post("/api/users/create").send(user);
      expect(res.statusCode).toBe(400);
    });
    test("when data required not to exist(username, password, email) should response status code 400", async () => {
      const user = {
        password: "pass12345",
        email: "email01@gmail",
        status: 10,
        roles_id: 1,
      };
      const res = await request(app).post("/api/users/create").send(user);
      expect(res.statusCode).toBe(400);
    });
  });
});

describe("GET /api/users", () => {
  describe("get all user success", () => {
    //should response status code 200
    test("should response status code 200", async () => {
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toBe(200);
    });
  });
  // describe("get all user fail", () => {
  //   //should response status code 500
  //   test("when have no data should response status code 500", async () => {
  //     const res = await request(app).get("/api/users");
  //     expect(res.statusCode).toBe(500);
  //   });
  // });
});

describe("GET /api/users/:id", () => {
  describe("get one user success", () => {
    //should response status code 200
    test("when exist user id 1 should response status code 200", async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.statusCode).toBe(200);
    });
  });
  // describe("get one user fail", () => {
  //   //should response status code 200
  //   test("when have no user id 1 should response status code 200", async () => {
  //     const res = await request(app).get("/api/users/1");
  //     expect(res.statusCode).toBe(404);
  //   });
  // });
});

// describe("PUT /api/users/:id", () => {
//   describe("update one user success", () => {
//     //should response status code 201
//     test("when update all filed should response status code 201", async () => {
//       const user = {
//         username: "username05",
//         password: "pass12345",
//         email: "email01@gmail.com",
//         status: 10,
//         roles_id: 1,
//       };
//       const res = await request(app).put("/api/users/1").send(user);
//       expect(res.statusCode).toBe(201);
//     });
//     test("when update some filed should response status code 201", async () => {
//       const user = {
//         username: "username02",
//         status: 10,
//         roles_id: 1,
//       };
//       const res = await request(app).put("/api/users/1").send(user);
//       expect(res.statusCode).toBe(201);
//     });
//   });
//   describe("update one user fail", () => {
//     //should response status code 400
//     test("when username invalid(username not enough length) should response status code 400", async () => {
//       const user = {
//         username: "use",
//         password: "pass12345",
//         email: "email09@gmail.com",
//         status: 10,
//         roles_id: 1,
//       };
//       const res = await request(app).put("/api/users/1").send(user);
//       expect(res.statusCode).toBe(400);
//     });
//     test("when user id not exist should response status code 400", async () => {
//       const user = {
//         username: "use",
//         password: "pass12345",
//         email: "email09@gmail.com",
//         status: 10,
//         roles_id: 1,
//       };
//       const res = await request(app).put("/api/users/100").send(user);
//       expect(res.statusCode).toBe(400);
//     });
//   });
// });

// describe("DELETE /api/users/:id", () => {
//   describe("delete one user success", () => {
//     //should response status code 200
//     test("when exist user id 1 should response status code 200", async () => {
//       const res = await request(app).delete("/api/users/1");
//       expect(res.statusCode).toBe(200);
//     });
//   });
//   describe("delete one user fail", () => {
//     //should response status code 404
//     test("when user id not exist should response status code 404", async () => {
//       const res = await request(app).delete("/api/users/100");
//       expect(res.statusCode).toBe(404);
//     });
//   });
// });

// describe("DELETE /api/users/delete-all", () => {
//   describe("delete all user success", () => {
//     //should response status code 200
//     test("should response status code 200", async () => {
//       const res = await request(app).delete("/api/users/delete-all");
//       expect(res.statusCode).toBe(200);
//     });
//   });
// });
