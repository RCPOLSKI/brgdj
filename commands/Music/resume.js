const Command = require("../../Base/Command");

class Resume extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      description: "Resume a reprodução.",
      aliases: ["continua", "dale"],
      usage: ["resume"]
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
    if (queue && !queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return message.channel.send("▶ Resumido!");
    }
    return message.channel.send("❌ | Pause o som para resumir.");
  }
}

module.exports = Resume;
