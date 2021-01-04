package com.epam.pet.repository;

import com.epam.pet.model.db.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {

    Optional<UserModel> findByUserName(String username);

    @Query(value="SELECT * FROM user LIMIT ?1 OFFSET ?2", nativeQuery = true)
    List<UserModel> paginate(int limit, int offset);

    @Query(value="SELECT * FROM user WHERE (username LIKE CONCAT('%', ?1, '%') " +
            "OR email LIKE CONCAT('%', ?1, '%'))", nativeQuery = true)
    List<UserModel> findByNameChunk(String name);

    @Query(value="SELECT * FROM user WHERE (username LIKE CONCAT('%', ?1, '%') " +
            "OR email LIKE CONCAT('%', ?1, '%')) LIMIT ?2 OFFSET ?3", nativeQuery = true)
    List<UserModel> findByNameChunk(String name, int limit, int offset);
}
