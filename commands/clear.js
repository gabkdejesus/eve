const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGE')) return message.reply('Sorry senpai, you can\'t access that.');
    if (!args[0]) return message.channel.send('Oof');

    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });
}

module.exports.help = {
    name: 'clear'
}