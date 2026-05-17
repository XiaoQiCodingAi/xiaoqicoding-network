# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A cyberpunk-styled personal portfolio homepage for a Chinese tech creator (打工人小棋 / xiaoqicoding). Built with ES modules for configurability and extensibility.

## Tech Stack

- **HTML/CSS/JS**: Modular ES6 modules (no bundler required)
- **Styling**: Tailwind CSS via CDN
- **Icons**: FontAwesome 6.4 via CDN
- **Fonts**: Google Fonts (Orbitron, Fira Code, Noto Sans SC)
- **Storage**: `localStorage` for game high scores
- **Server**: Requires local server with CORS for ES modules (due to `type="module"`)

## Commands

```bash
# Start local server (required for ES modules to work)
python -m http.server 8000
# Then visit http://localhost:8000

# Or use any static file server with CORS support
npx serve .
```

## Architecture

```
/
├── index.html              # Page structure, imports modules
├── css/
│   └── custom.css          # Scrollbar, animations (matrix rain, marquee)
├── config/
│   ├── index.js            # Central config export (CONFIG object)
│   ├── profile.js          # User name, bio, avatar, status
│   ├── social.js           # Social platform links, QR labels
│   ├── theme.js            # Colors, fonts, Tailwind extensions, matrix settings
│   └── game.js             # Game settings (speeds, spawn rates, thresholds)
└── src/
    ├── animations.js       # Matrix rain canvas effect
    ├── game.js              # Cyber Dodge game logic
    ├── modals.js            # QR modal and game-over modal logic
    └── init.js              # App initialization, wires CONFIG to DOM
```

## Configuration

All content is driven by `config/*.js` files. Edit these to update the site:

- **`config/profile.js`** — Name, tagline, avatar icon, footer text
- **`config/social.js`** — Bilibili/Douyin/WeChat URLs and modal text
- **`config/theme.js`** — Colors, fonts, shadows, matrix rain settings
- **`config/game.js`** — Player speed, obstacle spawn rate, reward points

The `config/index.js` exports a merged `CONFIG` object used by all modules.

## Adding New Features

**New social platform**: Add entry in `config/social.js`, then add button in `index.html` with `data-platform="newplatform"`.

**New game**: Create `config/newgame.js` with game settings, create `src/newgame.js` with game logic, wire it up in `src/init.js`.

## Game: Cyber Dodge

- Keyboard: Arrow keys to move
- Touch: On-screen buttons on mobile
- High scores persist via `localStorage` key `cyberDodgeHighScore`
- Difficulty scales with score (faster spawns, faster obstacles)