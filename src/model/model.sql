CREATE DATABASE todolist;

SET timezone = 'Asia/Tashkent';

CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name varchar(46) NOT NULL UNIQUE,
    user_password varchar(60) NOT NULL
);

CREATE TABLE todos(
    id serial,
    user_id uuid,
    body text not null,
    is_checked boolean DEFAULT FALSE,
    FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);