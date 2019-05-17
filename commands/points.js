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

    let pointembed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor('#00FF00')
    .addField('Points', uPoints);

    message.channel.send(pointembed);
}

module.exports.help = {
    name: 'points'
}