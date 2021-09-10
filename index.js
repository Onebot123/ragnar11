const Discord = require(`discord.js`);
const { Client, Collection, MessageEmbed,MessageAttachment } = require(`discord.js`);
const { readdirSync } = require(`fs`);
const { join } = require(`path`);
const db = require('quick.db');
const { TOKEN, PREFIX, AVATARURL, BOTNAME, } = require(`./config.json`);
const figlet = require("figlet");
const client = new Client({ disableMentions: `` , partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login('ODAwMzQ4NjUzNjgwMTk3NjYy.YAQ0xA.W0NoihwP5AyHU8hCzax0C4WvMLU');
client.commands = new Collection();
client.setMaxListeners(0);
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);

//this fires when the BOT STARTS DO NOT TOUCH
client.on(`ready`, () => {	
//////////////

////////
   
   ///////////////////////////////
    ////////////IFCHEMPTY//////////
        //remove everything in between those 2 big comments if you want to disable that the bot leaves when ch. or queue gets empty!
        setInterval(() => { 
          let member;
        client.guilds.cache.forEach(async guild =>{
        await delay(15);
          member = await client.guilds.cache.get(guild.id).members.cache.get(client.user.id)
        //if not connected
          if(!member.voice.channel)
          return;
        //if alone 
        if (member.voice.channel.members.size === 1) 
        { return member.voice.channel.leave(); }
      });
      

    client.user.setActivity(`1help | MrTiger`, { type: "LISTENING"});

    client.user.setActivity(`Server | ${client.guilds.cache.size}`, { type: "LISTENING"});
   
  
      }, (5000));
      ////////////////////////////////
      ////////////////////////////////
    figlet.text(`${client.user.username} ready!`, function (err, data) {
      if (err) {
          console.log('Something went wrong');
          console.dir(err);
      }
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
      console.log(data)
      console.log(`═════════════════════════════════════════════════════════════════════════════`);
    })
   
});
//DO NOT TOUCH
//FOLDERS:
//Admin custommsg data FUN General Music NSFW others
commandFiles = readdirSync(join(__dirname, `Music`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `Music`, `${file}`));
  client.commands.set(command.name, command);
}
commandFiles = readdirSync(join(__dirname, `others`)).filter((file) => file.endsWith(`.js`));
for (const file of commandFiles) {
  const command = require(join(__dirname, `others`, `${file}`));
  client.commands.set(command.name, command);
}
//COMMANDS //DO NOT TOUCH
client.on(`message`, async (message) => {
  if (message.author.bot) return;
  
  //getting prefix 
  let prefix = await db.get(`prefix_${message.guild.id}`)
  //if not prefix set it to standard prefix in the config.json file
  if(prefix === null) prefix = PREFIX;

  //information message when the bot has been tagged
  if(message.content.includes(client.user.id)) {
    message.reply(new Discord.MessageEmbed().setColor("#c219d8").setAuthor(`${message.author.username}, My Prefix is ${prefix}, to get started; type ${prefix}help`, message.author.displayAvatarURL({dynamic:true})));
  } 
  //An embed announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}embed`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setDescription(saymsg)
    .setFooter("Moon Bot", client.user.displayAvatarURL())
    //delete the Command
    message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  }

//An about announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}about`)){
    //define saymsg
    message.react("<a:emoji_83:779961659631730689>").catch(console.error);
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setAuthor("MoonBot", "https://cdn.discordapp.com/avatars/807289119193432125/bdc5bd20f5aa21e29341f280d76d75e5.png?size=2048")
    .setFooter(`${message.author.username}#${message.author.discriminator}`, message.member.user.displayAvatarURL({ dynamic: true }))
    .setDescription(`
**[Moon Bot Stats](https://discord.com/oauth2/authorize?client_id=807289119193432125&permissions=8&scope=bot)**

**My Devloper :**
<@712407561676259418> 

**Moon Bot :**
\`All Command\`
 
**Servers :**
\`${client.guilds.cache.size}\`

**Channels :** 
\`${client.channels.cache.size}\`
 
**My Name :**
\`${client.user.tag}\`

**My ID :**
\`${client.user.id}\`

**My Ping :**
\`${client.ws.ping}\`

**Version :**
\`V2\`
`)

    //send the Message
    message.channel.send(embed)
  }  

//An suuport announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}support`)){
    //define saymsg
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setImage(`https://cdn.discordapp.com/attachments/827166558714593290/830464718623080488/standard_8.gif`)
    .setDescription (`
    Links
Link Server 
[Support](https://discord.gg/DDtRN4qK63)
-
Link Bot
[Invite](https://discord.com/oauth2/authorize?client_id=807289119193432125&permissions=8&scope=bot)`)
    .setFooter(message.author.username, message.author.displayAvatarURL)
    .setImage(``)
    .setTitle(`**Suuport MoonBot**`) 
    .setThumbnail(`https://cdn.discordapp.com/attachments/793225556501987358/831209697280917524/PicsArt_04-12-07.50.28.jpg`)
    .setTimestamp()
    
    //send the Message
    message.channel.send(embed)
   message.react("<:emoji_4:815583574983966720>")
  } 
 
//An cv announcement for everyone but no one knows so fine ^w^
  if(message.content.startsWith(`${prefix}cv`)){
    //define saymsg
     if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    const saymsg = message.content.slice(Number(prefix.length) + 5)
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return;
    if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return;
    //define embed
    const embed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setAuthor(`${message.guild.name}`,message.guild.iconURL({ dynamic: true }))
    .setDescription(saymsg)
    .setTimestamp()
    //delete the Command
    message.delete({timeout: 300})
    //send the Message
    message.channel.send(embed)
  } 

//command Handler DO NOT TOUCH
 const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
 if (!prefixRegex.test(message.content)) return;
 const [, matchedPrefix] = message.content.match(prefixRegex);
 const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
 const commandName = args.shift().toLowerCase();
 const command =
   client.commands.get(commandName) ||
   client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
 if (!command) return;
 if (!cooldowns.has(command.name)) {
   cooldowns.set(command.name, new Collection());
 }
 const now = Date.now();
 const timestamps = cooldowns.get(command.name);
 const cooldownAmount = (command.cooldown || 1) * 1000;
 if (timestamps.has(message.author.id)) {
   const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
   if (now < expirationTime) {
     const timeLeft = (expirationTime - now) / 1000;
     return message.reply(
      new MessageEmbed().setColor("#FF0000")
      .setTitle(`<:emoji_4:815583574983966720> \`Please wait ${timeLeft.toFixed(1)} seconds before reusing the ${prefix}${command.name}\`!`)    
     );
   }
 }
 timestamps.set(message.author.id, now);
 setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
 try {
   command.execute(message, args, client);
 } catch (error) {
   console.error(error);
   message.reply( new MessageEmbed().setColor("#FF0000")
   .setTitle(`<:emoji_4:815583574983966720> There was an error executing that command.`)).catch(console.error);
 }


});

client.on("guildCreate", guild => {
  let channel = client.channels.cache.get("833104343015751690");
  let embed = new MessageEmbed().setColor("#FF0000")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `✅ Join Server`)
  .addField(" **Server Name**", `${guild.name}`)
  .addField(" **Server Owner**", `${guild.owner}`)
  .addField(" **Server Id**", `${guild.id}`)
  .addField(" **Member Count**", `${guild.memberCount}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});

client.on("guildDelete", guild => {
  let channel = client.channels.cache.get("833104343015751690");
  let embed = new MessageEmbed()
  .setColor("#FF0000")
  .setAuthor(client.user.username, client.user.avatarURL())
  .setTitle( `❌ Left Server`)
  .addField(" **Server Name**", `${guild.name}`)
  .addField(" **Server Owner**", `${guild.owner}`)
  .addField(" **Server Id**", `${guild.id}`)
  .addField(" **Member Count**", `${guild.memberCount}`)
  .setFooter(`${client.user.tag}`);
  channel.send(embed);
});


function delay(delayInms) {
 return new Promise(resolve => {
   setTimeout(() => {
     resolve(2);
   }, delayInms);
 });
}

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "boy")) {
    let man = [
      "https://media.discordapp.net/attachments/786897044483604490/803870769313480714/Enes_Acar_GIF_70.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870793716858880/a_57a7f6c875e3a329b170edf177392911.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870817351368734/5-2.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804007829010513966/image1.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804007829483552838/image3.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804219672513478706/Lenora_36.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804220384899498064/Lenora_28.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804220394697392158/Lenora_33.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804315371271749662/image0-20.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804968359572930580/ALANIS_MAN_GIF_156.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804968381816111124/image0-5.gif",
      "https://media.discordapp.net/attachments/786897044483604490/804760463044640808/ALANIS_MAN_GIF_99.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870704999202836/ENES_ACAR_GIF_104.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870737941135421/ENES_ACAR_GIF_15.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/831638427970568202/Kapson_ckaran_airpods.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/831638427698855966/15.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/831638428751233075/image0-2.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/831638429221388318/a_0adc0e2c6daeef0758ddc31b736ff74e.gif",
      "https://cdn.discordapp.com/attachments/608711476219478045/831638428306898975/DelightfulThreadbareCarp-max-1mb.gif",
      "https://media.discordapp.net/attachments/786897044483604490/803870682479067166/ENES_ACAR_GIF_135.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Boy**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "girl")) {
    let man = [
      "https://cdn.discordapp.com/attachments/608711473652563968/830788035221782558/1-28.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830789683994820608/a_f173b0560e24959c0ac615948fff0428.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830788112267345920/1-29.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830788165534220308/1-30.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830791687264796682/1-7.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830791908049158154/gif-18.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830787973166399539/1-36.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830788023028547614/1-27.gif",
      "https://cdn.discordapp.com/attachments/608711473652563968/830791979281022986/kjhgfghjkl.gif",
      "https://media.discordapp.net/attachments/694695166895849562/797086937068077106/20210106_210640.gif",
      "https://media.discordapp.net/attachments/687763784902770691/802939838793908244/a_b4686f704471be16d09d1cc6506cb4ce.gif",
      "https://cdn.discordapp.com/attachments/742107775475253259/818633362616614912/image2.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800849143341514772/a_16743dfad984f574da0b7bc2f9a0b07f.gif",
      "https://cdn.discordapp.com/attachments/787757651752779826/800850948078698566/000_1-2.gif",
      "https://cdn.discordapp.com/attachments/820811352087330828/820954968793284658/image0.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Girl**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "smoke")) {
    let man = [
      "https://cdn.discordapp.com/attachments/755893014915711047/829996822042902548/baby_lorenzo___Tumblr.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/830019629137133638/a_bf2b256a73738ec077e555cd129a636b.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/831784931843637248/a_1a06feef2d97c2e9f563f2a8a7f65ddd.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/831784932623515648/20210305_082905.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/831784932387848192/a_f3d97c3e3acc18fc7aa2a4b9658da821.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829989116800008222/image0.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829996732443656232/Smoking_Gif.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829996773028003870/Animated_GIF.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829996813489537074/KURALSIZ.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829996798847614996/Soguk_Nefes-2.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829594717859348480/20.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829725183086034954/mirakaanman_97.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829725196289703967/m2.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829842259709132830/ContaAbimiz_228.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829842189344309308/ContaAbimiz_71.gif",
      "https://cdn.discordapp.com/attachments/755893014915711047/829244439310106664/Nikolaj_Coster-Waldau_Gif_Hunt.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Smoke**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});

client.on("message", message => {
  if (message.content.startsWith(PREFIX + "baby")) {
    let man = [
      "https://cdn.discordapp.com/attachments/699339066029768796/831815920594714644/750687987473317938.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831875803179909160/1.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831890205606412398/10.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831811050013458462/7.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831811061388804106/2.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831811054383530044/9.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831811092908605440/3.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831811102915428362/8.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722126615642172/image4.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722126872150046/image4_1.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722157498826812/image6.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722157749960704/tenor-2.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722158413316096/Zezeee.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722091904106546/baby_9.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722125122469898/image0-4.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722125618315324/image0.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722125953335296/image0_4-1.gif",
      "https://cdn.discordapp.com/attachments/699339066029768796/831722126364246037/image2.gif"
    ];

    message.channel
      .send({
        embed: {
          description: `**Gif Baby**`,
          footer: `Requested by ${message.author.username}`,
          color: `#FF0000`,
          image: {
            url: man[Math.floor(Math.random() * man.length)]
          }
        }
      })

.catch(e => {
        client.log.error(e);
      });
  }
});



