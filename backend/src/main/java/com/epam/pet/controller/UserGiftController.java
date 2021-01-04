package com.epam.pet.controller;

import com.epam.pet.model.db.GiftModel;
import com.epam.pet.model.db.UserGiftDAOModel;
import com.epam.pet.model.db.UserGiftModel;
import com.epam.pet.service.UserGiftService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/myGifts")
@Api(value = "My gifts")
public class UserGiftController {
    private final UserGiftService userGiftService;

    @Autowired
    public UserGiftController(UserGiftService userGiftService) {
        this.userGiftService = userGiftService;
    }

    @GetMapping
    public List<UserGiftDAOModel> getLoggedInUsersGifts() {
        return this.userGiftService.index();
    }

    @GetMapping("/redeem")
    public GiftModel getNewGift() {
        return this.userGiftService.getNewGift();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        this.userGiftService.delete(id);
    }

    @PutMapping
    public void update(@RequestBody UserGiftModel req) {
        this.userGiftService.sendGift(req.getId(), req.getUserId());
    }
}
