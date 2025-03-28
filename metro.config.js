// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
    'png',
    'jpg',
    'jpeg',
    'gif',
    'svg'
);

config.resolver.blockList = [/(.*.spec.ts?)$/]

module.exports = config;