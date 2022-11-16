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
    .setName("cat")
    .setDescription("Sends a picture of a cat.")
    .setDMPermission(true),
  async execute(interaction) {
    await interaction.deferReply();

    fetch("https://some-random-api.ml/animal/cat")
      .then((res) => res.json())
      .then((data) => {
        let catEmbed = new EmbedBuilder()
        .setFooter({
            text: data.fact,
            iconURL: "https://www.google.com/logos/fnbx/animal_paws/cat_kp_dm.gif"
        })
        .setImage(data.image)
        return interaction.editReply({ embeds: [catEmbed] });
      });
  },
};
