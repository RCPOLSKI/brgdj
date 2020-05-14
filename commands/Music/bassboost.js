const Command = require("../../Base/Command");

class Bassboost extends Command {
    constructor(client) {
        super(client, {
            name: "bassboost",
            description: "Bassboost a porra toda.",
            aliases: ["bb"],
            usage: ["bassboost off", "bassboost baixo", "bassboost medio", "bassboost alto", "bassboost debochado"]
        })
    }

    async execute(message, args, Discord) {
        let queue = this.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("❌ | Eu não estou tocando nada... Estou?");
        if (!message.member.voice.channel) return message.channel.send(`❌ | Você não está em um canal de voz!`);
        if (queue && message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`❌ | Você não está no mesmo canal de voz que eu!`);
        let amt = args[0];
        if (!amt) return message.channel.send(`❌ | Opções: \`off\`, \`baixo\`, \`medio\`, \`alto\` & \`debochado\`.`);
        amt = amt.toLowerCase();
        switch (amt) {
            case "off":
                amt = 0;
                queue.bassboost = amt;
                handle(this.client,queue,message.guild);
                return message.channel.send("✅ | Bassboost desligado.");
                break;
            case "baixo":
                amt = 5;
                queue.bassboost = amt;
                handle(this.client,queue,message.guild);
                return message.channel.send("✅ | Bassboost alterado para `baixo`.");
                break;
            case "medio":
                amt = 10;
                queue.bassboost = amt;
                handle(this.client,queue,message.guild);
                return message.channel.send("✅ | Bassboost alterado para `medio`.");
                break;
            case "alto":
                amt = 15;
                queue.bassboost = amt;
                handle(this.client, queue, message.guild);
                return message.channel.send("✅ | Bassboost alterado para `alto`.");
                break;
            case "debochado":
                amt = 20;
                queue.bassboost = amt;
                handle(this.client,queue, message.guild);
                return message.channel.send("✅ | Agora o deboche pega irmão.");
                break;
            default:
                return message.channel.send(`❌ | Opções: \`off\`, \`baixo\`, \`medio\`, \`alto\` & \`debochado\`.`);
        }
    }
}

function handle (client, queue, server) {
  return client.player.play(server, queue.songs[0], queue.dispatcher.streamTime);
}
module.exports = Bassboost;