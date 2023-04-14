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
    FOREIGN KEY (owner_id) REFERENCES user(user_id)
);
CREATE TABLE IF NOT EXISTS truck_review(
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    truck_id INT NOT NULL,
    review_text VARCHAR(1000) NOT NULL,
    review_rating INT NOT NULL,
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id)
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
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id)
);

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
        truck_image
    )
VALUES (
        1,
        'Ford-F150',
        'make',
        '2019',
        '20000',
        100000,
        7,
        0.10,
        0.10,
        'https://upload.wikimedia.org/wikipedia/commons/f/f0/2018_Ford_F-150_XLT_Crew_Cab%2C_front_11.10.19.jpg'
    );
INSERT INTO truck_rent_info (truck_id, renter_id, start_date, end_date)
VALUES (1, 1, '2023-10-20', '2023-10-25');
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
        truck_image
    )
VALUES (
        1,
        'Toyota Tundra',
        'make',
        '2018',
        '30000',
        200000,
        10,
        0.20,
        0.10,
        'https://www.thedrive.com/content/2022/03/2022-Toyota-Tundra-TRD-Pro_KL_52.jpg?quality=85'
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
        truck_image
    )
VALUES (
        1,
        'Chevrolet Colorado',
        'make',
        '2017',
        '10000',
        120000,
        4,
        0.15,
        0.10,
        'https://www.cnet.com/a/img/resize/785d12a9befd2c0b2694863211aa382e9757b9e6/hub/2021/01/20/3d68a07f-1113-4789-aa40-ec77ca5e7d05/colorado-promo.jpg?auto=webp&fit=crop&height=675&width=1200'
    );

INSERT INTO amenity (truck_id, amenity_name, amenity_price)
VALUES (3, 'Air Conditioning', 50),
       (2, 'Navigation System', 100),
       (1, 'Bluetooth Connectivity', 30),
       (1, 'Rearview Camera', 70);