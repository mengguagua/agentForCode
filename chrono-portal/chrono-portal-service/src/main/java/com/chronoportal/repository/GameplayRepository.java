package com.chronoportal.repository;

import com.chronoportal.entity.Gameplay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GameplayRepository extends JpaRepository<Gameplay, Long> {
    List<Gameplay> findAllByOrderBySortOrderAsc();
}
