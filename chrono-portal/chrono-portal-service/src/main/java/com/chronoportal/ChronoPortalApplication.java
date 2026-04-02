package com.chronoportal;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

@SpringBootApplication
public class ChronoPortalApplication {

    @Value("${spring.datasource.url}")
    private String datasourceUrl;
    
    @Value("${spring.datasource.username}")
    private String username;
    
    @Value("${spring.datasource.password}")
    private String password;

    public static void main(String[] args) {
        SpringApplication.run(ChronoPortalApplication.class, args);
    }

    @PostConstruct
    public void init() {
        System.out.println("Initializing database...");
        try {
            // Connect to MySQL without specifying database
            String url = "jdbc:mysql://116.198.198.109:3306/?useUnicode=true&characterEncoding=utf8&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true";
            
            try (Connection conn = DriverManager.getConnection(url, username, password)) {
                Statement stmt = conn.createStatement();
                
                // Create database if not exists
                stmt.execute("CREATE DATABASE IF NOT EXISTS chrono_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                System.out.println("Database 'chrono_portal' created or already exists!");
                
                // Use the database
                stmt.execute("USE chrono_portal");
                
                // Create tables
                stmt.execute("""
                    CREATE TABLE IF NOT EXISTS banners (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        subtitle TEXT,
                        image_url VARCHAR(500) NOT NULL,
                        sort_order INT NOT NULL DEFAULT 0,
                        is_active BOOLEAN NOT NULL DEFAULT TRUE,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    )
                """);
                
                stmt.execute("""
                    CREATE TABLE IF NOT EXISTS gameplays (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        description TEXT,
                        icon_url VARCHAR(500),
                        sort_order INT NOT NULL DEFAULT 0,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    )
                """);
                
                stmt.execute("""
                    CREATE TABLE IF NOT EXISTS game_screenshots (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        image_url VARCHAR(500) NOT NULL,
                        sort_order INT NOT NULL DEFAULT 0,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                """);
                
                stmt.execute("""
                    CREATE TABLE IF NOT EXISTS dev_processes (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        description TEXT,
                        image_url VARCHAR(500),
                        sort_order INT NOT NULL DEFAULT 0,
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                    )
                """);
                
                System.out.println("Tables created successfully!");
                
                // Insert sample data if tables are empty
                var rs = stmt.executeQuery("SELECT COUNT(*) FROM banners");
                rs.next();
                if (rs.getInt(1) == 0) {
                    stmt.execute("""
                        INSERT INTO banners (title, subtitle, image_url, sort_order, is_active) VALUES
                        ('Chrono Portal', '穿越时空的冒险之旅', '/images/banner1.jpg', 1, TRUE),
                        ('像素风格RPG', '经典日本像素游戏风格', '/images/banner2.jpg', 2, TRUE)
                    """);
                    
                    stmt.execute("""
                        INSERT INTO gameplays (title, description, icon_url, sort_order) VALUES
                        ('时空穿越', '使用神秘的时空之门，在不同历史时期之间穿梭冒险', '/images/icons/time.png', 1),
                        ('战斗系统', '回合制战斗系统，搭配华丽的像素技能特效', '/images/icons/battle.png', 2),
                        ('角色养成', '收集和培养各种角色，解锁独特技能', '/images/icons/character.png', 3),
                        ('剧情探索', '深入体验扣人心弦的故事情节', '/images/icons/story.png', 4)
                    """);
                    
                    stmt.execute("""
                        INSERT INTO game_screenshots (title, image_url, sort_order) VALUES
                        ('战斗场景', '/images/screenshots/battle1.jpg', 1),
                        ('地图探索', '/images/screenshots/map1.jpg', 2),
                        ('角色界面', '/images/screenshots/character1.jpg', 3),
                        ('剧情对话', '/images/screenshots/dialogue1.jpg', 4),
                        ('Boss战', '/images/screenshots/boss1.jpg', 5)
                    """);
                    
                    stmt.execute("""
                        INSERT INTO dev_processes (title, description, image_url, sort_order) VALUES
                        ('概念设计', '我们从零开始，构思了独特的时间旅行机制和像素艺术风格。', '/images/dev/concept.jpg', 1),
                        ('美术制作', '使用专业像素美术工具，逐像素绘制游戏角色和场景。', '/images/dev/art.jpg', 2),
                        ('程序开发', '基于现代化的游戏引擎，实现了流畅的战斗系统。', '/images/dev/code.jpg', 3),
                        ('音乐音效', '邀请知名音乐人创作原创配乐，营造沉浸式氛围。', '/images/dev/music.jpg', 4),
                        ('测试优化', '经过多轮测试，持续优化游戏平衡性和体验。', '/images/dev/test.jpg', 5)
                    """);
                    
                    System.out.println("Sample data inserted!");
                }
                
                System.out.println("Database initialization completed!");
            }
        } catch (Exception e) {
            System.err.println("Database initialization error: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
