package com.epam.pet.repository;

import com.epam.pet.model.db.FriendDAOModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendDAORepository extends JpaRepository<FriendDAOModel, Long> {

    @Query(value = "SELECT friendId AS id, userId as user_id, firstname as first_name, lastname as last_name, pending " +
            "FROM (SELECT id AS friendId, user_id_1 AS userId, pending FROM friend " +
            "WHERE user_id_2 = ?1 " +
            "UNION SELECT id AS friendId, user_id_2 AS userId, pending FROM friend " +
            "WHERE user_id_1 = ?1) AS x " +
            "JOIN user u ON id = x.userId ORDER BY id ASC", nativeQuery = true)
    List<FriendDAOModel> getFriends(long userId);

    @Query(value = "SELECT friendId AS id, userId as user_id, firstname as first_name, lastname as last_name, pending " +
            "FROM (SELECT id AS friendId, user_id_2 AS userId, pending FROM friend " +
            "WHERE user_id_1 = ?1 AND pending = true) AS x " +
            "JOIN user u ON id = x.userId ORDER BY id ASC", nativeQuery = true)
    List<FriendDAOModel> getMyRequests(long userId);

    @Query(value = "SELECT myf.* FROM (SELECT friendId AS id, userId as user_id, firstname as first_name, lastname as last_name, pending " +
            "FROM (SELECT id AS friendId, user_id_1 AS userId, pending FROM friend " +
            "WHERE user_id_2 = ?1 AND pending = false " +
            "UNION SELECT id AS friendId, user_id_2 AS userId, pending FROM friend " +
            "WHERE user_id_1 = ?1 AND pending = false ) AS x " +
            "JOIN user u ON id = x.userId) AS myf " +
            "JOIN user_gift ug ON ug.user_id = myf.user_id WHERE gift_id = ?2 AND wish = true;", nativeQuery = true)
    List<FriendDAOModel> getFriendsWhoWishThisGift(long myId, long giftId);
}
