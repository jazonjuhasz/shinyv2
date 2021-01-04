CREATE TABLE IF NOT EXISTS dev.user_gift (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    gift_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (gift_id) REFERENCES gift(id)
    )
ENGINE = InnoDB;