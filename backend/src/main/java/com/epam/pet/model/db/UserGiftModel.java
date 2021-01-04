package com.epam.pet.model.db;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user_gift")
public class UserGiftModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "userId")
    private long userId;

    @Column(name = "giftId")
    private long giftId;

    @Column(name = "wish")
    private boolean wish;

    public UserGiftModel(long id, long userId, long giftId) {
        this.id = id;
        this.userId = userId;
        this.giftId = giftId;
    }

    public UserGiftModel(long userId, long giftId) {
        this.userId = userId;
        this.giftId = giftId;
    }

    public UserGiftModel(long id, long userId, long giftId, boolean wish) {
        this.id = id;
        this.userId = userId;
        this.giftId = giftId;
        this.wish = wish;
    }

    public UserGiftModel(long userId, long giftId, boolean wish) {
        this.userId = userId;
        this.giftId = giftId;
        this.wish = wish;
    }

    public UserGiftModel() {}

    public boolean isWish() {
        return wish;
    }

    public long getId() {
        return id;
    }

    public long getUserId() {
        return userId;
    }

    public long getGiftId() {
        return giftId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserGiftModel that = (UserGiftModel) o;
        return getId() == that.getId() && getUserId() == that.getUserId() && getGiftId() == that.getGiftId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUserId(), getGiftId());
    }
}
