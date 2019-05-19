const Discord = require("discord.js");
const config = require("/app/config.json");

module.exports.run = async (bot, message, args) => {

      const sayMessage = args.join(" ");
      message.delete().catch();
      if(config.ownerID == message.author.id) {
        message.channel.send(sayMessage);
      }
      if(config.ownerID !== message.author.id) {
        message.channel.send(`<@${message.author.id}> says: ` + sayMessage); 
      }


}

module.exports.help = {
  name: "say",
  description: "Makes me say a message.",
  usage: "!say [message]"
}