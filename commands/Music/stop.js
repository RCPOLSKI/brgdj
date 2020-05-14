const Command = require("../../Base/Command");

class Skip extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      description: "Para a reprodução da música.",
      aliases: ["stop", "para", "saiporra", "quita"],
      usage: ["para"]
    });
  }

  async execute(message, args, Discord) {
    let queue = this.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("❌ | Eu não estou tocando nada... Estou?");
    if (!message.member.voice.channel)
      return message.channel.send(`❌ | Você não está em um canal de voz!`);
    if (
      queue &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
    )
      return message.channel.send(`❌ | Você não está no mesmo canal de voz que eu!`);
    queue.songs = [];
    queue.connection.dispatcher.end();
    return message.channel.send("✅ | Blz, encerrando atividades!");
  }
}

module.exports = Skip;
