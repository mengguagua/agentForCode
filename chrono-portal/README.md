# Chrono Portal 游戏官网

## 项目介绍

这是一个游戏官网项目，包含：
- **后端服务** (Spring Boot + MySQL)
- **前端页面** (React + TypeScript + Vite)

## 启动说明

### 1. 启动后端服务

```bash
cd /Users/gcc/agent/agentForCode/chrono-portal/chrono-portal-service

# 使用 Maven wrapper 启动（会自动下载依赖）
./mvnw spring-boot:run -s settings.xml
```

或者如果已经编译过：
```bash
./mvnw spring-boot:run -s settings.xml
```

**后端服务地址**: http://localhost:8080

**API 端点**:
- GET /api/home - 获取首页数据（包含 banners、gameplays、screenshots、devProcesses）
- GET /api/banners - 获取所有 Banner
- GET /api/gameplays - 获取所有玩法介绍
- GET /api/screenshots - 获取所有截图
- GET /api/dev-processes - 获取开发历程

### 2. 启动前端服务

```bash
cd /Users/gcc/agent/agentForCode/chrono-portal/chrono-portal-front

# 使用 nvm 切换到 Node 20
source ~/.nvm/nvm.sh
nvm use 20

# 安装依赖（首次运行）
npm install

# 启动开发服务器
npm run dev
```

**前端服务地址**: http://localhost:3000

### 3. 访问应用

打开浏览器访问: http://localhost:3000

- PC 设备会重定向到 PC 版页面
- 移动设备会重定向到 Mobile 版页面

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
│   │   ├── api.ts                 # API 调用
│   │   ├── types.ts               # 类型定义
│   │   └── App.tsx                # 主组件
│   └── package.json               # npm 配置
│
└── README.md                       # 项目说明
```

## 注意事项

1. **启动顺序**: 先启动后端服务，再启动前端服务
2. **端口占用**: 确保 8080 和 3000 端口未被占用
3. **数据库**: 确保 MySQL 数据库服务器可访问
4. **Node 版本**: 前端需要 Node 20+

## 常用命令

```bash
# 停止后端服务
lsof -i :8080 | grep LISTEN | awk '{print $2}' | xargs kill

# 停止前端服务
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill

# 检查服务状态
lsof -i :8080
lsof -i :3000
```
