package com.epam.pet.model.db;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "friend")
public class FriendDAOModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    private long userId;

    private String firstName;

    private String lastName;

    private boolean pending;

    public FriendDAOModel(long id, long userId, String firstName, String lastName, boolean pending) {
        this.id = id;
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pending = pending;
    }

    public FriendDAOModel(long userId, String firstName, String lastName, boolean pending) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pending = pending;
    }

    public FriendDAOModel() {
    }

    public long getUserId() {
        return userId;
    }

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public boolean isPending() {
        return pending;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FriendDAOModel that = (FriendDAOModel) o;
        return getId() == that.getId() && getUserId() == that.getUserId() && isPending() == that.isPending() && getFirstName().equals(that.getFirstName()) && getLastName().equals(that.getLastName());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUserId(), getFirstName(), getLastName(), isPending());
    }
}
