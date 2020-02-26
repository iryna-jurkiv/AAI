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
   FOREIGN KEY (manager) references users_table(user_id),
   created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users_details(
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
);

CREATE TABLE user_requests (
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
);


-- Initial setup account with a default password set to password
-- This account is required to set up manager accounts and then for HR and managers to assign the manager role to another user

INSERT INTO users_table (email, password, access_level, first_name, last_name, employee_number, manager, department) values ('hr@hr.com', '$2b$10$dfO/m20Nq6jrIkVAmqqn5.NW/Jf3vYwb4PxqaLNSOs8d6VhQbu2CS', 0, 'HR', 'User', 1, 1, 'HR');

INSERT INTO users_table (email, password, access_level, first_name, last_name, employee_number,manager, department) values ('employee@hr.com', '$2b$10$dfO/m20Nq6jrIkVAmqqn5.NW/Jf3vYwb4PxqaLNSOs8d6VhQbu2CS', 2, 'Employee', 'Surname', 150, 9, 'HR');



-- Sample Data

insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Shell', 'Rourke', 'srourke0@squarespace.com', '939', 1, 'Programmer I', 'Electronics');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Drud', 'Yakhin', 'dyakhin1@sitemeter.com', '819', 1, 'Teacher', 'Jewelery');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Barnabe', 'Ambage', 'bambage2@behance.net', '8', 0, 'Senior Financial Analyst', 'Clothing');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Raymund', 'Isacke', 'risacke3@yahoo.com', '0', 1, 'Payment Adjustment Coordinator', 'Movies');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Kirsti', 'Kleanthous', 'kkleanthous4@example.com', '5817', 1, 'Media Manager II', 'Home');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Randy', 'Yeowell', 'ryeowell5@wiley.com', '89', 1, 'Director of Sales', 'Kids');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Ashien', 'MacRitchie', 'amacritchie6@github.io', '528', 1, 'Actuary', 'Baby');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Augusta', 'Brunton', 'abrunton7@webnode.com', '113', 1, 'Marketing Manager', 'Movies');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Dominick', 'Jackman', 'djackman8@bandcamp.com', '44', 1, 'Cost Accountant', 'Toys');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Wyndham', 'Jallin', 'wjallin9@dailymail.co.uk', '7128', 1, 'Payment Adjustment Coordinator', 'Baby');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Adena', 'Brothwood', 'abrothwooda@telegraph.co.uk', '854', 0, 'Payment Adjustment Coordinator', 'Kids');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Dori', 'Antoshin', 'dantoshinb@craigslist.org', '116', 0, 'Internal Auditor', 'Electronics');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Celeste', 'Friedman', 'cfriedmanc@examiner.com', '7', 0, 'VP Quality Control', 'Automotive');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Helaina', 'Corradeschi', 'hcorradeschid@businessinsider.com', '0569', 1, 'Web Designer IV', 'Music');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Nigel', 'Sabater', 'nsabatere@answers.com', '76336', 0, 'Environmental Tech', 'Kids');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Leanora', 'Ketteridge', 'lketteridgef@purevolume.com', '6', 1, 'Senior Editor', 'Sports');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Mamie', 'Dommersen', 'mdommerseng@wp.com', '0', 1, 'Statistician III', 'Automotive');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Nona', 'Faunt', 'nfaunth@opensource.org', '99', 0, 'Physical Therapy Assistant', 'Automotive');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Felecia', 'Lubbock', 'flubbocki@nbcnews.com', '10', 0, 'Director of Sales', 'Grocery');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Elnora', 'Ianni', 'eiannij@w3.org', '4', 1, 'Research Nurse', 'Electronics');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Sephira', 'Laflin', 'slaflink@ihg.com', '017', 0, 'Staff Scientist', 'Shoes');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Huey', 'Mixter', 'hmixterl@deviantart.com', '90', 0, 'Associate Professor', 'Health');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Carson', 'Tyreman', 'ctyremanm@deviantart.com', '46806', 1, 'Electrical Engineer', 'Electronics');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Gertrud', 'Hamsson', 'ghamssonn@nyu.edu', '4', 1, 'Environmental Tech', 'Beauty');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Reginald', 'Rickis', 'rrickiso@linkedin.com', '91375', 1, 'Cost Accountant', 'Clothing');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Barnabas', 'Ubee', 'bubeep@sina.com.cn', '6', 0, 'Physical Therapy Assistant', 'Health');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Ring', 'MacKibbon', 'rmackibbonq@vkontakte.ru', '87', 0, 'Financial Advisor', 'Clothing');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Morie', 'Baverstock', 'mbaverstockr@cargocollective.com', '84760', 0, 'Professor', 'Home');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Cly', 'Thuillier', 'cthuilliers@google.pl', '0215', 1, 'Help Desk Operator', 'Kids');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Cordey', 'Heakey', 'cheakeyt@mtv.com', '2', 1, 'Actuary', 'Health');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Gerek', 'Drinkhill', 'gdrinkhillu@paypal.com', '84', 1, 'Dental Hygienist', 'Home');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Ives', 'Milksop', 'imilksopv@unicef.org', '5', 1, 'Marketing Manager', 'Movies');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Alma', 'Bricket', 'abricketw@yolasite.com', '094', 0, 'Help Desk Technician', 'Tools');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Agretha', 'Fontanet', 'afontanetx@desdev.cn', '82526', 0, 'Social Worker', 'Grocery');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Brennen', 'Odams', 'bodamsy@reverbnation.com', '24334', 0, 'Chemical Engineer', 'Health');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Lurette', 'Naton', 'lnatonz@tuttocitta.it', '21', 1, 'Assistant Manager', 'Garden');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Jeffie', 'Stichel', 'jstichel10@ameblo.jp', '15086', 1, 'Project Manager', 'Tools');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Gray', 'Hedgeley', 'ghedgeley11@amazon.co.uk', '1427', 1, 'Chemical Engineer', 'Baby');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Dion', 'Orchard', 'dorchard12@dot.gov', '9', 1, 'Nurse Practicioner', 'Outdoors');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Jude', 'Breslane', 'jbreslane13@yellowbook.com', '29', 1, 'Administrative Assistant III', 'Music');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Addison', 'Parlett', 'aparlett14@ifeng.com', '80', 0, 'Assistant Media Planner', 'Outdoors');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Diarmid', 'Sturney', 'dsturney15@scribd.com', '17893', 0, 'Nurse', 'Toys');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Ronica', 'Wychard', 'rwychard16@statcounter.com', '1', 1, 'Programmer IV', 'Jewelery');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Tiffany', 'Palffy', 'tpalffy17@craigslist.org', '6440', 1, 'Staff Accountant IV', 'Baby');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Rolph', 'Grewes', 'rgrewes18@joomla.org', '579', 1, 'Product Engineer', 'Tools');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Barrie', 'Wesley', 'bwesley19@ask.com', '905', 1, 'Quality Control Specialist', 'Shoes');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Kelli', 'Collings', 'kcollings1a@rediff.com', '1', 0, 'Legal Assistant', 'Baby');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Lawton', 'Littledyke', 'llittledyke1b@unc.edu', '420', 1, 'Financial Advisor', 'Outdoors');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Boniface', 'McKelvey', 'bmckelvey1c@twitter.com', '47', 1, 'Administrative Assistant I', 'Electronics');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Patsy', 'Moultrie', 'pmoultrie1d@purevolume.com', '2', 1, 'Nurse', 'Baby');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Bronny', 'Grier', 'bgrier1e@parallels.com', '7', 0, 'Civil Engineer', 'Health');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Dix', 'Iannuzzelli', 'diannuzzelli1f@tripadvisor.com', '0303', 1, 'Accountant IV', 'Books');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Gian', 'Bagwell', 'gbagwell1g@flavors.me', '96', 0, 'Environmental Tech', 'Music');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Talyah', 'Horrigan', 'thorrigan1h@cnn.com', '0638', 1, 'Staff Accountant IV', 'Industrial');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Brande', 'Casemore', 'bcasemore1i@taobao.com', '063', 0, 'Technical Writer', 'Music');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Meredithe', 'Howat', 'mhowat1j@baidu.com', '0211', 0, 'Senior Developer', 'Music');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Ryon', 'Drought', 'rdrought1k@delicious.com', '1', 0, 'Mechanical Systems Engineer', 'Games');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Wheeler', 'Rotherham', 'wrotherham1l@salon.com', '8248', 0, 'Actuary', 'Beauty');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Jilli', 'Livsey', 'jlivsey1m@pinterest.com', '5974', 0, 'Data Coordiator', 'Grocery');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Jamey', 'Linsay', 'jlinsay1n@nature.com', '65', 1, 'Safety Technician IV', 'Sports');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Kathie', 'Raffan', 'kraffan1o@shop-pro.jp', '89376', 0, 'Payment Adjustment Coordinator', 'Clothing');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Herculie', 'Bertelsen', 'hbertelsen1p@merriam-webster.com', '2915', 1, 'Media Manager I', 'Tools');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Peggi', 'Klimuk', 'pklimuk1q@google.ru', '17', 1, 'Recruiter', 'Grocery');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Tad', 'Tuley', 'ttuley1r@hud.gov', '38404', 1, 'Marketing Manager', 'Jewelery');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Cherye', 'Gartell', 'cgartell1s@ezinearticles.com', '1', 0, 'Occupational Therapist', 'Clothing');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Cindee', 'Bifield', 'cbifield1t@over-blog.com', '43', 1, 'Desktop Support Technician', 'Beauty');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Duff', 'Tumayan', 'dtumayan1u@sohu.com', '4631', 0, 'Quality Control Specialist', 'Toys');
insert into users_table (first_name, last_name, email, employee_number, access_level, Job_title, Department) values ('Jaimie', 'Challender', 'jchallender1v@wired.com', '818', 0, 'Financial Analyst', 'Beauty');
