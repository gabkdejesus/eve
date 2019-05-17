const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let boticon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription('Bot Information')
    .setColor('#14f143')
    .setThumbnail(boticon)
    .addField('Bot Name', bot.user.username)
    .addField('Created On', bot.user.createdAt)
    .addField('Programmed By', 'HBeats')

    return message.channel.send(botembed);
}

module.exports.help = {
    name: 'botinfo'
}