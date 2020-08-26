# discord-bot
A discord bot for helping manage channels.

A small discord bot built on node-js using the dicord.js library.

The bot can execute kick and ban commands when given by a user.

User role checking is implemented to ensure users with lower roles cannot manage users above them.

The bot can also make announcements to a connected channel via webhooks.

Commands need to be prefixed with the '$' symbol.

$kick @userabc implies kicking the user with the username 'userabc'.

$ban @userabc implies banning the user with the username 'userabc'.

$announce Apples are free everyone. will send an announcement to the announcements channel saying 'Apples are free everyone.'

As an extra fun feature this bot kicks anybody when they use the word 'fortnite' in their texts. Sorry Fortnite lovers.
