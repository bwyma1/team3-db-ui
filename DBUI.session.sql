 CREATE DATABASE IF NOT EXISTS DBUI;
USE DBUI;
SET FOREIGN_KEY_CHECKS = 0;
SET GROUP_CONCAT_MAX_LEN = 32768;
SET @tables = NULL;
SELECT GROUP_CONCAT('`', table_name, '`') INTO @tables
FROM information_schema.tables
WHERE table_schema = (
        SELECT DATABASE()
    );
SELECT IFNULL(@tables, 'dummy') INTO @tables;
SET @tables = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt
FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
SET FOREIGN_KEY_CHECKS = 1;
CREATE TABLE IF NOT EXISTS user(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    security_question VARCHAR(255) NOT NULL,
    security_question_answer VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio VARCHAR(1000),
    prof_pic_choice INT,
    location VARCHAR(255),
    phone VARCHAR(255),
    UNIQUE (email)
);
CREATE TABLE IF NOT EXISTS truck(
    truck_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    model VARCHAR(255) NOT NULL,
    make VARCHAR(255) NOT NULL,
    year VARCHAR(255) NOT NULL,
    mileage VARCHAR(255) NOT NULL,
    max_miles FLOAT,
    long_discount_days INT,
    long_discount_percent FLOAT,
    long_discount_flat FLOAT,
    truck_image VARCHAR(500) NOT NULL,
    is_available BOOLEAN DEFAULT 1,
    truck_capacity FLOAT DEFAULT 4,
    cargo_capacity FLOAT DEFAULT 0,
    price FLOAT,
    FOREIGN KEY (owner_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS truck_review(
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    truck_id INT NOT NULL,
    userName VARCHAR(255) NOT NULL DEFAULT ' ',
    review_text VARCHAR(1000) NOT NULL,
    review_rating INT NOT NULL,
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS truck_owner_rating(
    owner_review_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    renter_id INT NOT NULL,
    review_text VARCHAR(1000) NOT NULL,
    review_rating INT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES user(user_id)
);
CREATE TABLE IF NOT EXISTS issue_report(
    issue_reports INT AUTO_INCREMENT PRIMARY KEY,
    issue_text VARCHAR(1000) NOT NULL
);

CREATE TABLE IF NOT EXISTS vehicle_bundle_profile(
    bundle_id INT AUTO_INCREMENT PRIMARY KEY,
    owner_id INT NOT NULL,
    discount_percent FLOAT,
    discount_flat FLOAT,
    is_available BOOLEAN DEFAULT 1,
    FOREIGN KEY (owner_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS bundle_vehicle(
    vehicle_bundle_id INT AUTO_INCREMENT PRIMARY KEY,
    bundle_id INT NOT NULL,
    truck_id INT NOT NULL,
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id),
    FOREIGN KEY (bundle_id) REFERENCES vehicle_bundle_profile(bundle_id)
);
CREATE TABLE IF NOT EXISTS amenity(
    amenity_id INT AUTO_INCREMENT PRIMARY KEY,
    truck_id INT NOT NULL,
    amenity_name VARCHAR(255) NOT NULL,
    amenity_price FLOAT NOT NULL,
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id)
);
CREATE TABLE IF NOT EXISTS user_message(
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    recieve_id INT NOT NULL,
    send_id INT NOT NULL,
    parent_id INT,
    child_id INT,
    message_text VARCHAR(1000) NOT NULL,
    message_prio INT,
    FOREIGN KEY (recieve_id) REFERENCES user(user_id),
    FOREIGN KEY (send_id) REFERENCES user(user_id),
    FOREIGN KEY (parent_id) REFERENCES user_message(message_id),
    FOREIGN KEY (child_id) REFERENCES user_message(message_id)
);

CREATE TABLE IF NOT EXISTS truck_rent_info(
    truck_rent_id INT AUTO_INCREMENT PRIMARY KEY,
    truck_id INT NOT NULL,
    renter_id INT NOT NULL,
    city VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id),
    FOREIGN KEY (renter_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS city(
    city_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS truck_city(
    truck_id INT NOT NULL,
    city_id INT NOT NULL,
    PRIMARY KEY (truck_id, city_id),
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);


-- ...
-- Example Data
INSERT INTO user (
        email,
        user_name,
        password,
        security_question,
        security_question_answer
    )
VALUES ('bwyma@gmail.com', 'brock', '12345', '1', 'yo');
INSERT INTO truck (
        owner_id,
        model,
        make,
        year,
        mileage,
        max_miles,
        long_discount_days,
        long_discount_percent,
        long_discount_flat,
        truck_image,
        is_available,
        truck_capacity,
        cargo_capacity,
        price
    )
VALUES (
        1,
        'F150',
        'Ford',
        '2019',
        '20000',
        10000,
        7,
        10,
        0,
        'https://upload.wikimedia.org/wikipedia/commons/f/f0/2018_Ford_F-150_XLT_Crew_Cab%2C_front_11.10.19.jpg',
        1,
        4,
        3325,
        25
    );
    
INSERT INTO truck_rent_info (truck_id, renter_id, city, start_date, end_date)
VALUES (1, 1, 'Los Angeles','2023-4-20', '2023-5-20');
INSERT INTO truck (
        owner_id,
        model,
        make,
        year,
        mileage,
        max_miles,
        long_discount_days,
        long_discount_percent,
        long_discount_flat,
        truck_image,
        is_available,
        truck_capacity,
        cargo_capacity,
        price
    )
VALUES (
        1,
        'Tundra',
        'Toyota',
        '2018',
        '30000',
        200000,
        10,
        1,
        10,
        'https://www.thedrive.com/content/2022/03/2022-Toyota-Tundra-TRD-Pro_KL_52.jpg?quality=85',
        1,
        4,
        1800,
        30
    );
INSERT INTO truck (
        owner_id,
        model,
        make,
        year,
        mileage,
        max_miles,
        long_discount_days,
        long_discount_percent,
        long_discount_flat,
        truck_image,
        is_available,
        truck_capacity,
        cargo_capacity,
        price
    )
VALUES (
        1,
        'Colorado',
        'Chevrolet',
        '2017',
        '10000',
        500,
        2,
        20,
        5,
        'https://www.cnet.com/a/img/resize/785d12a9befd2c0b2694863211aa382e9757b9e6/hub/2021/01/20/3d68a07f-1113-4789-aa40-ec77ca5e7d05/colorado-promo.jpg?auto=webp&fit=crop&height=675&width=1200',
        1,
        4,
        2000,
        33
    );

INSERT INTO truck (
        owner_id,
        model,
        make,
        year,
        mileage,
        max_miles,
        long_discount_days,
        long_discount_percent,
        long_discount_flat,
        truck_image,
        is_available,
        truck_capacity,
        cargo_capacity,
        price
    )
VALUES (
        1,
        'Sierra',
        'GMC',
        '1996',
        '8000',
        500,
        4,
        25,
        8,
        'https://as1.ftcdn.net/jpg/02/00/14/06/220_F_200140659_MMinjYYvGsk37lwP9lQCskgMC3uZgBmt.jpg',
        1,
        5,
        2300,
        14
    );

INSERT INTO truck (
        owner_id,
        model,
        make,
        year,
        mileage,
        max_miles,
        long_discount_days,
        long_discount_percent,
        long_discount_flat,
        truck_image,
        is_available,
        truck_capacity,
        cargo_capacity,
        price
    )
VALUES (
        1,
        'Tacoma',
        'Toyota',
        '2014',
        '12000',
        550,
        2,
        10,
        6,
        'https://as1.ftcdn.net/jpg/00/60/93/48/220_F_60934802_c4SfkBbyRD7fLXn379CEbnXlbcFdxINP.jpg',
        1,
        5,
        2200,
        35
    );

INSERT INTO truck (
        owner_id,
        model,
        make,
        year,
        mileage,
        max_miles,
        long_discount_days,
        long_discount_percent,
        long_discount_flat,
        truck_image,
        is_available,
        truck_capacity,
        cargo_capacity,
        price
    )
VALUES (
        1,
        '1500',
        'Ram',
        '2018',
        '15000',
        600,
        3,
        15,
        7,
        'https://as2.ftcdn.net/jpg/04/92/12/07/220_F_492120789_fyaFBcNx6otam7MLTDGDXUVAJVFXu1Ng.jpg',
        1,
        5,
        2500,
        40
    );

INSERT INTO amenity (truck_id, amenity_name, amenity_price)
VALUES (3, 'Dolly', 6),
    (2, 'Bungee Cord', 2),
    (1, 'Cooler', 30),
    (1, 'Leather Seat Covers', 25);

INSERT INTO vehicle_bundle_profile (
    owner_id,
    discount_percent,
    discount_flat
)
VALUES (
    1,
    30,
    15
);

INSERT INTO bundle_vehicle (
    bundle_id,
    truck_id
)
VALUES (1, 2),
    (1, 3);

INSERT INTO vehicle_bundle_profile (
    owner_id,
    discount_percent,
    discount_flat
)
VALUES (
    1,
    40,
    25
);

INSERT INTO bundle_vehicle (
    bundle_id,
    truck_id
)
VALUES (2, 4),
    (2, 5);

    
INSERT INTO truck_review (user_id, truck_id, review_text, review_rating)
VALUES (
        1, 
        1, 
        "Awesome Truck! Worked very well", 
        "4"
    );
INSERT INTO truck_review (user_id, truck_id, review_text, review_rating)
VALUES (
        1,
        1,
        "Ehh, it got the job done, but it did break down once...",
        "1"
    );
INSERT INTO truck_review (user_id, truck_id, review_text, review_rating)
VALUES (
        1,
        2,
        "Very cool truck, the added bungie cord was a big help!",
        "5"
    );

INSERT INTO city (name) VALUES ('San Francisco');
INSERT INTO city (name) VALUES ('Los Angeles');
INSERT INTO city (name) VALUES ('San Diego');
INSERT INTO city (name) VALUES ('Sacramento');

-- Link trucks to multiple cities
INSERT INTO truck_city (truck_id, city_id) VALUES (1, 1); -- Ford F-150 in San Francisco
INSERT INTO truck_city (truck_id, city_id) VALUES (1, 2); -- Ford F-150 in Los Angeles
INSERT INTO truck_city (truck_id, city_id) VALUES (2, 1); -- Toyota Tundra in San Francisco
INSERT INTO truck_city (truck_id, city_id) VALUES (2, 3); -- Toyota Tundra in San Diego
INSERT INTO truck_city (truck_id, city_id) VALUES (3, 2); -- Chevrolet Colorado in Los Angeles
INSERT INTO truck_city (truck_id, city_id) VALUES (3, 4); -- Chevrolet Colorado in Sacramento
INSERT INTO truck_city (truck_id, city_id) VALUES (4, 1); -- Ford F-150 in San Francisco
INSERT INTO truck_city (truck_id, city_id) VALUES (4, 2); 
INSERT INTO truck_city (truck_id, city_id) VALUES (5, 1); 
INSERT INTO truck_city (truck_id, city_id) VALUES (5, 3); 
INSERT INTO truck_city (truck_id, city_id) VALUES (6, 2); 
INSERT INTO truck_city (truck_id, city_id) VALUES (6, 4);