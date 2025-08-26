import { CommandContext, Context } from 'grammy';

import { getMainMenu } from '../components/menu';
import { ErrorService } from '../services/error';
import { LoggingService } from '../services/logging';

export async function helpCommand(ctx: CommandContext<Context>): Promise<void> {
  try {
    LoggingService.info('Help command triggered', { userId: ctx.from?.id });

    const helpMessage = `Available Commands:

/start - Welcome message with bot introduction
/help - Display all commands with descriptions

/add <address> <chain> - Add a wallet address to track under a chain
/remove <address> <chain> - Remove a wallet address from tracking
/list - List all wallets you are tracking
/balance <chain> - Show your balance on the given chain (coming soon)
/status - Show bot status and statistics

Supported chains: eth, bsc, base, arb, sol, ton

Use the menu below for quick access:`;

    await ctx.reply(helpMessage, {
      reply_markup: getMainMenu(),
    });

    LoggingService.info('Help command completed successfully', {
      userId: ctx.from?.id,
    });
  } catch (error) {
    ErrorService.handleBotError(error as Error, {
      command: 'help',
      userId: ctx.from?.id,
    });
    await ctx.reply('Sorry, something went wrong. Please try again.');
  }
}
