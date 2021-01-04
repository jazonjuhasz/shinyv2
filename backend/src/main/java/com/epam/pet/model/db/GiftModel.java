package com.epam.pet.model.db;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "gift")
public class GiftModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    public GiftModel(long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public GiftModel(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public GiftModel() {}

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GiftModel giftModel = (GiftModel) o;
        return getId() == giftModel.getId() && getName().equals(giftModel.getName()) && getDescription().equals(giftModel.getDescription());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getDescription());
    }
}
