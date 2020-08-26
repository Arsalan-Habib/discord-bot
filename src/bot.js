require("dotenv").config();
const { Client, WebhookClient } = require("discord.js");

const webhookClient = new WebhookClient(
    process.env.WEBHOOK_ID,
    process.env.WEBHOOK_TOKEN
);

const client = new Client({
    partials: ["MESSAGE", "REACTION"],
});
const PREFIX = "$";

client.login(process.env.DISCORD_JS_BOT_TOKEN);
client.on("ready", () => {
    console.log(`${client.user.username} has logged in successfully.`);
});
client.on("message", async (message) => {
    if (!message.author.bot) {
        if (message.content.startsWith(PREFIX)) {
            const [CMD_NAME, ...args] = message.content
                .trim()
                .substring(PREFIX.length)
                .split(/\s+/);

            console.log(CMD_NAME);
            if (CMD_NAME === "kick") {
                if (!message.member.hasPermission("KICK_MEMBERS"))
                    return message.reply(
                        "You don't have permission to use that command."
                    );
                if (args.length === 0)
                    return message.reply("Please provide an ID.");

                const member = message.guild.members.cache.get(args[0]);
                if (member) {
                    member
                        .kick()
                        .then((member) => {
                            message.channel.send(`${member} was kicked.`);
                        })
                        .catch((err) => {
                            message.channel.send(
                                `I don't have permissions to kick ${member.user.username} :(`
                            );
                        });
                } else {
                    message.reply("Member not found.");
                }
            } else if (CMD_NAME === "ban") {
                if (!message.member.hasPermission("BAN_MEMBERS"))
                    return message.reply(
                        "You don't have permission to use that command."
                    );
                if (args.length === 0)
                    return message.reply("Please provide an ID.");

                try {
                    const user = await message.guild.members.ban(args[0]);
                    message.channel.send(
                        `${user.username} was banned successfully.`
                    );
                } catch (err) {
                    console.log(err);
                    message.channel.send(
                        "An error occured. Either I don't have permissions or the user was not found."
                    );
                }
            } else if (CMD_NAME === "announce") {
                console.log(args);
                const msg = args.join(" ");
                console.log(msg);
                webhookClient.send(msg);
            }
        }
    } else {
        return;
    }
});

client.on("messageReactionAdd", (reaction, user) => {
    console.log("Hello");
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    if (reaction.message.id === "748111792231809178") {
        switch (name) {
            case "🐐":
                member.roles.add("747909796937859243");
                break;
            case "🏆":
                member.roles.add("748107691792269314");
                break;
            case "🐯":
                member.roles.add("748116095902285875");
                break;
        }
    }
});
client.on("messageReactionRemove", (reaction, user) => {
    console.log("Bye");
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);

    if (reaction.message.id === "748111792231809178") {
        switch (name) {
            case "🐐":
                member.roles.remove("747909796937859243");
                break;
            case "🏆":
                member.roles.remove("748107691792269314");
                break;
            case "🐯":
                member.roles.remove("748116095902285875");
                break;
        }
    }
});
