create TABLE person(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    surname VARCHAR(255),
    middleName VARCHAR(255),
    password VARCHAR(1024),
    email VARCHAR(255),
    phone VARCHAR(255),
    isActivated BOOLEAN,
    activationLink VARCHAR(1024)
);

create TABLE token(
    id SERIAL PRIMARY KEY,
    userId INTEGER, FOREIGN KEY (userId) REFERENCES person (id),
    refreshToken VARCHAR(255)
);