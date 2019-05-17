const Discord = require('discord.js');
const fs = require('fs');
const config = require('../config.json');
let points = require('.' + config['pointsDir']);

module.exports.run = async (bot, message, args) => {
    //!pay @person
    if (!points[message.author.id]) {
        return message.reply('Sorry senpai, you don\'t have any points..');
    }
    try {
        let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!points[pUser.id]) {
            points[pUser.id] = {
                points: 0
            };
        }        
        
        let pPoints = points[pUser.id].points;
        let sPoints = points[message.author.id].points;

        if (sPoints < args[1]) return message.reply('sorry senpai, you don\'t have enough points!');

        points[message.author.id] = {
            points: sPoints - parseInt(args[1])
        };

        points[pUser.id] = {
            points: pPoints + parseInt(args[1])
        };

        message.channel.send(`${message.author} gave ${pUser} ${args[1]} points.`);

        fs.writeFile(config['pointsDir'], JSON.stringify(points), (err) => {
            if (err) console.log(err);
        });

    }
    catch (err) {
        console.log(err);
        return message.reply('if you want to send points, please use the format `!pay @persontopay amount`');
    };
}

module.exports.help = {
    name: 'pay'
}