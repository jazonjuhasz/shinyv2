package com.epam.pet.service;

import com.epam.pet.controller.ProfileController;
import com.epam.pet.model.db.*;
import com.epam.pet.repository.FriendRepository;
import com.epam.pet.repository.UserGiftDAORepository;
import com.epam.pet.repository.UserGiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class UserGiftService {
    private final UserGiftDAORepository userGiftDAORepository;
    private final ProfileController profileController;
    private final UserGiftRepository userGiftRepository;
    private final GiftService giftService;
    private final FriendRepository friendRepository;

    @Autowired
    public UserGiftService(
            UserGiftDAORepository userGiftDAORepository,
            UserGiftRepository userGiftRepository,
            FriendRepository friendRepository,
            ProfileController profileController,
            GiftService giftService
            ) {
        this.userGiftDAORepository = userGiftDAORepository;
        this.profileController = profileController;
        this.friendRepository = friendRepository;
        this.userGiftRepository = userGiftRepository;
        this.giftService = giftService;
    }

    private long getLoggedInUserId() {
        return this.profileController.getLoggedInUserId();
    }

    public List<UserGiftDAOModel> index() {
        long myId = this.getLoggedInUserId();
        return this.userGiftDAORepository.findGiftByUserId(myId);
    }

    private void create(UserGiftModel req) {
        UserGiftModel newUserGiftModel = new UserGiftModel(req.getUserId(), req.getGiftId());
        this.userGiftRepository.save(newUserGiftModel);
    }

    public void delete(long id) {
        try {
            this.userGiftRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public GiftModel getNewGift() {
        List<GiftModel> gifts = this.giftService.getAll();

        int max = gifts.size();
        int nthGift = (int) (Math.random() * max);
        long randomGiftId = gifts.get(nthGift).getId();

        UserGiftModel insertable = new UserGiftModel(this.getLoggedInUserId(), randomGiftId);
        this.create(insertable);
        checkIfItsOnWishList(this.getLoggedInUserId(), insertable.getGiftId());
        return this.giftService.get(randomGiftId);
    }

    public void sendGift(long userGiftId, long friendId) {
        long myId = this.getLoggedInUserId();
        UserGiftModel gift = this.userGiftRepository.findById(userGiftId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        checkIfWeAreFriends(myId, friendId);
        checkIfItsMyGift(myId, gift.getUserId());
        checkIfItsOnWishList(friendId, gift.getGiftId());
        UserGiftModel toSave = new UserGiftModel(
                gift.getId(),
                friendId,
                gift.getGiftId()
        );
        this.userGiftRepository.save(toSave);
    }

    private void checkIfWeAreFriends(long myId, long friendId) {
        long confirmedFriend = this.friendRepository.findMyFriend(myId, friendId);
        if (confirmedFriend != 1) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    private void checkIfItsMyGift(long myId, long giftsUserId) {
        if (myId != giftsUserId) throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }

    private void checkIfItsOnWishList(long friendId, long giftId) {
        Optional<UserGiftModel> item = this.userGiftRepository.findGiftOnWishList(friendId, giftId);
        item.ifPresent(userGiftModel -> this.userGiftRepository.deleteById(userGiftModel.getId()));
    }
}
