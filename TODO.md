# TODO - 网站配置清单

## 社交媒体二维码（必须）

- [ ] **微信公众号二维码** — `res/weixin.png` 需要替换为真实公众号二维码
- [ ] **B站二维码** — 弹窗扫码用，需配置 `res/bilibili.png`
- [ ] **抖音二维码** — 弹窗扫码用，需配置 `res/douyin.png`

## 社交链接（必须）

- [ ] **微信公众号链接** — `index.html` footer 中 `https://mp.weixin.qq.com/s/DEVX` 需确认或更换
- [ ] **邮箱地址** — `config/social.js` 中 `email: '#'` 需填写真实邮箱

## 个人信息（建议）

- [ ] **真实头像** — `config/profile.js` 中 `avatar.useImage: true`，添加 `imageUrl` 指向真实头像
- [ ] **B站 ID 验证** — `config/social.js` 中 `bilibili.id: '302482063'` 确认是否正确
- [ ] **抖音 ID 验证** — `config/social.js` 中 `douyin.id` 是一串长字符串，确认是否正确

## 页面内容（可选优化）

- [ ] **SEO meta** — 检查 `index.html` 中 `<title>`、`<meta description>` 是否符合需求
- [ ] **星球价格说明** — HOT VALUE 板块中 `¥99` 首批优惠价，确认是否需要更新
- [ ] **150分领资料** — 游戏结束弹窗中"截图公众号领取独家资料"，确认此活动是否有效

## 技术相关

- [ ] **自动部署** — 配置 GitHub Actions / Webhook 实现 push 后自动更新服务器
- [ ] **HTTPS** — 确认网站是否已配置 HTTPS（服务器）
