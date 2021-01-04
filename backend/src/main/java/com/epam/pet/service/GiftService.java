package com.epam.pet.service;


import com.epam.pet.model.Gift.GiftPaginationModel;
import com.epam.pet.model.db.GiftModel;
import com.epam.pet.repository.GiftRepository;
import com.epam.pet.serializer.GiftSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GiftService {

    private final GiftRepository giftRepository;
    private final GiftSerializer giftSerializer;

    @Autowired
    public GiftService(GiftRepository giftRepository, GiftSerializer giftSerializer) {
        this.giftRepository = giftRepository;
        this.giftSerializer = giftSerializer;
    }

    public GiftPaginationModel index(int limit, int offset) {
        Iterable<GiftModel> gifts = this.giftRepository.paginate(limit, offset);
        long count = this.giftRepository.count();
        return this.giftSerializer.index(count, gifts);
    }

    public GiftModel get(long id) {
        return this.giftRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public List<GiftModel> getAll() {
        return this.giftRepository.findAll();
    }

    public void create(GiftModel gift) {
        Optional<GiftModel> isDuplicated = giftRepository.findByName(gift.getName());
        if (isDuplicated.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            this.giftRepository.save(this.giftSerializer.create(gift));
        }
    }

    public void delete(long id) {
        try {
            this.giftRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public void update(GiftModel gift, long id) {
        GiftModel prev = giftRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        GiftModel next = giftSerializer.update(prev, gift);
        giftRepository.save(next);
    }
}
