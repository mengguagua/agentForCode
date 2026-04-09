“我目前有一个游戏官网项目。项目位置：/Users/gcc/agent/agentForCode/chrono-portal
对应前端工程位置：/Users/gcc/agent/agentForCode/chrono-portal/chrono-portal-front
内容代码都是ai生成的，UI比较粗糙，现在要求是优化样式，可以使用静态资源，位置：/Users/gcc/agent/agentForCode/chrono-portal/assets
最后目的是让这个前端可运行，且美观，有卡牌游戏官网的风格。

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