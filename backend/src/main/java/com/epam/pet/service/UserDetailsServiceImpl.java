package com.epam.pet.service;

import com.epam.pet.model.db.UserModel;
import com.epam.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static java.util.Collections.emptyList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserModel> applicationUser = userRepository.findByUserName(username);
        if (applicationUser.isEmpty()) {
            throw new UsernameNotFoundException(username);
        }
        return new User(applicationUser.get().getUserName(), applicationUser.get().getPassword(), emptyList());
    }
}
