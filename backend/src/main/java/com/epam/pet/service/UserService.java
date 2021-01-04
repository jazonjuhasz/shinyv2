package com.epam.pet.service;

import com.epam.pet.model.user.User;
import com.epam.pet.model.user.UserPaginationModel;
import com.epam.pet.serializer.UserSerializer;
import com.epam.pet.model.user.UserRequest;
import com.epam.pet.model.db.UserModel;
import com.epam.pet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserSerializer userSerializer;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(
            UserSerializer userSerializer,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userSerializer = userSerializer;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserPaginationModel index(int limit, int offset) {
        Iterable<UserModel> users = this.userRepository.paginate(limit, offset);
        long count = this.userRepository.count();
        return this.userSerializer.index(count, users);
    }

    public User get(long id) {
        UserModel model = this.userRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        return this.userSerializer.read(model);
    }

    public void create(final UserRequest req) throws DuplicateKeyException {
        Optional<UserModel> isDuplicated = userRepository.findByUserName(req.getUserName());
        if (isDuplicated.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            String password = passwordEncoder.encode(req.getPassword());
            UserModel userModel = userSerializer.save(req, password);
            userRepository.save(userModel);
        }
    }

    public void update(final UserRequest req, long id) {
        String password = passwordEncoder.encode(req.getPassword());
        UserModel prev = userRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        UserModel next = userSerializer.update(prev, req, password);
        userRepository.save(next);
    }

    public void delete(long id) {
        try {
            this.userRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    public UserPaginationModel findUsersByChunk(String name, int limit, int offset) {
        Iterable<UserModel> users = this.userRepository.findByNameChunk(name, limit, offset);
        long count = this.userRepository.findByNameChunk(name).size();
        return this.userSerializer.index(count, users);
    }
}
