package com.epam.pet.controller;

import com.epam.pet.model.db.FriendDAOModel;
import com.epam.pet.service.FriendService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/friend")
@Api(value = "Friend")
public class FriendController {
    private final FriendService friendService;

    @Autowired
    public FriendController(FriendService friendService) {
        this.friendService = friendService;
    }

    @GetMapping
    public List<FriendDAOModel> index() {
        return this.friendService.index();
    }

    @GetMapping("/myRequests")
    public List<FriendDAOModel> getMyRequests() {
        return this.friendService.getMyRequests();
    }

    @GetMapping("/wish/{id}")
    public List<FriendDAOModel> getFriendsWhoWishThisGift(@PathVariable long id) {
        return this.friendService.getFriendsWhoWishThisGift(id);
    }

    @PostMapping
    public void create(@RequestBody long id) {
        this.friendService.create(id);
    }

    @PutMapping("/{id}")
    public void update(@PathVariable long id) {
        this.friendService.update(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        this.friendService.delete(id);
    }
}
