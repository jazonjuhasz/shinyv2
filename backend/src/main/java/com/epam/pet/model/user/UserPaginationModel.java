package com.epam.pet.model.user;

import java.util.List;
import java.util.Objects;

public class UserPaginationModel {
    private final long count;
    private final List<User> data;


    public UserPaginationModel(long count, List<User> data) {
        this.count = count;
        this.data = data;
    }

    public long getCount() {
        return count;
    }

    public List<User> getData() {
        return data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPaginationModel that = (UserPaginationModel) o;
        return getCount() == that.getCount() && getData().equals(that.getData());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCount(), getData());
    }
}
