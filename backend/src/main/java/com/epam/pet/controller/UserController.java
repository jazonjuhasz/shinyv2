package com.epam.pet.controller;

import com.epam.pet.model.user.User;
import com.epam.pet.model.user.UserPaginationModel;
import com.epam.pet.model.user.UserRequest;
import com.epam.pet.service.UserService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Api(value = "User", description = "Resource for getting and modifying Users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Get all Users",
            response = UserPaginationModel.class)
    @GetMapping
    public UserPaginationModel getUsers(
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "limit") String limit,
            @RequestParam(name = "offset") String offset) {

        if (name != null) {
            return this.userService.findUsersByChunk(name, Integer.parseInt(limit), Integer.parseInt(offset));
        }
        return this.userService.index(Integer.parseInt(limit), Integer.parseInt(offset));
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable long id) {
        return this.userService.get(id);
    }

    @PostMapping
    public void createUser(@RequestBody UserRequest user) {
        this.userService.create(user);
    }

    @PutMapping("/{id}")
    public void updateUser(@RequestBody UserRequest user, @PathVariable long id) {
        this.userService.update(user, id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable long id) {
        this.userService.delete(id);
    }
}
