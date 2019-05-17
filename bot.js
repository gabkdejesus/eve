const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Point System
let points = require(config['pointsDir']);

// Read Commands
let commandsDir = config['commandsDir']
fs.readdir(commandsDir, (err, file) => {
    if (err) console.log(err);

    let jsfile = file.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log('Couldn\'t find commands.');
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(commandsDir + f);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

// Bot Ready
bot.on('ready', async () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    bot.user.setActivity('on Crescento!');
});


// Listen for messages
bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    // Random Point Award System
    if (!points[message.author.id]) {
        points[message.author.id] = {
            points: 0
        };
    }

    let pointAmt = Math.floor(Math.random() * 50);
    let baseAmt = Math.floor(Math.random() * 50);

    if (pointAmt === baseAmt) {
        randAmt = Math.floor(Math.random() * 500);
        points[message.author.id] = {
            points: points[message.author.id].points + randAmt
        };
        fs.writeFile(config['pointsDir'], JSON.stringify(points), (err) => {
            if (err) console.log(err);
        });
        
        message.channel.send(`Senpai ${message.author}, I generated ${pointAmt} points for you. You now have ${points[message.author.id]} points. Type !points to find out more.`);
    }

    // End Random Point Award System


    let prefix = config.prefix;
    let messageArray = message.content.split(' ');
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args);    
});

bot.login(config.token);
