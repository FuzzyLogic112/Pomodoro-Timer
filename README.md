🍅 极简番茄钟 (Minimalist Pomodoro Focus)

一个优雅、现代且护眼的 Web 版番茄工作法计时器。

📖 项目简介

极简番茄钟 是一款专为追求极致专注体验的用户设计的 Web 应用。它摒弃了繁杂的功能，回归番茄工作法的本质。

项目采用柔和的深色护眼模式（Dark Mode），结合 Web Audio API 生成的空灵风铃声与 CSS 呼吸灯特效，不仅帮助你保持专注，更在休息时刻提供视觉与听觉的双重放松体验。

✨ 功能特点

🌑 沉浸式深色模式：默认采用深色背景，长时间使用不伤眼。

⏱️ 精准无跳动计时：使用等宽字体特性（Tabular Nums），杜绝倒计时数字左右晃动的视觉干扰。

🔔 优雅的结束提醒：

听觉：基于 Web Audio API 实时合成的舒缓风铃声，无须加载外部音频文件。

视觉：全屏柔和的“呼吸”光效，温柔地提醒你休息。

⚙️ 自定义专注时长：支持点击时间区域快速修改专注时长（1-120分钟）。

📱 全端适配：响应式设计，在桌面端和移动端均有完美表现。

🏷️ 动态标题：浏览器标签页（Tab Title）实时同步剩余时间，切换页面也能掌握进度。

🛠️ 技术栈

本项目完全基于原生 Web 技术构建，代码轻量且易于维护：

HTML5：语义化结构。

CSS3：

使用 Tailwind CSS (CDN) 快速构建现代 UI。

原生 CSS Animation 实现呼吸灯与模态框动画。

JavaScript (ES6+)：

原生 DOM 操作，无任何重型框架依赖。

Web Audio API：用于生成高质量的合成音效。

🚀 如何使用

在线预览

(在此处填入你的 GitHub Pages 链接或演示链接)

本地运行

克隆或下载项目：

git clone [https://github.com/yourusername/minimalist-pomodoro.git](https://github.com/yourusername/minimalist-pomodoro.git)


或者直接下载 ZIP 压缩包并解压。

打开项目：
进入项目文件夹，直接使用浏览器打开 index.html 文件即可运行，无需搭建服务器环境。

目录结构

.
├── index.html      # 页面结构与 Tailwind 配置
├── style.css       # 自定义样式与动画
├── script.js       # 计时器逻辑与音频合成
└── README.md       # 项目说明文档


🤝 贡献

如果你有好的想法或建议，欢迎提交 Issue 或 Pull Request。

Fork 本仓库

创建你的特性分支 (git checkout -b feature/AmazingFeature)

提交你的修改 (git commit -m 'Add some AmazingFeature')

推送到分支 (git push origin feature/AmazingFeature)

开启一个 Pull Request

📄 许可证

本项目采用 MIT 许可证 - 详情请见 LICENSE 文件。

Made with ❤️ for productivity.
