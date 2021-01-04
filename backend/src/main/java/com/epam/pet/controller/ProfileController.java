package com.epam.pet.controller;

import com.epam.pet.model.user.User;
import com.epam.pet.model.user.UserRequest;
import com.epam.pet.repository.UserRepository;
import com.epam.pet.serializer.UserSerializer;
import com.epam.pet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final UserRepository userRepository;
    private final UserSerializer userSerializer;
    private final UserService userService;

    @Autowired
    public ProfileController(
            UserRepository userRepository,
            UserSerializer userSerializer,
            UserService userService) {
        this.userRepository = userRepository;
        this.userSerializer = userSerializer;
        this.userService = userService;
    }

    public long getLoggedInUserId() {
        return this.getLoggedInUser().getId();
    }

    @GetMapping
    public User getLoggedInUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return userSerializer.read(userRepository.findByUserName(auth.getName()).get());
    }

    @PostMapping
    public void updateLoggedInUser(@RequestBody UserRequest user) {
        long loggedInUserId = this.getLoggedInUserId();
        this.userService.update(user, loggedInUserId);
    }

}
