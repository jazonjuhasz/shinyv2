package com.epam.pet.service;

import com.epam.pet.controller.ProfileController;
import com.epam.pet.model.db.GiftModel;
import com.epam.pet.model.db.UserGiftDAOModel;
import com.epam.pet.model.db.UserGiftModel;
import com.epam.pet.repository.GiftRepository;
import com.epam.pet.repository.UserGiftDAORepository;
import com.epam.pet.repository.UserGiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WishListService {
    private final UserGiftDAORepository userGiftDAORepository;
    private final ProfileController profileController;
    private final UserGiftRepository userGiftRepository;
    private final GiftRepository giftRepository;

    @Autowired
    public WishListService(
            UserGiftDAORepository userGiftDAORepository,
            ProfileController profileController,
            UserGiftRepository userGiftRepository,
            GiftRepository giftRepository) {
        this.userGiftDAORepository = userGiftDAORepository;
        this.profileController = profileController;
        this.userGiftRepository = userGiftRepository;
        this.giftRepository = giftRepository;
    }

    public List<UserGiftDAOModel> index() {
        long myId = this.getLoggedInUserId();
        return this.userGiftDAORepository.getMyWishList(myId);
    }

    public List<GiftModel> getGiftsNotOnMyList() {
        List<GiftModel> allGifts = this.giftRepository.findAll();
        List<UserGiftDAOModel> myWishList = this.index();
        return allGifts.stream().filter(
                gift -> myWishList.stream().noneMatch(
                        myGift -> myGift.getGiftId() == gift.getId()))
                .collect(Collectors.toList());
    }

    public void create(long giftId) {
        long myId = this.getLoggedInUserId();
        UserGiftModel userGiftModel = new UserGiftModel(myId, giftId, true);
        this.userGiftRepository.save(userGiftModel);
    }

    public void delete(long id) {
        try {
            this.userGiftRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    private long getLoggedInUserId() {
        return this.profileController.getLoggedInUserId();
    }
}
