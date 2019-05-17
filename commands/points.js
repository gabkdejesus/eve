const Discord = require('discord.js');
const config = require('../config.json');
let points = require('.' + config['pointsDir']);

module.exports.run = async (bot, message, args) => {
    //!points
    if (!points[message.author.id]) {
        points[message.author.id] = {
            points: 0
        };
    }

    let uPoints = points[message.author.id].points;

    return message.reply(`you have ${uPoints} points (´• ω •\`)`);
}

module.exports.help = {
    name: 'points'
}