package com.epam.pet.model.Gift;

import com.epam.pet.model.db.GiftModel;

import java.util.List;
import java.util.Objects;

public class GiftPaginationModel {
    private final long count;
    private final List<GiftModel> data;

    public GiftPaginationModel(long count, List<GiftModel> data) {
        this.count = count;
        this.data = data;
    }

    public long getCount() {
        return count;
    }

    public List<GiftModel> getData() {
        return data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GiftPaginationModel that = (GiftPaginationModel) o;
        return getCount() == that.getCount() && getData().equals(that.getData());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getCount(), getData());
    }
}
