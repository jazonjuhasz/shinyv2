package com.epam.pet.controller;


import com.epam.pet.model.Gift.GiftPaginationModel;
import com.epam.pet.model.db.GiftModel;
import com.epam.pet.service.GiftService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gift")
@Api(value = "Gift")
public class GiftController {
    private final GiftService giftService;

    @Autowired
    public GiftController(GiftService giftService) {
        this.giftService = giftService;
    }

    @GetMapping
    public GiftPaginationModel getGifts(
            @RequestParam(name = "limit", required = true) String limit,
            @RequestParam(name = "offset", required = true) String offset) {
        return this.giftService.index(Integer.parseInt(limit), Integer.parseInt(offset));
    }

    @GetMapping("/{id}")
    public GiftModel getGiftById(@PathVariable long id) {
        return this.giftService.get(id);
    }

    @PostMapping
    public void createGift(@RequestBody GiftModel gift) {
        this.giftService.create(gift);
    }

    @PutMapping("/{id}")
    public void updateGift(@RequestBody GiftModel gift, @PathVariable long id) {
        this.giftService.update(gift, id);
    }

    @DeleteMapping("/{id}")
    public void deleteGift(@PathVariable long id) {
        this.giftService.delete(id);
    }
}
