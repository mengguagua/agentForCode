package com.chronoportal.controller;

import com.chronoportal.entity.Banner;
import com.chronoportal.entity.GameScreenshot;
import com.chronoportal.entity.Gameplay;
import com.chronoportal.entity.DevProcess;
import com.chronoportal.repository.BannerRepository;
import com.chronoportal.repository.GameScreenshotRepository;
import com.chronoportal.repository.GameplayRepository;
import com.chronoportal.repository.DevProcessRepository;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins = "*")
public class HomeController {
    
    private final BannerRepository bannerRepository;
    private final GameplayRepository gameplayRepository;
    private final GameScreenshotRepository screenshotRepository;
    private final DevProcessRepository devProcessRepository;
    
    public HomeController(
            BannerRepository bannerRepository,
            GameplayRepository gameplayRepository,
            GameScreenshotRepository screenshotRepository,
            DevProcessRepository devProcessRepository) {
        this.bannerRepository = bannerRepository;
        this.gameplayRepository = gameplayRepository;
        this.screenshotRepository = screenshotRepository;
        this.devProcessRepository = devProcessRepository;
    }
    
    @GetMapping
    public ResponseEntity<HomePageData> getHomePageData() {
        HomePageData data = new HomePageData();
        data.setBanners(bannerRepository.findByIsActiveOrderBySortOrderAsc(true));
        data.setGameplays(gameplayRepository.findAllByOrderBySortOrderAsc());
        data.setScreenshots(screenshotRepository.findAllByOrderBySortOrderAsc());
        data.setDevProcesses(devProcessRepository.findAllByOrderBySortOrderAsc());
        return ResponseEntity.ok(data);
    }
    
    @Data
    public static class HomePageData {
        private List<Banner> banners;
        private List<Gameplay> gameplays;
        private List<GameScreenshot> screenshots;
        private List<DevProcess> devProcesses;
    }
}
