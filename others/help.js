const { Client, Collection, MessageEmbed } = require(`discord.js`);
const { 
  PREFIX, 
} = require(`../config.json`);

  


module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 8,
  description: "**SnooBot Help**",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
    .setImage(`https://cdn.discordapp.com/attachments/827166558714593290/830464718623080488/standard_8.gif`)
    .setTitle(`**SnooBot Help**`)
    .setDescription(`

<a:discord:813406342173818910> | **User Commands**
> **\`invite(inv)\` • \`support\` • \`about\` • \`ping\` • \`prefix\` • \`uptime\` • \`se\` • \`avatar\` • \`serverinfo(sifo)\`**

<a:dark:813714900777959444> | **Music Commands**
> **\`play\` • \`skip\` • \`skipto\` • \`stop\` • \`volume\` • \`nowplaying\` • \`shuffle\` • \`search\` • \`resume\` • \`remove\` • \`queue\` • \`filter\` • \`loop\` • \`lyrics\` • \`radio\`**

<a:setting:813404135181385759> | **Fun Commands**
> **\`lock(l)\` • \`unlock(ul)\` • \`giveaway\` • \`bans\` • \`embed\` • \`slowmode\` • \`say\` • \`cv\`**

<:emoji_61:827114330608107531> | **Gif Commands**
> **\`boy\` • \`girl\` • \`anime\` • \`hug\` • \`slap\`**

<a:links:813729922643263558> | Links
[SUPPORT](https://discord.gg/DDtRN4qK63)    -    [INVITE](https://discord.com/api/oauth2/authorize?client_id=800348653680197662&permissions=8&scope=bot)
`)

   .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
   .setColor("#FF0000");
   message.react("<:emoji_4:815583574983966720>")
    return message.channel.send(helpEmbed).catch(console.error);

  }
};
