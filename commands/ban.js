module.exports = {
  name: 'ban',
  description: "This command Bans a member!",
  execute(message, args){
      const target = message.mentions.users.first();
      if(target){
          const memberTarget = message.guild.members.cache.get(target.id);
          memberTarget.ban();
          message.channel.send("User has been Banned");
      }else{
          message.channel.send(`You coudn't Ban that member!`);
      }
  }
}