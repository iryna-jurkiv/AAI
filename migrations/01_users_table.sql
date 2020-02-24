CREATE TABLE users_table(
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
   FOREIGN KEY (manager) references users_table(employee_number),
   created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
