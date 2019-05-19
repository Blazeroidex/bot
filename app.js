const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//#####################################################################################################################
const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();
const talkedRecently = new Set();
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

jsfile.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);
  bot.commands.set(props.help.name, props);
});

});


bot.on("ready", () => {
  console.log(bot.user.username + " is online.")
});

bot.on("message", async message => {
  //a little bit of data parsing/general checks
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;
  if(message.author.bot) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    
    var sender = message.author;
    const msg = message.content.toLowerCase();
  

// Ping Commands
    if (msg.startsWith(prefix + 'ping')) {
        message.channel.send('Pong!')
    
    }
  
    if (msg.startsWith(prefix + 'ding')) {
        message.channel.send('Dong!')
    
    }
});
  
bot.on('message', async message => {
    if(message.author.bot) return;
    let content = message.content.split(" ");
    let command = content[0];
    let args = content.slice(1);
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);
    
    var sender = message.author;
    const msg = message.content.toLowerCase();
  
// Join/Leave
  if (msg.startsWith(prefix + 'join')) {
    var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("You're not in a voice channel!")
    VC.join()
        .then(connection => {
            const dispatcher = connection.playFile('./speak/hey_guys.mp3');
            dispatcher.on("end", end => {});
        })
        .catch(console.error);
  }
  if (msg.startsWith(prefix + 'leave')) {
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("You're not in a voice channel!")
    VC.join()
        .then(connection => {
            const dispatcher = connection.playFile('./speak/seeya.mp3');
            dispatcher.on("end", end => {VC.leave()});
        })
        .catch(console.error);
};

  if (msg.startsWith(prefix + 'fuckoff')) {
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("You're not in a voice channel!")
    VC.join()
        .then(connection => {
            const dispatcher = connection.playFile('./speak/seeya.mp3');
            dispatcher.on("end", end => {VC.leave()});
        })
        .catch(console.error);
};

  if (msg.startsWith(prefix + 'sup')) {
        var VC = message.member.voiceChannel;
        if (!VC)
            return message.reply("You're not in a voice channel!")
    VC.join()
        .then(connection => {
            const dispatcher = connection.playFile('./speak/josph.mp3');
            dispatcher.on("end", end => {VC.leave()});
        })
        .catch(console.error);
};
    });

bot.login(config.token)
