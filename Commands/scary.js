const Discord = require('discord.js')
const {
    AME_API
} = require('../config.json');
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(AME_API);

module.exports = {
    name: 'scary',
    description: 'Shows the user\'s avatar to a scary image :eyes:',
    usage: 'scary [username | nickname | mention | ID]',
    category: 'Fun',
    guildOnly: true,
    async execute(message, args) {

        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase())
            || message.member;
        let m = await message.channel.send("**Please Wait...**");
        let buffer = await AmeAPI.generate("scary", {url: User.user.displayAvatarURL({format: "png", size: 2048})});
        let attachment = new Discord.MessageAttachment(buffer, "scary.png");
        m.delete({timeout: 5000});
        await message.channel.send(attachment);
    }
}
