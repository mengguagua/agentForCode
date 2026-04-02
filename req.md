“我想建一个网站，需求是：这是一个游戏宣传网站，先实现一个首页，从上到下内容是宣传banner图，游戏玩法说明模块，游戏截图的窄条滚动，游戏制作过程的左图右文布局的说明，底部是常规的“联系我们”等文字footer。相关图片和文字效果，你先占位就可以，告诉我后续怎么补充。动态数据都来自数据库，使用mysql数据库，后端使用java语言，后端具体框架你自行决定。前端使用react+ts框架，页面风格要是日本像素游戏的分割。

请严格遵守以下操作规范：

请使用 context7 查阅最新文档，对各个技术栈使用最新规范”

如果遇到node 版本问题。以下路径有node20和对应的npm
/Users/gcc/.nvm/versions/node/v20.19.5/bin/node
/Users/gcc/.nvm/versions/node/v20.19.5/bin/npm

mysql访问相关数据：
密码：Gcc@163.com
用户：root
host：116.198.198.109

如果需要生成图：
图片生成访问路径是：https://api.minimaxi.com/v1/image_generation

目录隔离：请在当前目录下规划一个名为 chrono-portal 的子文件夹，所有的代码文件都必须在chrono-portal这个文件夹下，内部可以分为chrono-portal-service和chrono-portal-front来区分是后端服务还是前端代码。

前端执行命令：使用 execute_command 工具帮我初始化项目和安装依赖时，命令必须带上 cd，切换到chrono-portal-front目录下
后端执行命令：你判断是使用maven还是什么，但依赖也要切换到chrono-portal-service目录下

全部弄好后，自行测试运行，是否能启动。然后告诉我怎么启动和测试。”