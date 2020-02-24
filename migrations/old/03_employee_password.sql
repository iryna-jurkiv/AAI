alter TABLE employees NOT NULL default md5(random()::text);
