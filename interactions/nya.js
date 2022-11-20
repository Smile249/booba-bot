const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActivityType,
  GuildScheduledEventPrivacyLevel,
  ClientUser,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
      .setName('nya')
      .setDescription('Nya? Nya.'),
      async execute(interaction) {
        await interaction.deferReply();
    
        fetch("https://nekos.life/api/v2/img/neko")
          .then((res) => res.json())
          .then((data) => {
            let nyaEmbed = new EmbedBuilder()
            .setImage(data.url)
            .setColor("#acace6")
            .setFooter({
              text: "This is [CANA]Dan's fault"
            })
            return interaction.editReply({ embeds: [nyaEmbed] });
          });
        },
};