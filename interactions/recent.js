const { SlashCommandBuilder, Client, Events } = require("@discordjs/builders");
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
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("age")
        .setDescription(
          "Enter a number higher than 1 to request less recent songs. (leave blank to request most recent song)"
        )
        .setRequired(false)
    ),
  async execute(interaction, client) {
    await interaction.deferReply();

    //check if "age" contains anything or if it contains any numbers
    let rec;
    if (interaction.options.getInteger("age") == null) {
      rec = 0;
    } else {
      rec = interaction.options.getInteger("age");
    }

    fetch(
      "https://scoresaber.com/api/player/" +
        interaction.options.getString("id") +
        "/scores?limit=1&sort=recent&page=" +
        rec +
        "&withMetadata=false"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.errorMessage || data.playerScores.length == 0) {
          console.log("The following error occured: " + data.errorMessage);
          return interaction.editReply({
            content:
              "Error while processing your command! Please check if you put everything in correctly!",
            ephemeral: true,
          }); // send a private message if player wasnt found
        }

        const score = data.playerScores[0];

        const diffraw = score.leaderboard.difficulty.difficultyRaw;
        let diffArr = diffraw.split("_");
        diffArr.shift(); //removing first element in array because the diff string has _ in the beginning
        let diff = "";
        if (diffArr[0] == "ExpertPlus") diffArr[0] = "Expert+";
        if (diffArr[1] == "SoloStandard") {
          diff = diffArr[0];
        } else {
          diff = `${diffArr[0]} (${diffArr[1]})`;
        }

        //color coding depending on difficulty
        let EmbColor = "";
        switch (score.leaderboard.difficulty.difficulty) {
          case 1:
            EmbColor = "#3CB371";
            break;
          case 3:
            EmbColor = "#59B0F4";
            break;
          case 5:
            EmbColor = "#FF6347";
            break;
          case 7:
            EmbColor = "#BF2A42";
            break;
          case 9:
            EmbColor = "#8F48DB";
            break;
        }

        //Create Embed Format
        let scoreEmbed = new EmbedBuilder()
          .setTitle(score.leaderboard.songName)
          .setColor(EmbColor)
          .setURL("https://scoresaber.com/leaderboard/" + score.leaderboard.id + "?page=" + Math.floor(score.score.rank/12+1))
          .setDescription(
            "*" +
              score.leaderboard.songAuthorName +
              "*" + //make italic
              "\n" + //create new line
              "**" +
              score.leaderboard.levelAuthorName +
              "**" //make bold
          )
          .setThumbnail(score.leaderboard.coverImage)
          .addFields(
            {
              name: "Difficulty",
              value: diff,
            },
            {
              name: "Accuracy",
              value:
                (
                  (score.score.baseScore / score.leaderboard.maxScore) *
                  100
                ).toFixed(2) + "%",
            },
            {
              name: "PP",
              value: JSON.stringify(score.score.pp),
            },
            {
              name: "Rank",
              value: JSON.stringify(score.score.rank),
            }
          );

        return interaction.editReply({ embeds: [scoreEmbed] });
      });
  },
};
