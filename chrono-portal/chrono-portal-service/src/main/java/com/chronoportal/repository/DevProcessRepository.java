package com.chronoportal.repository;

import com.chronoportal.entity.DevProcess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DevProcessRepository extends JpaRepository<DevProcess, Long> {
    List<DevProcess> findAllByOrderBySortOrderAsc();
}
