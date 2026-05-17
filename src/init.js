import { CONFIG } from '../config/index.js';
import { openModal, closeModal, closeGameModal } from './modals.js';

export function init() {
    try {
        // Wire social platform buttons
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.dataset.platform;
                const socialEntry = CONFIG.social[platform];
                let url = socialEntry?.url;
                if (platform === 'wechat') {
                    url = socialEntry?.official?.url;
                }
                if (url && url !== '#') {
                    window.open(url, '_blank');
                } else {
                    openModal(platform);
                }
            });
        });

        // Wire modal close buttons
        document.getElementById('closeQrModal')?.addEventListener('click', closeModal);
        document.getElementById('gameModal')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) closeGameModal();
        });

        // Init bulletin board
        initBulletinBoard();
    } catch(e) {
        alert('init error: ' + e);
    }
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

// Auto-start on load
init();