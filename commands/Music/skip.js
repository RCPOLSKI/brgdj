const Command = require("../../Base/Command");

class Skip extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      description: "Pula a música atual.",
      aliases: ["pula", 'proxima'],
      usage: ["pula"]
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

    queue.connection.dispatcher.end();
    return message.channel.send("✅ | Blz, pulando a música!");
  }
}

module.exports = Skip;
