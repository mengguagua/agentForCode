“我想建一个网页，需求是：识别访问源是从 PC 还是手机。手机访问直接跳转到 /mobile（内容是一段简单的新闻）；PC 访问跳转到 /pc（内容是一个带二维码占位符的页面）。
请使用 Node.js + Express 实现这个全栈方案，请严格遵守以下操作规范：

请使用 context7 查阅最新文档，对各个技术栈使用最新规范”

如果遇到node 版本问题。以下路径有node20和对应的npm
/Users/gcc/.nvm/versions/node/v20.19.5/bin/node
/Users/gcc/.nvm/versions/node/v20.19.5/bin/npm

图片生成访问路径是：https://api.minimaxi.com/v1/image_generation

目录隔离：请在当前目录下规划一个名为 ua-redirect-page 的子文件夹，所有的代码文件（app.js、mobile.html、pc.html 等）的 filePath 都必须以 ua-redirect-page/ 开头。

执行命令：使用 execute_command 工具帮我初始化项目和安装依赖时，命令必须带上 cd，例如：cd ua-redirect-page && npm init -y 以及 cd ua-redirect-page && npm install express。

全部弄好后，告诉我怎么进入目录并启动测试。”