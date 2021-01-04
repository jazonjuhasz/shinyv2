package com.epam.pet.model.db;

import javax.persistence.*;

@Entity
@Table(name = "user_gift")
public class UserGiftDAOModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    private long giftId;

    private String name;

    private String description;

    public UserGiftDAOModel(long id, long giftId, String name, String description) {
        this.id = id;
        this.giftId = giftId;
        this.name = name;
        this.description = description;
    }

    public UserGiftDAOModel(long giftId, String name, String description) {
        this.giftId = giftId;
        this.name = name;
        this.description = description;
    }

    public UserGiftDAOModel() {
    }

    public long getId() {
        return id;
    }

    public long getGiftId() {
        return giftId;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }
}
