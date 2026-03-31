const express = require('express');
const path = require('path');

const app = express();
const PORT = 3033;

/**
 * 判断用户代理是否为移动设备
 * @param {string} ua - User-Agent 字符串
 * @returns {boolean} - 是否为移动设备
 */
function isMobileDevice(ua) {
    // 常见的移动设备关键词
    const mobileKeywords = [
        'Android', 'webOS', 'iPhone', 'iPad', 'iPod',
        'BlackBerry', 'Windows Phone', 'Mobile', 'mobile',
        'CriOS', 'FxiOS'  // iOS 上的 Chrome 和 Firefox
    ];
    
    ua = ua || '';
    return mobileKeywords.some(keyword => ua.includes(keyword));
}

/**
 * 中间件：根据 User-Agent 进行设备类型检测并重定向
 */
app.use((req, res, next) => {
    const ua = req.headers['user-agent'] || '';
    
    // 如果已经是明确的路由请求，直接放行
    if (req.path === '/mobile' || req.path === '/pc') {
        return next();
    }
    
    // 根据设备类型进行重定向
    if (isMobileDevice(ua)) {
        res.redirect('/mobile');
    } else {
        res.redirect('/pc');
    }
});

/**
 * 移动端路由：显示手机端新闻页面
 */
app.get('/mobile', (req, res) => {
    res.sendFile(path.join(__dirname, 'mobile.html'));
});

/**
 * PC端路由：显示带二维码占位符的页面
 */
app.get('/pc', (req, res) => {
    res.sendFile(path.join(__dirname, 'pc.html'));
});

/**
 * 首页路由：重定向到对应端
 */
app.get('/', (req, res) => {
    const ua = req.headers['user-agent'] || '';
    
    if (isMobileDevice(ua)) {
        res.redirect('/mobile');
    } else {
        res.redirect('/pc');
    }
});

/**
 * 启动服务器
 */
app.listen(PORT, () => {
    console.log(`🌐 UA-Redirect 服务已启动！`);
    console.log(`📍 访问地址：http://localhost:${PORT}`);
    console.log(`📱 手机访问将跳转到：/mobile`);
    console.log(`💻 PC访问将跳转到：/pc`);
});
