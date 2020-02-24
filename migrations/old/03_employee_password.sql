alter TABLE employees ADD column password text NOT NULL default md5(random()::text);
