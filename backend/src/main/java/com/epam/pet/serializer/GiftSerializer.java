package com.epam.pet.serializer;

import com.epam.pet.model.Gift.GiftPaginationModel;
import com.epam.pet.model.db.GiftModel;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class GiftSerializer {

    public GiftPaginationModel index(long count, Iterable<GiftModel> gifts) {
        List<GiftModel> giftList = new ArrayList<>();
        gifts.forEach(giftList::add);
        return new GiftPaginationModel(count, giftList);
    }

    public GiftModel create(GiftModel gift) {
        return new GiftModel(
                gift.getName(),
                gift.getDescription()
        );
    }

    public GiftModel update(GiftModel prev, GiftModel gift) {
        return new GiftModel(
                prev.getId(),
                gift.getName(),
                gift.getDescription()
        );
    }
}
