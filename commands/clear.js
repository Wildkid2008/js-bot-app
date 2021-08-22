module.exports = {
  name: 'clear',
  description: "This command clears a Message!",
  async execute(message, args){
      if(!args[0]) return message.reply("Please enter the amount of messages you want to Clear!");
      if(isNaN(args[0])) return message.reply("Please enter a real Number!");

      if(args[0] > 100) return message.reply("You canno't delete more than 100 Messages!");
      if(args[0] < 1) return message.reply("You must delete atleast one Message!");
      
      await message.channel.messages.fetch({limit: args[0]}).then(messages => {
        message.channel.bulkDelete(messages);
      });
  }
}