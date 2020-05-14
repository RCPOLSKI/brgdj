const Command = require("../../Base/Command");

class Echo extends Command {
    constructor(client) {
        super(client, {
            name: "echo",
            description: "Cria eco.",
            aliases: ["eco"],
            usage: ["eco"]
        })
    }

    async execute(message, args, Discord) {
        let queue = this.client.queue.get(message.guild.id);
        if (!queue) return message.channel.send("❌ | Eu não estou tocando nada... Estou?");
        if (!message.member.voice.channel) return message.channel.send(`❌ | Você não está em um canal de voz!`);
        if (queue && message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send(`❌ | Você não está no mesmo canal de voz que eu!`);
        queue.echo = !queue.echo;
        handle(message.guild, this.client, queue);
	return message.channel.send(queue.echo ? "Efeito de eco ativado!" : "Efeito de eco desativado!");
    }
}

function handle(guild, client, queue) {
  return client.player.play(guild,queue.songs[0], queue.dispatcher.streamTime)
}

module.exports = Echo;