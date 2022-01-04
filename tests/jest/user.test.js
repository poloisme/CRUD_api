const request = require("supertest");
const app = require("../../src/server");

describe("POST /api/users/create", () => {
  describe("create new user success", () => {
    describe("when send post request with valid data should response status code 201", () => {
      beforeEach(async () => {
        await request(app).delete("/api/users/delete-all");
      });
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
      afterEach(async () => {
        await request(app).delete("/api/users/delete-all");
      });
    });
    describe("when send post request with valid data should response a json object", () => {
      beforeEach(async () => {
        await request(app).delete("/api/users/delete-all");
      });
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
      afterEach(async () => {
        await request(app).delete("/api/users/delete-all");
      });
    });
  });
  describe("create new user fail", () => {
    describe("when send post request with invalid data should response status code 400", () => {
      beforeEach(async () => {
        await request(app).delete("/api/users/delete-all");
      });
      test("should response status code 400", async () => {
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
      test("should response status code 400", async () => {
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
      test("should response status code 400", async () => {
        const user = {
          password: "pass12345",
          email: "email01@gmail",
          status: 10,
          roles_id: 1,
        };
        const res = await request(app).post("/api/users/create").send(user);
        expect(res.statusCode).toBe(400);
      });
      afterEach(async () => {
        await request(app).delete("/api/users/delete-all");
      });
    });
    describe("when send request with data(email already exist) should response status code 400", () => {
      beforeEach(async () => {
        const user = {
          username: "username01",
          password: "pass12345",
          email: "email01@gmail.com",
          status: 1,
          roles_id: 1,
        };
        await request(app).post("/api/users/create").send(user);
      });
      test("should response status code 400", async () => {
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
      afterEach(async () => {
        await request(app).delete("/api/users/delete-all");
      });
    });
  });
});

describe("GET /api/users", () => {
  describe("get all user success", () => {
    beforeEach(async () => {
      const user = {
        username: "username01",
        password: "pass12345",
        email: "email01@gmail.com",
        status: 1,
        roles_id: 1,
      };
      await request(app).post("/api/users/create").send(user);
    });
    test("should response status code 200", async () => {
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toBe(200);
    });
    afterEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
  });
  describe("get all user fail", () => {
    beforeEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
    test("when have no data should response status code 500", async () => {
      const res = await request(app).get("/api/users");
      expect(res.statusCode).toBe(500);
    });
    afterEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
  });
});

describe("GET /api/users/:id", () => {
  describe("get one user success", () => {
    beforeEach(async () => {
      const user = {
        username: "username01",
        password: "pass12345",
        email: "email01@gmail.com",
        status: 1,
        roles_id: 1,
      };
      await request(app).post("/api/users/create").send(user);
    });
    test("when exist user id 1 should response status code 200", async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.statusCode).toBe(200);
    });
    afterEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
  });
  describe("get one user fail", () => {
    beforeEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
    test("when have no user id 1 should response status code 200", async () => {
      const res = await request(app).get("/api/users/1");
      expect(res.statusCode).toBe(404);
    });
    afterEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
  });
});

describe("PUT /api/users/:id", () => {
  describe("update one user success", () => {
    beforeEach(async () => {
      const user = {
        username: "username01",
        password: "pass12345",
        email: "email01@gmail.com",
        status: 1,
        roles_id: 1,
      };
      await request(app).post("/api/users/create").send(user);
    });
    test("when update all filed should response status code 201", async () => {
      const user = {
        username: "username05",
        password: "pass12345",
        email: "email01@gmail.com",
        status: 10,
        roles_id: 1,
      };
      const res = await request(app).put("/api/users/1").send(user);
      expect(res.statusCode).toBe(201);
    });
    test("when update some filed should response status code 201", async () => {
      const user = {
        username: "username02",
        status: 10,
        roles_id: 1,
      };
      const res = await request(app).put("/api/users/1").send(user);
      expect(res.statusCode).toBe(201);
    });
    afterEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
  });
  describe("update one user fail", () => {
    describe("when username invalid(username not enough length) should response status code 400", () => {
      beforeEach(async () => {
        const user = {
          username: "username01",
          password: "pass12345",
          email: "email01@gmail.com",
          status: 1,
          roles_id: 1,
        };
        await request(app).post("/api/users/create").send(user);
      });
      test("should response status code 400", async () => {
        const user = {
          username: "use",
          password: "pass12345",
          email: "email09@gmail.com",
          status: 10,
          roles_id: 1,
        };
        const res = await request(app).put("/api/users/1").send(user);
        expect(res.statusCode).toBe(400);
      });
      afterEach(async () => {
        await request(app).delete("/api/users/delete-all");
      });
    });
    describe("when user id not exist should response status code 404", () => {
      beforeEach(async () => {
        await request(app).delete("/api/users/delete-all");
      });
      test("should response status code 404", async () => {
        const user = {
          username: "username01",
          password: "pass12345",
          email: "email09@gmail.com",
          status: 10,
          roles_id: 1,
        };
        const res = await request(app).put("/api/users/100").send(user);
        expect(res.statusCode).toBe(404);
      });
      afterEach(async () => {
        await request(app).delete("/api/users/delete-all");
      });
    });
  });
});

describe("DELETE /api/users/:id", () => {
  describe("delete one user success", () => {
    beforeEach(async () => {
      const user = {
        username: "username01",
        password: "pass12345",
        email: "email01@gmail.com",
        status: 1,
        roles_id: 1,
      };
      await request(app).post("/api/users/create").send(user);
    });
    test("when exist user id 1 should response status code 200", async () => {
      const res = await request(app).delete("/api/users/1");
      expect(res.statusCode).toBe(200);
    });
    afterEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
  });
  describe("delete one user fail", () => {
    beforeEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
    test("when user id not exist should response status code 404", async () => {
      const res = await request(app).delete("/api/users/100");
      expect(res.statusCode).toBe(404);
    });
    afterEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
  });
});

describe("DELETE /api/users/delete-all", () => {
  describe("delete all user success", () => {
    beforeEach(async () => {
      const user = {
        username: "username01",
        password: "pass12345",
        email: "email01@gmail.com",
        status: 1,
        roles_id: 1,
      };
      await request(app).post("/api/users/create").send(user);
    });
    test("should response status code 200", async () => {
      const res = await request(app).delete("/api/users/delete-all");
      expect(res.statusCode).toBe(200);
    });
    afterEach(async () => {
      await request(app).delete("/api/users/delete-all");
    });
  });
});
