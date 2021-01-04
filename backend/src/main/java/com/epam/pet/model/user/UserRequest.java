package com.epam.pet.model.user;

import java.util.Objects;

public class UserRequest {
    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
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
        UserRequest that = (UserRequest) o;
        return getUserName().equals(that.getUserName()) &&
                getFirstName().equals(that.getFirstName()) &&
                getLastName().equals(that.getLastName()) &&
                getEmail().equals(that.getEmail());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getUserName(), getFirstName(), getLastName(), getEmail());
    }
}
