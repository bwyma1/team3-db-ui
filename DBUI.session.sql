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
    year VARCHAR(255) NOT NULL,
    mileage VARCHAR(255) NOT NULL,
    max_miles FLOAT,
    long_discount_days INT,
    long_discount_percent FLOAT,
    long_discount_flat FLOAT,
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
    bundle_id INT AUTO_INCREMENT PRIMARY KEY,
    truck_id INT NOT NULL,
    FOREIGN KEY (truck_id) REFERENCES truck(truck_id)
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