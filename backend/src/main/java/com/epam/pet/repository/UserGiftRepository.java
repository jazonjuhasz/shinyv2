package com.epam.pet.repository;

import com.epam.pet.model.db.UserGiftModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserGiftRepository extends JpaRepository<UserGiftModel, Long> {

    @Query(value = "SELECT * FROM user_gift WHERE user_id = ?1 AND gift_id = ?2 AND wish = true", nativeQuery = true)
    Optional<UserGiftModel> findGiftOnWishList(long userId, long giftId);
}
