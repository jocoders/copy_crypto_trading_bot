import { Bot } from 'grammy';

import { ErrorService } from '../services/error';
import { LoggingService } from '../services/logging';

// Command type definition
interface BotCommand {
  command: string;
  description: string;
}

// Bot commands with emoji descriptions
const COMMANDS: BotCommand[] = [
  { command: 'start', description: '👋 Welcome message and quick intro' },
  { command: 'help', description: '❓ List all commands and usage' },
  {
    command: 'add',
    description: '➕ Add a wallet to track (usage: /add <address> <chain>)',
  },
  {
    command: 'remove',
    description:
      '🗑️ Remove a tracked wallet (usage: /remove <address> <chain>)',
  },
  { command: 'list', description: '📋 List all tracked wallets' },
  {
    command: 'balance',
    description: '💰 Check balance on a chain (usage: /balance <chain>)',
  },
  { command: 'status', description: '📊 Show bot status and statistics' },
];

export async function setupBotCommands(bot: Bot): Promise<void> {
  try {
    LoggingService.info('Setting up bot commands with emoji descriptions');

    // Clear existing commands first for idempotency
    await bot.api.deleteMyCommands();
    LoggingService.debug('Cleared existing commands');

    // Set commands for default scope
    await bot.api.setMyCommands(COMMANDS, {
      scope: { type: 'default' },
    });
    LoggingService.info('Set commands for default scope');

    // Set commands for all private chats explicitly
    await bot.api.setMyCommands(COMMANDS, {
      scope: { type: 'all_private_chats' },
    });
    LoggingService.info('Set commands for all_private_chats scope');

    LoggingService.info('Bot commands setup completed successfully');
  } catch (error) {
    ErrorService.handleBotError(error as Error, {
      source: 'setupBotCommands',
      context: 'Setting up slash command suggestions',
    });
    throw error; // Re-throw to let the caller handle startup failure
  }
}
