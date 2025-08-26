import { Bot } from 'grammy';

import { addCommand } from './commands/add';
import { balanceCommand } from './commands/balance';
import { helpCommand } from './commands/help';
import { listCommand } from './commands/list';
import { removeCommand } from './commands/remove';
import { startCommand } from './commands/start';
import { statusCommand } from './commands/status';
import { MENU_CALLBACKS } from './components/menu';
import { handleMenuCallback } from './handlers/menuCallbacks';
import { ErrorService } from './services/error';

export let bot: Bot | null = null;

export function createBot(token: string): Bot {
  bot = new Bot(token);

  // Register text commands
  bot.command('start', startCommand);
  bot.command('help', helpCommand);
  bot.command('add', addCommand);
  bot.command('remove', removeCommand);
  bot.command('list', listCommand);
  bot.command('balance', balanceCommand);
  bot.command('status', statusCommand);

  // Register callback handlers for menu buttons
  bot.callbackQuery(Object.values(MENU_CALLBACKS), handleMenuCallback);

  bot.catch(error => {
    ErrorService.handleBotError(error as Error, { source: 'bot_global' });
  });

  return bot;
}

export const startTime = Date.now();
