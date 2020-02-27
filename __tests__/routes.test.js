process.env.NODE_ENV = "test";
const {client} = require('../db/db_config');
const request = require("supertest");
const server = require("../app");

beforeAll(async () => {
  await client.query(`CREATE TABLE users_table(
        user_id serial PRIMARY KEY,
        first_name VARCHAR (50) NOT NULL,
        last_name VARCHAR (50) NOT NULL,
        job_title VARCHAR (50),
        employee_number INTEGER UNIQUE NOT NULL,
        email VARCHAR (355) UNIQUE NOT NULL,
        manager INTEGER,
        department VARCHAR (200),
        access_level INTEGER,
        password VARCHAR(256),
        FOREIGN KEY (manager) references users_table(user_id),
        created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
     );`)

await client.query(`CREATE TABLE users_details(
        id serial PRIMARY KEY,
        employee_number integer unique,
        account_number VARCHAR (12) NOT NULL,
        sort_code VARCHAR (10) NOT NULL,
        entitled_uk boolean default false,
        addr_first VARCHAR (355) UNIQUE,
        addr_second VARCHAR (355) UNIQUE,
        city VARCHAR(60),
        post_code VARCHAR (12),
        FOREIGN KEY (employee_number) references users_table(user_id)
     );`)

await client.query(`CREATE TABLE user_requests (
         id serial PRIMARY KEY,
         user_id INTEGER not null ,
         manager_name INTEGER,
         laptop BOOLEAN DEFAULT false,
         developer_laptop BOOLEAN DEFAULT false,
         monitor BOOLEAN DEFAULT false,
         phone BOOLEAN DEFAULT false,
         desk BOOLEAN DEFAULT false,
         building_access BOOLEAN DEFAULT false,
         FOREIGN KEY (user_id) REFERENCES users_table(user_id)
      );`)

});

beforeEach(async () => {
  // seed with some data
  await client.query("INSERT INTO users_table (email, password, access_level, first_name, last_name, employee_number, manager, department) values ('hr@hr.com', '$2b$10$dfO/m20Nq6jrIkVAmqqn5.NW/Jf3vYwb4PxqaLNSOs8d6VhQbu2CS', 0, 'HRFirstname', 'HRLastname', 1, 1,'HR')");

await client.query("INSERT INTO users_table (email, password, access_level, first_name, last_name, employee_number,manager, department) values ('manager@hr.com', '$2b$10$dfO/m20Nq6jrIkVAmqqn5.NW/Jf3vYwb4PxqaLNSOs8d6VhQbu2CS', 1, 'ManagerFirstname', 'ManagerLastname', 2, 1, 'HR')");

await client.query("INSERT INTO users_table (email, password, access_level, first_name, last_name, employee_number,manager, department) values ('employee@hr.com', '$2b$10$dfO/m20Nq6jrIkVAmqqn5.NW/Jf3vYwb4PxqaLNSOs8d6VhQbu2CS', 2, 'EmployeeFirstname', 'EmployeeLastname', 3,2 , 'HR')");

});

afterEach(async () => {
  await client.query("DELETE FROM users_table");

});

afterAll(async () => {
  await client.query("DROP TABLE user_requests");

  await client.query("DROP TABLE users_details");

  await client.query("DROP TABLE users_table");

  client.end();
});

describe("GET / ", () => {
  test("It should respond with Sign in", async done => {
    const response = await request(server).get("/");
    expect(response.text).toContain('Sign In');
    expect(response.text).toContain('Email');
    expect(response.text).toContain('Password');
    expect(response.statusCode).toBe(200);
    done()
  });

});
