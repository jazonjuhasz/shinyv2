package com.epam.pet.repository;

import com.epam.pet.model.db.UserGiftDAOModel;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface UserGiftDAORepository extends JpaRepository<UserGiftDAOModel, Long> {

    @Query(value="SELECT ug.id, g.id as gift_id, g.name, g.description FROM user_gift ug " +
            "INNER JOIN gift g ON ug.gift_id = g.id " +
            "INNER JOIN user u ON ug.user_id = u.id " +
            "WHERE u.id = ?1 AND wish = false ORDER BY ug.id ASC", nativeQuery = true)
    List<UserGiftDAOModel> findGiftByUserId(long id);

    @Query(value = "SELECT ug.id, g.id as gift_id, g.name, g.description FROM user_gift ug " +
            "INNER JOIN gift g ON ug.gift_id = g.id " +
            "INNER JOIN user u ON ug.user_id = u.id " +
            "WHERE u.id = ?1 AND wish = true ORDER BY ug.id ASC", nativeQuery = true)
    List<UserGiftDAOModel> getMyWishList(long id);
    }
