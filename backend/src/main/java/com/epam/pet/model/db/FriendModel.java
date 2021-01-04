package com.epam.pet.model.db;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "friend")
public class FriendModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "userId_1")
    private long userId_1;

    @Column(name = "userId_2")
    private long userId_2;

    @Column(name = "pending")
    private boolean pending;

    public FriendModel(long id, long userId_1, long userId_2, boolean pending) {
        this.id = id;
        this.userId_1 = userId_1;
        this.userId_2 = userId_2;
        this.pending = pending;
    }

    public FriendModel(long userId_1, long userId_2, boolean pending) {
        this.userId_1 = userId_1;
        this.userId_2 = userId_2;
        this.pending = pending;
    }

    public FriendModel() {
    }

    public long getId() {
        return id;
    }

    public long getUserId_1() {
        return userId_1;
    }

    public long getUserId_2() {
        return userId_2;
    }

    public boolean isPending() {
        return pending;
    }

    @Override
    public String toString() {
        return "FriendModel{" +
                "id=" + id +
                ", userId_1=" + userId_1 +
                ", userId_2=" + userId_2 +
                ", pending=" + pending +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FriendModel that = (FriendModel) o;
        return getId() == that.getId() && getUserId_1() == that.getUserId_1() && getUserId_2() == that.getUserId_2() && isPending() == that.isPending();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUserId_1(), getUserId_2(), isPending());
    }
}
