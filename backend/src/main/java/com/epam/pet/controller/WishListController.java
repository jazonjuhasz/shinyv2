package com.epam.pet.controller;

import com.epam.pet.model.db.GiftModel;
import com.epam.pet.model.db.UserGiftDAOModel;
import com.epam.pet.service.WishListService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/myGifts/wishlist")
@Api(value = "Wishlist")
public class WishListController {
    private final WishListService wishListService;

    @Autowired
    public WishListController(WishListService wishListService) {
        this.wishListService = wishListService;
    }

    @GetMapping()
    public List<UserGiftDAOModel> getMyWishList() {
        return this.wishListService.index();
    }

    @GetMapping("/available")
    public List<GiftModel> getGiftsNotOnMyList() {
        return this.wishListService.getGiftsNotOnMyList();
    }

    @PostMapping("/{id}")
    public void createWish(@PathVariable long id) {
        this.wishListService.create(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        this.wishListService.delete(id);
    }

}
