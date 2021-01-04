package com.epam.pet.model.user;

import java.util.Objects;

public final class User {
    private final long id;
    private final String userName;
    private final String firstName;
    private final String lastName;
    private final String email;

    public User(long id, String userName, String firstName, String lastName, String email) {
        this.id = id;
        this.userName = userName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return getId() == user.getId() && getUserName().equals(user.getUserName()) &&
                getFirstName().equals(user.getFirstName()) && getLastName().equals(user.getLastName()) &&
                getEmail().equals(user.getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getUserName(), getFirstName(), getLastName(), getEmail());
    }
}
