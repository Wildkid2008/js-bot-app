const Discord = require('discord.js');
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS]});
require('dotenv').config();
 
const prefix = '?';
 
const fs = require('fs');
const ms = require('ms');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('The Bot is Online!');
});

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');
 
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('878734208212795453').send(`Welcome <@${guildMember.user.id}> to our server! Make sure to check out the rules channel!`)
});

client.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'clear'){
        client.commands.get('clear').execute(message, args);
    } else if(command === 'kick'){
      client.commands.get('kick').execute(message, args);

    } else if(command === 'ban'){
      client.commands.get('ban').execute(message, args);

    } else if(command === 'mute'){
      client.commands.get('mute').execute(message, args);

    } else if(command === 'unmute'){
      client.commands.get('unmute').execute(message, args);

    } 
});
 
client.login(process.env.DISCORD_BOT_TOKEN);