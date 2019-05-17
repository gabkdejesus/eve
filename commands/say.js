const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGE')) return message.reply('Sorry senpai, you can\'t access that.');
    if (!args[0]) return message.channel.send('Oof');

    let botMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botMessage);
}

module.exports.help = {
    name: 'say'
}