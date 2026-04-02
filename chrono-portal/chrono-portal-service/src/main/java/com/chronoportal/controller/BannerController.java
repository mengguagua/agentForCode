package com.chronoportal.controller;

import com.chronoportal.entity.Banner;
import com.chronoportal.repository.BannerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/banners")
@CrossOrigin(origins = "*")
public class BannerController {
    
    private final BannerRepository bannerRepository;
    
    public BannerController(BannerRepository bannerRepository) {
        this.bannerRepository = bannerRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<Banner>> getActiveBanners() {
        List<Banner> banners = bannerRepository.findByIsActiveOrderBySortOrderAsc(true);
        return ResponseEntity.ok(banners);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Banner>> getAllBanners() {
        List<Banner> banners = bannerRepository.findAll();
        return ResponseEntity.ok(banners);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Banner> getBannerById(@PathVariable Long id) {
        return bannerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Banner> createBanner(@RequestBody Banner banner) {
        Banner saved = bannerRepository.save(banner);
        return ResponseEntity.ok(saved);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Banner> updateBanner(@PathVariable Long id, @RequestBody Banner banner) {
        return bannerRepository.findById(id)
                .map(existing -> {
                    existing.setTitle(banner.getTitle());
                    existing.setSubtitle(banner.getSubtitle());
                    existing.setImageUrl(banner.getImageUrl());
                    existing.setSortOrder(banner.getSortOrder());
                    existing.setIsActive(banner.getIsActive());
                    return ResponseEntity.ok(bannerRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBanner(@PathVariable Long id) {
        bannerRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
