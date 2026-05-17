import { CONFIG } from '../config/index.js';

let score = 0;
let highScore = 0;
let gameActive = false;
let isPaused = false;
let obstacles = [];
let rewards = [];
let keys = {};

let player = {};
let gCanvas, gCtx;
let animationId = null;

function initPlayer() {
    const { game } = CONFIG;
    player = {
        x: gCanvas.width / 2 - game.player.width / 2,
        y: game.player.startY,
        width: game.player.width,
        height: game.player.height,
        speed: game.player.speed,
        color: game.player.color,
    };
}

function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function initGame() {
    score = 0;
    obstacles = [];
    rewards = [];
    initPlayer();
}

function drawGrid() {
    const { game } = CONFIG;
    gCtx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
    gCtx.lineWidth = 1;
    for (let x = 0; x < gCanvas.width; x += 30) {
        gCtx.beginPath();
        gCtx.moveTo(x, 0);
        gCtx.lineTo(x, gCanvas.height);
        gCtx.stroke();
    }
    for (let y = 0; y < gCanvas.height; y += 30) {
        gCtx.beginPath();
        gCtx.moveTo(0, y);
        gCtx.lineTo(gCanvas.width, y);
        gCtx.stroke();
    }
}

function updatePlayer() {
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x < gCanvas.width - player.width) {
        player.x += player.speed;
    }
    gCtx.fillStyle = player.color;
    gCtx.shadowColor = '#00f0ff';
    gCtx.shadowBlur = 10;
    gCtx.fillRect(player.x, player.y, player.width, player.height);
    gCtx.shadowBlur = 0;
}

function spawnObstacles() {
    const { game } = CONFIG;
    if (Math.random() < game.obstacles.spawnRate + (score * game.obstacles.spawnRatePerScore)) {
        obstacles.push({
            x: Math.random() * (gCanvas.width - game.obstacles.width),
            y: -20,
            width: game.obstacles.width,
            height: game.obstacles.height,
            speed: game.obstacles.baseSpeed + Math.random() * game.obstacles.maxSpeedBonus + (score * game.obstacles.speedPerScore),
            color: game.obstacles.color,
        });
    }
}

function spawnRewards() {
    const { game } = CONFIG;
    if (Math.random() < game.rewards.spawnRate) {
        rewards.push({
            x: Math.random() * (gCanvas.width - game.rewards.width),
            y: -20,
            width: game.rewards.width,
            height: game.rewards.height,
            speed: game.rewards.baseSpeed + Math.random() * game.rewards.maxSpeedBonus,
            color: game.rewards.color,
        });
    }
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.y += obs.speed;
        gCtx.fillStyle = obs.color;
        gCtx.beginPath();
        gCtx.arc(obs.x + obs.width / 2, obs.y + obs.height / 2, obs.width / 2, 0, Math.PI * 2);
        gCtx.fill();
        if (isColliding(player, obs)) {
            gameOver();
            return true;
        }
        if (obs.y > gCanvas.height) {
            obstacles.splice(i, 1);
        }
    }
    return false;
}

function updateRewards() {
    for (let i = rewards.length - 1; i >= 0; i--) {
        const rwd = rewards[i];
        rwd.y += rwd.speed;
        gCtx.fillStyle = rwd.color;
        gCtx.fillRect(rwd.x, rwd.y, rwd.width, rwd.height);
        if (isColliding(player, rwd)) {
            score += CONFIG.game.rewards.points;
            rewards.splice(i, 1);
            continue;
        }
        if (rwd.y > gCanvas.height) {
            rewards.splice(i, 1);
        }
    }
}

function drawScore() {
    const { game } = CONFIG;
    gCtx.fillStyle = game.score.displayColor;
    gCtx.font = game.score.displayFont;
    gCtx.fillText(`SCORE: ${score}`, 15, 25);
}

function gameLoop() {
    if (!gameActive || isPaused) return;

    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    drawGrid();
    updatePlayer();
    spawnObstacles();
    spawnRewards();

    if (updateObstacles()) return;
    updateRewards();
    drawScore();

    animationId = requestAnimationFrame(gameLoop);
}

function gameOver() {
    gameActive = false;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem(CONFIG.game.highScoreKey, highScore);
        document.getElementById('gameHighScore').innerText = `HIGHEST SCORE: ${highScore}`;
    }
    document.getElementById('modalFinalScore').innerText = score;
    document.getElementById('gameModal').classList.remove('hidden');
}

export function initGameModule(canvasId, startBtnId, pauseBtnId, leftBtnId, rightBtnId, highScoreId) {
    gCanvas = document.getElementById(canvasId);
    gCtx = gCanvas.getContext('2d');

    highScore = parseInt(localStorage.getItem(CONFIG.game.highScoreKey)) || 0;
    document.getElementById(highScoreId).innerText = `HIGHEST SCORE: ${highScore}`;

    keys = {};
    window.addEventListener('keydown', (e) => {
        keys[e.code] = true;
        if (e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code === 'Space') {
            e.preventDefault();
        }
    });
    window.addEventListener('keyup', (e) => {
        keys[e.code] = false;
    });

    document.getElementById(leftBtnId).addEventListener('touchstart', (e) => { e.preventDefault(); keys['ArrowLeft'] = true; });
    document.getElementById(leftBtnId).addEventListener('touchend', () => { keys['ArrowLeft'] = false; });
    document.getElementById(rightBtnId).addEventListener('touchstart', (e) => { e.preventDefault(); keys['ArrowRight'] = true; });
    document.getElementById(rightBtnId).addEventListener('touchend', () => { keys['ArrowRight'] = false; });

    document.getElementById(startBtnId).addEventListener('click', () => {
        if (!gameActive) {
            initGame();
            gameActive = true;
            isPaused = false;
            gameLoop();
        }
    });

    document.getElementById(pauseBtnId).addEventListener('click', () => {
        if (gameActive) {
            isPaused = !isPaused;
            document.getElementById(pauseBtnId).innerText = isPaused ? 'RESUME' : 'PAUSE';
            if (!isPaused) {
                gameLoop();
            }
        }
    });

    drawStartupScreen();
}

export function restartGame() {
    document.getElementById('gameModal').classList.add('hidden');
    initGame();
    gameActive = true;
    gameLoop();
}

export function drawStartupScreen() {
    const { game } = CONFIG;
    gCtx.fillStyle = CONFIG.theme.colors.cyber.card;
    gCtx.fillRect(0, 0, gCanvas.width, gCanvas.height);
    gCtx.fillStyle = '#00f0ff';
    gCtx.font = '22px Orbitron';
    gCtx.textAlign = 'center';
    gCtx.fillText(`${game.nameEn} v${game.version}`, gCanvas.width / 2, gCanvas.height / 2 - 20);
    gCtx.fillStyle = '#94a3b8';
    gCtx.font = '12px Noto Sans SC';
    gCtx.fillText('点击下方按钮启动独立引擎试玩', gCanvas.width / 2, gCanvas.height / 2 + 20);
}