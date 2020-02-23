process.env.NODE_ENV = "test";
const {client} = require('../db/db_config');
const request = require("supertest");
const server = require("../app");

beforeAll(async () => {
  await client.query(`CREATE TABLE users (
     user_id serial PRIMARY KEY,
     fullname VARCHAR (200) NOT NULL,
     password VARCHAR (500) NOT NULL,
     email VARCHAR (355) UNIQUE NOT NULL,
     access VARCHAR (100) DEFAULT 'Basic',
     created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
     last_login TIMESTAMP);`)
});

beforeEach(async () => {
  // seed with some data
  await client.query("INSERT INTO users (fullname, password, email, access) VALUES ('Iryna J','123','example@example.com','Manager')");
});

afterEach(async () => {
  await client.query("DELETE FROM users");
});

afterAll(async () => {
  await client.query("DROP TABLE users");
  client.end();
});

describe("GET /users ", () => {
  test("It should respond with Welcome", async done => {
    const response = await request(server).get("/users/");
    expect(response.text).toContain('Welcome');
    expect(response.statusCode).toBe(200);
    done()
  });

});

describe("GET /users/signup ", () => {
  test("It should include username, password and emails", async done => {
    const response = await request(server).get("/users/signup");
    expect(response.text).toContain('Full name');
    expect(response.text).toContain('Email');
    expect(response.text).toContain('Password');
    expect(response.text).toContain('Confirm Password');
    expect(response.statusCode).toBe(200);
    done()
  });
});

  describe("GET /users/signin ", () => {
    test("It should include email and password", async done => {
      const response = await request(server).get("/users/signin");
      expect(response.text).toContain('Email');
      expect(response.text).toContain('Password');
      expect(response.statusCode).toBe(200);
      done()
    });
});

describe("POST /users/signup ", () => {
  test("It should save a new user user ", async () => {
    const newUser = await request(server)
      .post("/api/signup")
      .send({
        fullname : "Aaron R",
        email : "aaronr@gmail.com",
        password : "123",
        password2: "123"
        });
    expect(newUser.statusCode).toBe(302);

  });
});

describe("POST /users/signin ", () => {
  test("It should authenticate a user ", async () => {
    const newUser = await request(server)
      .post("/api/signup")
      .send({
        fullname : "Aaron R",
        email : "aaronr@gmail.com",
        password : "123",
        password2: "123"
      })
        .expect(302)
    const response = await request(server)
      .post("/api/signin")
      .send({
        email : "aaronr@gmail.com",
        password : "123",
        });
    expect(newUser.statusCode).toBe(302);
    const responsetwo = await request(server).get("/users");
    expect(responsetwo.text).toContain('Welcome');

  });
});
