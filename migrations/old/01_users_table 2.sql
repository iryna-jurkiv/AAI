CREATE TABLE users (
   user_id serial PRIMARY KEY,
   fullname VARCHAR (200) NOT NULL,
   password VARCHAR (500) NOT NULL,
   email VARCHAR (355) UNIQUE NOT NULL,
   access VARCHAR (100) DEFAULT 'Basic',
   created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   last_login TIMESTAMP
);
