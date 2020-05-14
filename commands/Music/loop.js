const Command = require("../../Base/Command");

class Loop extends Command {
  constructor(client) {
    super(client, {
      name: "loop",
      description: "Repete a reprodução.",
      aliases: ["repetir", "repeat"],
      usage: ["repetir"]
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
    queue.loop = !queue.loop;
    return message.channel.send("🔁 | Repetição " + queue.loop ? "Ativada" : "Desativada" + "!");
  }
}

module.exports = Loop;
