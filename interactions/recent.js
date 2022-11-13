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
        var diffraw = score.leaderboard.difficulty.difficultyRaw
        
        //Format Process Of Difficulty
        //Hey if you are viewing this, it works. OMEGALUL
        //SoloStandard
        if (diffraw) "_ExpertPlus_SoloStandard";{
          diff = "Expert+"
        } 
        if (diffraw) "_Expert_SoloStandard";{
          diff = "Expert"
        }
        if (diffraw) "_Hard_SoloStandard";{
          diff = "Hard"
        }
        if (diffraw) "_Normal_SoloStandard";{
          diff = "Normal"
        }
        if (diffraw) "_Easy_SoloStandard";{
          diff = "Easy"
        }
        //Lawless
        if (diffraw) "_ExpertPlus_Lawless";{
          diff = "Expert+ (Lawless)"
        } 
        if (diffraw) "_Expert_Lawless";{
          diff = "Expert (Lawless)"
        }
        if (diffraw) "_Hard_Lawless";{
          diff = "Hard (Lawless)"
        }
        if (diffraw) "_Normal_Lawless";{
          diff = "Normal (Lawless)"
        }
        if (diffraw) "_Easy_Lawless";{
          diff = "Easy (Lawless)"
        }
        //OneSaber
        if (diffraw) "_ExpertPlus_OneSaber";{
          diff = "Expert+ (One Saber)"
        } 
        if (diffraw) "_Expert_OneSaber";{
          diff = "Expert (One Saber)"
        }
        if (diffraw) "_Hard_OneSaber";{
          diff = "Hard (One Saber)"
        }
        if (diffraw) "_Normal_OneSaber";{
          diff = "Normal (One Saber)"
        }
        if (diffraw) "_Easy_OneSaber";{
          diff = "Easy (One Saber)"
        }
        //90Degree
        if (diffraw) "_ExpertPlus_90Degree";{
          diff = "Expert+ (90 Degree)"
        } 
        if (diffraw) "_Expert_90Degree";{
          diff = "Expert (90 Degree)"
        }
        if (diffraw) "_Hard_90Degree";{
          diff = "Hard (90 Degree)"
        }
        if (diffraw) "_Normal_90Degree";{
          diff = "Normal (90 Degree)"
        }
        if (diffraw) "_Easy_90Degree";{
          diff = "Easy (90 Degree)"
        }
        //360Degree
        if (diffraw) "_ExpertPlus_360Degree";{
          diff = "Expert+ (360 Degree)"
        } 
        if (diffraw) "_Expert_360Degree";{
          diff = "Expert (360 Degree)"
        }
        if (diffraw) "_Hard_360Degree";{
          diff = "Hard (360 Degree)"
        }
        if (diffraw) "_Normal_360Degree";{
          diff = "Normal (360 Degree)"
        }
        if (diffraw) "_Easy_360Degree";{
          diff = "Easy (360 Degree)"
        }

        //Create Embed Format
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
                 
            })
            .addFields({
              name: "Difficulty",
                  value: diff
                 
            });
          
        return interaction.reply({ embeds: [scoreEmbed] });
      });
  },
};
