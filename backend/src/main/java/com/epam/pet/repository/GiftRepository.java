package com.epam.pet.repository;

import com.epam.pet.model.db.GiftModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GiftRepository extends JpaRepository<GiftModel, Long> {

    Optional<GiftModel> findByName(String name);

    @Query(value = "SELECT * FROM gift LIMIT ?1 OFFSET ?2", nativeQuery = true)
    List<GiftModel> paginate(int limit, int offset);
}
