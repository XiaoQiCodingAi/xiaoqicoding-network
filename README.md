# xiaoqicoding-network

赛博朋克风格个人主页 / Cyberpunk-styled personal portfolio for a Chinese tech creator.

[在线预览 Demo](https://xiaoqicoding.ai)

## 特性

- 赛博朋克视觉风格（Matrix Rain 动画、霓虹灯效果）
- 响应式设计，支持桌面和移动端
- 内置小游戏：Cyber Dodge
- 无需构建工具，纯原生 ES 模块

## 技术栈

- HTML / CSS / JavaScript（ES6 模块）
- Tailwind CSS via CDN
- FontAwesome 6.4
- Google Fonts（Orbitron、Fira Code、Noto Sans SC）
- localStorage 存储游戏最高分

## 快速开始

```bash
# 克隆项目
git clone https://github.com/XiaoQiCodingAi/xiaoqicoding-network.git
cd xiaoqicoding-network

# 启动本地服务（ES 模块需要 CORS 支持）
python -m http.server 8000
# 访问 http://localhost:8000

# 或使用 npx
npx serve .
```

## 项目结构

```
/
├── index.html              # 页面入口
├── css/
│   └── custom.css          # 自定义样式（滚动条、动画）
├── config/
│   ├── index.js            # 配置汇总
│   ├── profile.js           # 个人信息（名字、头像、签名）
│   ├── social.js            # 社交平台链接
│   ├── theme.js             # 主题配置（颜色、字体、Matrix 特效）
│   └── game.js              # 游戏配置
└── src/
    ├── animations.js        # Matrix Rain 动画
    ├── game.js              # Cyber Dodge 游戏逻辑
    ├── modals.js            # 扫码弹窗、游戏结束弹窗
    └── init.js              # 初始化入口
```

## 配置

所有内容通过 `config/*.js` 文件管理，修改后刷新即可生效：

| 文件 | 用途 |
|------|------|
| `config/profile.js` | 名字、签名、头像 |
| `config/social.js` | B站/抖音/微信等平台链接 |
| `config/theme.js` | 颜色、字体、Matrix 特效 |
| `config/game.js` | 角色速度、障碍物生成速率 |

## 游戏操作

- 键盘：方向键移动
- 触屏：屏幕按钮操控
- 最高分记录在浏览器本地