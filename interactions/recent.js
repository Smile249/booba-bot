const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActivityType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("recent")
    .setDMPermission(false)
    .setDescription("Retreive the most recent score set by a player.")
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription(
          "The scoresaber ID of the person you want to get the score from."
        )
        .setMinLength(6)
        .setRequired(true)
    ),
  execute(interaction, client) {
    fetch(
      "https://scoresaber.com/api/player/" +
        interaction.options.getString("id") +
        "/scores?limit=1&sort=recent&withMetadata=false"
    )
      .then((res) => res.json())
      .then((data) => {
        const score = data.playerScores[0];
        console.log(score);
        let scoreEmbed = new EmbedBuilder()
          .setTitle(score.leaderboard.songName)
          .setURL("https://scoresaber.com/leaderboard/" + score.leaderboard.id)
          .setDescription(
            score.leaderboard.songAuthorName +
              "\n" +
              score.leaderboard.levelAuthorName
          )
          .setThumbnail(score.leaderboard.coverImage)
          .addFields({
            name: "Accuracy",
            value:
              (
                (score.score.baseScore / score.leaderboard.maxScore) *
                100
              ).toFixed(2) + "%",
          })
            .addFields({
              name: "PP",
                  value: JSON.stringify(score.score.pp)
                 
            });
          
        return interaction.reply({ embeds: [scoreEmbed] });
      });
  },
};
