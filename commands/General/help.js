const Command = require("../../Base/Command");

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Mostra os comandos do BOT.",
      aliases: ["h", "commands"],
      usage: ["help"],
      permissions: []
    });
  }

  async execute(message, args, Discord) {
    if (!args[0]) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Total de comandos: ${this.client.commands.size}`)
        .setTitle(`COMANDOS`)
        .setThumbnail(this.client.user.displayAvatarURL({ format: "png" }))
        .setDescription(
          `Use **${this.client.prefix}help <commando>** para mais informação.`
        )
        .addField(
          `Geral [${
            this.client.commands.filter(c => c.help.category === "General").size
          }]`,
          this.client.commands
            .filter(c => c.help.category === "General")
            .map(m => `\`${m.help.name}\``)
            .join(", ")
        )
        .addField(
          `Gerenciamento [${
            this.client.commands.filter(c => c.help.category === "Management")
              .size
          }]`,
          this.client.commands
            .filter(c => c.help.category === "Management")
            .map(m => `\`${m.help.name}\``)
            .join(", ")
        )
        .addField(
          `Música [${
            this.client.commands.filter(c => c.help.category === "Music").size
          }]`,
          this.client.commands
            .filter(c => c.help.category === "Music")
            .map(m => `\`${m.help.name}\``)
            .join(", ")
        )
        // .addField(
        //   `Source Code`,
        //   `**[Click Here](https://github.com/INEX07/pikabot)**`
        // )
        .setColor("#FFFF00");
      return message.channel.send(embed);
    } else {
      let cmd = this.client.getCommand(args[0]);
      if (!cmd) return message.channel.send("❌ | Comando inválido.");
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTitle(cmd.help.name)
        .setThumbnail(this.client.user.displayAvatarURL({ format: "png" }))
        .setDescription(cmd.help.description)
        .addField("Categoria", cmd.help.category)
        .addField(
          "Sufixos",
          cmd.help.aliases.length > 0 ? cmd.help.aliases.join(" ") : "Nenhum"
        )
        .addField(
          "Uso",
          `${
            cmd.help.usage[0].startsWith("No")
              ? cmd.help.usage[0]
              : cmd.help.usage.map(m => `${this.client.prefix}${m}`).join("\n")
          }`
        )
        .addField(
          "Permissões",
          cmd.help.permissions.length > 0
            ? cmd.help.permissions.join(", ")
            : "Nenhuma"
        )
        .setColor("#FFFF00")
        .setFooter(
          `${this.client.user.username} - Comandos`,
          this.client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
  }
}

module.exports = Help;
