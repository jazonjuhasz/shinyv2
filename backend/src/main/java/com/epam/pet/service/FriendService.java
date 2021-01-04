package com.epam.pet.service;

import com.epam.pet.controller.ProfileController;
import com.epam.pet.model.db.FriendDAOModel;
import com.epam.pet.model.db.FriendModel;
import com.epam.pet.repository.FriendDAORepository;
import com.epam.pet.repository.FriendRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class FriendService {
    private final FriendDAORepository friendDAORepository;
    private final FriendRepository friendRepository;
    private final ProfileController profileController;

    @Autowired
    public FriendService(
            FriendDAORepository friendDAORepository,
            FriendRepository friendRepository,
            ProfileController profileController) {
        this.friendDAORepository = friendDAORepository;
        this.friendRepository = friendRepository;
        this.profileController = profileController;
    }

    public List<FriendDAOModel> index() {
        long loggedInUserId = this.profileController.getLoggedInUserId();
        List<FriendDAOModel> friends= this.friendDAORepository.getFriends(loggedInUserId);
        List<Long> idList = this.friendRepository.findByUserId_1(loggedInUserId);
        friends.removeIf(e -> idList.contains(e.getId()));
        return friends;
    }

    public void create(long id) {
        long userId = this.profileController.getLoggedInUserId();
        long duplicate = this.friendRepository.findDuplicates(userId, id);
        if (duplicate > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            this.friendRepository.save(new FriendModel(userId, id, true));
        }
    }

    public void update(long id) {
        FriendModel record = this.friendRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (record.getUserId_2() != this.profileController.getLoggedInUserId()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        FriendModel updated = new FriendModel(
                record.getId(),
                record.getUserId_1(),
                record.getUserId_2(),
                false
        );
        this.friendRepository.save(updated);
    }

    public void delete(long id) {
        this.friendRepository.deleteById(id);
    }

    public List<FriendDAOModel> getMyRequests() {
        long myId = this.profileController.getLoggedInUserId();
        return this.friendDAORepository.getMyRequests(myId);
    }

    public List<FriendDAOModel> getFriendsWhoWishThisGift(long giftId) {
        long myId = this.profileController.getLoggedInUserId();
        return this.friendDAORepository.getFriendsWhoWishThisGift(myId, giftId);
    }
}
