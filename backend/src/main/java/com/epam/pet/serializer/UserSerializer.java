package com.epam.pet.serializer;

import com.epam.pet.model.user.User;
import com.epam.pet.model.user.UserPaginationModel;
import com.epam.pet.model.user.UserRequest;
import com.epam.pet.model.db.UserModel;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserSerializer {

    public UserModel save(UserRequest req, String password) {
        return new UserModel(
                req.getUserName(),
                req.getFirstName(),
                req.getLastName(),
                req.getEmail(),
                password);
    }

    public User read(UserModel model) {
        return new User(
                model.getId(),
                model.getUserName(),
                model.getFirstName(),
                model.getLastName(),
                model.getEmail()
        );
    }

    public UserPaginationModel index(long count, Iterable<UserModel> users) {
        List<User> userList = new ArrayList<>();
        users.forEach(user -> {
            userList.add(read(user));
        });
        return new UserPaginationModel(count, userList);
    }

    public UserModel update(UserModel model, UserRequest req, String password) {
        return new UserModel(
                model.getId(),
                req.getUserName(),
                req.getFirstName(),
                req.getLastName(),
                req.getEmail(),
                password
                );
    }
}
