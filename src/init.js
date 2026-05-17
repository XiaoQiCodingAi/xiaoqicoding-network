import { CONFIG } from '../config/index.js';
import { initMatrixRain } from './animations.js';
import { initGameModule, drawStartupScreen, restartGame } from './game.js';
import { openModal, closeModal, closeGameModal } from './modals.js';

function populateProfileTexts() {
    const { profile } = CONFIG;

    // Hero section
    document.querySelector('#hero h2').innerText = `< ${profile.tagline} />`;
    document.querySelector('#hero h1').innerText = `${profile.name.display} ${profile.title} 的数字工坊`;
    document.querySelector('#hero p').innerText = profile.description;

    // Avatar icon
    const avatarIcon = document.querySelector('.fa-user-astronaut');
    if (avatarIcon && !profile.avatar.useImage) {
        avatarIcon.className = `${profile.avatar.icon} text-4xl text-cyber-cyan`;
    }

    // Footer
    document.querySelector('footer p:first-of-type').innerText = profile.footer.copyright;

    // Status indicator
    const statusEl = document.querySelector('.absolute.bottom-1.right-1');
    if (statusEl) {
        statusEl.nextElementSibling && (statusEl.nextElementSibling.textContent = profile.status.text);
    }
}

function populateSocialTexts() {
    const { social } = CONFIG;

    // Bilibili
    const bilibiliName = document.querySelector('.bilibili-name');
    if (bilibiliName) bilibiliName.innerText = `B站：${social.bilibili.name}`;

    // Douyin
    const douyinName = document.querySelector('.douyin-name');
    if (douyinName) douyinName.innerText = `抖音：${social.douyin.name}`;

    // WeChat official
    const wechatName = document.querySelector('.wechat-name');
    if (wechatName) wechatName.innerText = `公众号：${social.wechat.official.name}`;
}

function initBulletinBoard() {
    const messages = [
        '⚡ [极客老李] 刚刚加入星球，获取了 Unity 核心代码框架',
        '🚀 [代码无情] 10分钟前 成功加入星球并提问了 Golang 高并发实战',
        '🔥 [游戏小王] 刚刚领取了首批 5 折优惠名额',
        '💡 [AI弄潮儿] 3分钟前 加入了专属星球交流群',
    ];

    const bulletinBoard = document.getElementById('bulletinBoard');
    if (!bulletinBoard) return;

    setInterval(() => {
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        const userRandomId = Math.random().toString(36).substring(2, 6);
        const timeRandom = Math.floor(Math.random() * 5) + 1;
        bulletinBoard.innerHTML = `<div class="animate-pulse py-1">⚡ [User_${userRandomId}] ${timeRandom}分钟前 ${randomMsg.split('] ')[1]}</div>`;
    }, 5000);
}

export function init() {
    populateProfileTexts();
    populateSocialTexts();

    // Wire social platform buttons
    document.querySelectorAll('.social-btn').forEach(btn => {
        const platform = btn.dataset.platform;
        if (platform) {
            btn.addEventListener('click', () => openModal(platform));
        }
    });

    // Wire modal close buttons
    document.getElementById('closeQrModal')?.addEventListener('click', closeModal);
    document.getElementById('closeGameModalBtn')?.addEventListener('click', closeGameModal);
    document.getElementById('restartGameBtn')?.addEventListener('click', restartGame);

    // Close modals on backdrop click
    document.getElementById('qrModal')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
    document.getElementById('gameModal')?.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeGameModal();
    });

    // Initialize matrix rain
    initMatrixRain('matrixCanvas');

    // Initialize game
    initGameModule('gameCanvas', 'startGameBtn', 'pauseGameBtn', 'btnLeft', 'btnRight', 'gameHighScore');

    // Init bulletin board
    initBulletinBoard();
}

// Auto-start on load
init();