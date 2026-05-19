import { CONFIG } from '../config/index.js';

export function openModal(platform) {
    const modal = document.getElementById('qrModal');
    const icon = document.getElementById('modalIcon');
    const title = document.getElementById('modalTitle');
    const desc = document.getElementById('modalDesc');
    const qrText = document.getElementById('qrText');

    const { social } = CONFIG;
    modal.classList.remove('hidden');

    if (platform === 'bilibili') {
        icon.className = 'w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center mx-auto text-pink-500 text-xl mb-3';
        icon.innerHTML = '<i class="fa-brands fa-bilibili"></i>';
        title.innerText = social.bilibili.modalTitle;
        desc.innerText = social.bilibili.modalDesc;
        qrText.innerText = social.bilibili.qrLabel;
    } else if (platform === 'douyin') {
        icon.className = 'w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white text-xl mb-3';
        icon.innerHTML = '<i class="fa-brands fa-tiktok"></i>';
        title.innerText = social.douyin.modalTitle;
        desc.innerText = social.douyin.modalDesc;
        qrText.innerText = social.douyin.qrLabel;
    } else if (platform === 'wechat') {
        icon.className = 'w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-500 text-xl mb-3';
        icon.innerHTML = '<i class="fa-brands fa-weixin"></i>';
        title.innerText = social.wechat.official.modalTitle;
        desc.innerText = social.wechat.official.modalDesc;
        qrText.innerText = social.wechat.official.qrLabel;

        const qrImage = document.getElementById('qrImage');
        const qrPlaceholder = document.getElementById('qrPlaceholder');
        if (qrImage) {
            qrImage.src = 'res/weixin.png';
            qrImage.classList.remove('hidden');
        }
        if (qrPlaceholder) {
            qrPlaceholder.classList.add('hidden');
        }
    } else if (platform === 'planet') {
        icon.className = 'w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto text-blue-500 text-xl mb-3';
        icon.innerHTML = '<i class="fa-solid fa-planet-ringed"></i>';
        title.innerText = social.wechat.planet.modalTitle;
        desc.innerText = social.wechat.planet.modalDesc;
        qrText.innerText = social.wechat.planet.qrLabel;

        const qrImage = document.getElementById('qrImage');
        const qrPlaceholder = document.getElementById('qrPlaceholder');
        if (qrImage) {
            qrImage.src = social.wechat.planet.qrImage;
            qrImage.classList.remove('hidden');
        }
        if (qrPlaceholder) {
            qrPlaceholder.classList.add('hidden');
        }
    }
}

export function closeModal() {
    document.getElementById('qrModal').classList.add('hidden');
}

export function closeGameModal() {
    document.getElementById('gameModal').classList.add('hidden');
}