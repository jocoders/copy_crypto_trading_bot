import dotenv from 'dotenv';

import { setupBotCommands } from './tg/commands/setup';
import { createBot } from './tg/index';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;

async function startBot() {
  try {
    if (!BOT_TOKEN) {
      console.error('BOT_TOKEN environment variable is required');
      process.exit(1);
    }

    const bot = createBot(BOT_TOKEN);

    await setupBotCommands(bot);
    await bot.start();

    console.log('All services started successfully!');

    process.on('SIGINT', async () => {
      console.log('Shutting down application...');
      process.exit(0);
    });
  } catch (error) {
    console.error('Error starting the bot:', error);
    process.exit(1);
  }
}

startBot();
