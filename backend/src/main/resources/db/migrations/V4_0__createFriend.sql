CREATE TABLE IF NOT EXISTS dev.friend (
    id INT NOT NULL AUTO_INCREMENT,
    user_id_1 INT NOT NULL,
    user_id_2 INT NOT NULL,
    pending BOOLEAN NOT NULL,
    FOREIGN KEY (user_id_1) REFERENCES user(id),
    FOREIGN KEY (user_id_2) REFERENCES user(id),
    PRIMARY KEY (id))
ENGINE = InnoDB;