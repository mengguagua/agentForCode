package com.chronoportal.repository;

import com.chronoportal.entity.GameScreenshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GameScreenshotRepository extends JpaRepository<GameScreenshot, Long> {
    List<GameScreenshot> findAllByOrderBySortOrderAsc();
}
