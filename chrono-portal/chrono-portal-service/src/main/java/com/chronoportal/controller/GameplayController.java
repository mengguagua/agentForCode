package com.chronoportal.controller;

import com.chronoportal.entity.Gameplay;
import com.chronoportal.repository.GameplayRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gameplays")
@CrossOrigin(origins = "*")
public class GameplayController {
    
    private final GameplayRepository gameplayRepository;
    
    public GameplayController(GameplayRepository gameplayRepository) {
        this.gameplayRepository = gameplayRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Gameplay>> getAllGameplays() {
        List<Gameplay> gameplays = gameplayRepository.findAllByOrderBySortOrderAsc();
        return ResponseEntity.ok(gameplays);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Gameplay> getGameplayById(@PathVariable Long id) {
        return gameplayRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Gameplay> createGameplay(@RequestBody Gameplay gameplay) {
        Gameplay saved = gameplayRepository.save(gameplay);
        return ResponseEntity.ok(saved);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Gameplay> updateGameplay(@PathVariable Long id, @RequestBody Gameplay gameplay) {
        return gameplayRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(gameplay.getTitle());
                    existing.setDescription(gameplay.getDescription());
                    existing.setIconUrl(gameplay.getIconUrl());
                    existing.setSortOrder(gameplay.getSortOrder());
                    return ResponseEntity.ok(gameplayRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGameplay(@PathVariable Long id) {
        gameplayRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
