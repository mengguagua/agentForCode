package com.chronoportal.controller;

import com.chronoportal.entity.GameScreenshot;
import com.chronoportal.repository.GameScreenshotRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/screenshots")
@CrossOrigin(origins = "*")
public class GameScreenshotController {
    
    private final GameScreenshotRepository screenshotRepository;
    
    public GameScreenshotController(GameScreenshotRepository screenshotRepository) {
        this.screenshotRepository = screenshotRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<GameScreenshot>> getAllScreenshots() {
        List<GameScreenshot> screenshots = screenshotRepository.findAllByOrderBySortOrderAsc();
        return ResponseEntity.ok(screenshots);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<GameScreenshot> getScreenshotById(@PathVariable Long id) {
        return screenshotRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<GameScreenshot> createScreenshot(@RequestBody GameScreenshot screenshot) {
        GameScreenshot saved = screenshotRepository.save(screenshot);
        return ResponseEntity.ok(saved);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<GameScreenshot> updateScreenshot(@PathVariable Long id, @RequestBody GameScreenshot screenshot) {
        return screenshotRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(screenshot.getTitle());
                    existing.setImageUrl(screenshot.getImageUrl());
                    existing.setSortOrder(screenshot.getSortOrder());
                    return ResponseEntity.ok(screenshotRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScreenshot(@PathVariable Long id) {
        screenshotRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
