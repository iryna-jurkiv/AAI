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

-- Initial setup account with a default password of password
INSERT INTO users_table (email, password, access_level, first_name, last_name, employee_number, manager, department) values ('hr@gmail.com', '$2b$10$dfO/m20Nq6jrIkVAmqqn5.NW/Jf3vYwb4PxqaLNSOs8d6VhQbu2CS', 2, 'Bob', 'Smith', 1, 1, 'HR');
