CREATE TABLE employees(
   user_id serial PRIMARY KEY,
   first_name VARCHAR (50) NOT NULL,
   last_name VARCHAR (50) NOT NULL,
   job_title VARCHAR (50),
   employee_number VARCHAR UNIQUE NOT NULL,
   email VARCHAR (355) UNIQUE NOT NULL,
   created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
