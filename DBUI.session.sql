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
    email VARCHAR(255) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    security_question VARCHAR(255) NOT NULL,
    security_question_answer VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS profile(
    profile_id INT PRIMARY KEY,
    user_id INT,
    bio VARCHAR(1000) NOT NULL,
    location VARCHAR(255) NOT NULL,
    profile_picture INT,
    FOREIGN KEY(user_id) REFERENCES user(user_id)
);