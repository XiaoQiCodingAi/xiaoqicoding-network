export const game = {
  name: '赛博闪避者',
  nameEn: 'Cyber Dodge',
  version: '1.0',
  highScoreKey: 'cyberDodgeHighScore',
  startDelay: 300,

  player: {
    width: 50,
    height: 15,
    speed: 8,
    color: '#00f0ff',
    startX: 200,  // Will be calculated from canvas
    startY: 360,
  },

  canvas: {
    width: 450,
    height: 400,
  },

  obstacles: {
    width: 16,
    height: 16,
    baseSpeed: 3,
    maxSpeedBonus: 4,
    spawnRate: 0.03,
    spawnRatePerScore: 0.0001,
    speedPerScore: 0.01,
    color: '#ff3366',
  },

  rewards: {
    width: 14,
    height: 14,
    baseSpeed: 2,
    maxSpeedBonus: 2,
    spawnRate: 0.015,
    color: '#00ff66',
    points: 10,
  },

  score: {
    rewardPoints: 10,
    displayFont: '14px Orbitron',
    displayColor: '#ffffff',
  },

  difficulty: {
    // Score threshold for reward challenge
    challengeThreshold: 150,
  },
}