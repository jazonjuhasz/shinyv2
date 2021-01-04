package com.epam.pet.repository;

import com.epam.pet.model.db.FriendModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FriendRepository extends JpaRepository<FriendModel, Long> {

    @Query(value = "SELECT id FROM friend WHERE user_id_1 = ?1 AND pending = true", nativeQuery = true)
    List<Long> findByUserId_1(long id);

    @Query(value = "SELECT COUNT(*) FROM friend WHERE (user_id_1 = ?1 AND user_id_2 = ?2) " +
            "OR (user_id_1 = ?2 AND user_id_2 = ?1);", nativeQuery = true)
    long findDuplicates(long userId, long friendId);

    @Query(value = "SELECT COUNT(*) FROM friend WHERE (user_id_1 = ?1 AND user_id_2 = ?2 AND pending = false) " +
            "OR (user_id_1 = ?2 AND user_id_2 = ?1 AND pending = false)", nativeQuery = true)
    long findMyFriend(long userId, long friendId);
}
