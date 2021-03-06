import Discord from 'discord.js';
import { dispatchCommand } from './dispatcher';
import logger from 'winston';
import mongoose from 'mongoose';
import { BOT_TOKEN, ENV, envs, prefix, validCommands } from './constants';

// Configure logger
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true
});
logger.level = 'debug';

// Initialize client
const client = new Discord.Client();
client.commands = validCommands;
client.logger = logger;
client.prefix = prefix;

// Attach debug listeners to client
client
  .on('ready', () => client.logger.info('Bot is connected'))
  .on('disconnect', () => {
    client.logger.warn('Bot is disconnecting');
    mongoose.connection
      .disconnect()
      .then(() => client.logger.info('DB is disconnected'))
      .catch((err) => client.logger.error(err));
  })
  .on('reconnecting', () => client.logger.info('Bot reconnecting'))
  .on('error', (err) => client.logger.error(err))
  .on('warn', (warn) => client.logger.warn(warn));

// Login client
if (ENV !== envs.TESTING) {
  client.login(BOT_TOKEN);
}

// Other client listeners
client.on('message', (message) => dispatchCommand(message));

export default client;
