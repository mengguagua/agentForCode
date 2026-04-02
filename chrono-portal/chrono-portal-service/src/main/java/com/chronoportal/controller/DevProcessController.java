package com.chronoportal.controller;

import com.chronoportal.entity.DevProcess;
import com.chronoportal.repository.DevProcessRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dev-processes")
@CrossOrigin(origins = "*")
public class DevProcessController {
    
    private final DevProcessRepository devProcessRepository;
    
    public DevProcessController(DevProcessRepository devProcessRepository) {
        this.devProcessRepository = devProcessRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<DevProcess>> getAllDevProcesses() {
        List<DevProcess> processes = devProcessRepository.findAllByOrderBySortOrderAsc();
        return ResponseEntity.ok(processes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DevProcess> getDevProcessById(@PathVariable Long id) {
        return devProcessRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<DevProcess> createDevProcess(@RequestBody DevProcess devProcess) {
        DevProcess saved = devProcessRepository.save(devProcess);
        return ResponseEntity.ok(saved);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<DevProcess> updateDevProcess(@PathVariable Long id, @RequestBody DevProcess devProcess) {
        return devProcessRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(devProcess.getTitle());
                    existing.setDescription(devProcess.getDescription());
                    existing.setImageUrl(devProcess.getImageUrl());
                    existing.setSortOrder(devProcess.getSortOrder());
                    return ResponseEntity.ok(devProcessRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevProcess(@PathVariable Long id) {
        devProcessRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
