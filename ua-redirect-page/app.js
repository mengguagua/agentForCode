const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// 检测用户代理是否为移动设备
function isMobileDevice(userAgent) {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
}

// 首页路由 - 根据设备类型重定向
app.get('/', (req, res) => {
  const userAgent = req.headers['user-agent'] || '';
  
  if (isMobileDevice(userAgent)) {
    res.redirect('/mobile');
  } else {
    res.redirect('/pc');
  }
});

// 手机端页面
app.get('/mobile', (req, res) => {
  res.sendFile(path.join(__dirname, 'mobile.html'));
});

// PC端页面
app.get('/pc', (req, res) => {
  res.sendFile(path.join(__dirname, 'pc.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器已启动: http://localhost:${PORT}`);
  console.log('手机访问将跳转到 /mobile');
  console.log('PC访问将跳转到 /pc');
});
