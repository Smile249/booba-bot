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
    .setName("bird")
    .setDescription("Sends a picture of a bird.")
    .setDMPermission(true),
  async execute(interaction) {
    await interaction.deferReply();

    fetch("https://some-random-api.ml/animal/bird")
      .then((res) => res.json())
      .then((data) => {
        let birdEmbed = new EmbedBuilder()
        .setFooter({
            text: data.fact,
            iconURL: "https://lh3.googleusercontent.com/u/0/drive-viewer/AFDK6gPDH2zMpL4i4JCbRr9mEZqdgzarMFtUd3URZmTc8MXlCdxP5o_AaAKf42Pc0cLV-PKruMRAB2DyAW4vXGC_WdxGVVTZbA=w1488-h927"
        })
        .setImage(data.image)
        .setColor("#2C5F23")
        return interaction.editReply({ embeds: [birdEmbed] });
      });
  },
};
