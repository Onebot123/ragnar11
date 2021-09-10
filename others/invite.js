const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);
const db = require('quick.db');

module.exports = {
  name: "invite",
  aliases: ["inv"],
  cooldown: 1.5,
  description: "",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
   .setImage(`https://cdn.discordapp.com/attachments/827166558714593290/830464718623080488/standard_8.gif`)
   .setDescription("<a:rast:813403866472251399> **[Click here](https://discord.com/oauth2/authorize?client_id=807289119193432125&permissions=8&scope=bot) to invite the bot.**")
    .setColor("#FF0000")
   helpEmbed  
   message.react("<a:emoji_81:779961595656536084>")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
