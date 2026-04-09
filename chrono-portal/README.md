# Chrono Portal 游戏官网

## 项目介绍

**时空调牌师 (Chrono Portal)** - 一款融合时间魔法的策略卡牌游戏官网。

这是一个完整的游戏官网项目，包含：
- **后端服务** (Spring Boot + MySQL)
- **前端页面** (React + TypeScript + Vite) - 采用现代卡牌游戏风格设计

## 新增特性

### UI 优化 (2024年)
- ✨ 采用暗黑奇幻主题设计
- ✨ 添加流畅的动画效果（浮动卡片、渐入动画、发光效果）
- ✨ 使用 Cinzel 字体打造中世纪奇幻风格
- ✨ 卡牌式布局和交互效果
- ✨ 响应式设计，支持移动端
- ✨ 使用静态资源目录 `/assets` 中的卡牌素材

## 启动说明

### 1. 启动后端服务 (可选 - 如不需要动态数据可跳过)

```bash
cd /Users/gcc/agent/agentForCode/chrono-portal/chrono-portal-service

# 使用 Maven wrapper 启动
./mvnw spring-boot:run -s settings.xml
```

**后端服务地址**: http://localhost:8080

**API 端点**:
- GET /api/home - 获取首页数据
- GET /api/banners - 获取所有 Banner
- GET /api/gameplays - 获取所有玩法介绍
- GET /api/screenshots - 获取所有截图
- GET /api/dev-processes - 获取开发历程

### 2. 启动前端服务

cd /Users/gcc/agent/agentForCode/chrono-portal/chrono-portal-front
export PATH="/Users/gcc/.nvm/versions/node/v20.19.5/bin:$PATH"
npm run dev


```bash
cd /Users/gcc/agent/agentForCode/chrono-portal/chrono-portal-front

# 方法一：使用 nvm 切换到 Node 20
source ~/.nvm/nvm.sh
nvm use 20

# 方法二：使用指定路径的 Node（推荐）
/Users/gcc/.nvm/versions/node/v20.19.5/bin/node /Users/gcc/.nvm/versions/node/v20.19.5/bin/npm run dev
```

或者先安装依赖：
```bash
export PATH="/Users/gcc/.nvm/versions/node/v20.19.5/bin:$PATH"
npm install
npm run dev
```

**前端服务地址**: http://localhost:3000

### 3. 访问应用

打开浏览器访问: http://localhost:3000

> **注意**: 前端已内置默认数据，即使后端未启动也能正常显示内容。

## 构建生产版本

```bash
cd /Users/gcc/agent/agentForCode/chrono-portal/chrono-portal-front
export PATH="/Users/gcc/.nvm/versions/node/v20.19.5/bin:$PATH"
npm run build
```

构建产物将输出到 `dist/` 目录。

## 数据库配置

数据库连接信息在 `chrono-portal-service/src/main/resources/application.properties` 中配置：

```properties
spring.datasource.url=jdbc:mysql://116.198.198.109:3306/chrono_portal
spring.datasource.username=root
spring.datasource.password=Gcc@163.com
```

**注意**: 应用启动时会自动创建 `chrono_portal` 数据库和所有表结构。

## 项目结构

```
chrono-portal/
├── chrono-portal-service/          # 后端服务 (Spring Boot)
│   ├── src/main/java/com/chronoportal/
│   │   ├── entity/                 # 实体类
│   │   ├── repository/             # 数据仓库
│   │   ├── controller/             # 控制器
│   │   └── ChronoPortalApplication.java  # 应用入口
│   ├── src/main/resources/
│   │   ├── application.properties  # 配置文件
│   │   └── data.sql               # 数据初始化
│   └── pom.xml                     # Maven 配置
│
├── chrono-portal-front/            # 前端页面 (React + TypeScript)
│   ├── src/
│   │   ├── components/             # React 组件
│   │   │   ├── Banner.tsx         # 顶部横幅（浮动卡片动画）
│   │   │   ├── GameplaySection.tsx # 游戏特色（卡牌式布局）
│   │   │   ├── ScreenshotsSection.tsx # 截图展示
│   │   │   ├── DevProcessSection.tsx # 开发历程（时间线样式）
│   │   │   └── Footer.tsx         # 页脚
│   │   ├── api.ts                 # API 调用
│   │   ├── types.ts               # 类型定义
│   │   ├── App.tsx                # 主组件
│   │   └── index.css              # 全局样式（暗色主题）
│   ├── public/
│   │   └── assets/                # 静态资源符号链接
│   │       ├── ui/                # UI 素材（卡牌、按钮、背景）
│   │       ├── sprite/            # 精灵图（怪物、卡牌、能源）
│   │       ├── audio/             # 音效
│   │       └── fonts/             # 字体
│   └── package.json               # npm 配置
│
├── assets/                         # 静态资源原始目录
│   ├── ui/                        # UI 素材
│   ├── sprite/                    # 精灵图
│   ├── audio/                     # 音效
│   └── fonts/                     # 字体
│
└── README.md                       # 项目说明
```

## 常用命令

```bash
# 停止后端服务
lsof -i :8080 | grep LISTEN | awk '{print $2}' | xargs kill

# 停止前端服务
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill

# 检查服务状态
lsof -i :8080
lsof -i :3000

# 前端构建
cd chrono-portal-front
npm run build
```

## 技术栈

- **前端**: React 18, TypeScript, Vite 5
- **后端**: Spring Boot 3, MySQL 8
- **样式**: CSS3 (动画、过渡、响应式)
- **字体**: Cinzel (标题), Inter (正文)

## 注意事项

1. **启动顺序**: 如果需要动态数据，先启动后端服务，再启动前端服务
2. **端口占用**: 确保 8080 和 3000 端口未被占用
3. **数据库**: 确保 MySQL 数据库服务器可访问（仅后端需要）
4. **Node 版本**: 前端需要 Node 20+
5. **独立运行**: 前端已内置默认内容，即使后端未启动也能正常显示

## 截图预览

启动后访问 http://localhost:3000 即可看到：
- 🎴 带有浮动动画的卡牌展示
- ✨ 暗色奇幻主题界面
- 💫 流畅的CSS动画效果
- 📱 响应式布局设计
