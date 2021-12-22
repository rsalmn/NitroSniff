const Discord = require('discord.js')
const client = new Discord.Client();
const axios = require('axios').default;
const token = require('./token.json')


client.on('ready', () => {
    console.log(`Nitro Sniper Enabled...`);
});

client.on('message', message => {
    if(message.content.includes('discord.gift') || message.content.includes('discordapp.com/gifts/')) {

        var Nitro = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/

        var NitroUrl = Nitro.exec(message.content);
        var NitroCode = NitroUrl[0].split('/')[1];

        console.log(`Nitro Gift found in: ${message.guild.name}`);
        
        axios({
            method: 'POST',
            url: `https://discordapp.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`, 
            headers: 
            {
            'Authorization': token 
            }
        }).then(
            () => console.log(`Successfully redeemed in: ${message.guild.name}`)
        ).catch(ex => console.log(`Failed to claim Nitro Gift: ${message.guild.name}`))
    }
})

client.login(token)
