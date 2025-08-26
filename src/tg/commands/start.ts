import { CommandContext, Context } from 'grammy';

import { getMainMenu } from '../components/menu';
import { ErrorService } from '../services/error';
import { LoggingService } from '../services/logging';

export async function startCommand(
  ctx: CommandContext<Context>
): Promise<void> {
  try {
    LoggingService.info('Start command triggered', { userId: ctx.from?.id });

    const welcomeMessage = `👋 Hello and welcome to **CopyTradingBot**!

This bot helps you track wallets and copy trades across multiple chains.  
You can:
• ➕ Add wallets to follow  
• 📋 View your tracked wallets  
• 💰 Check balances (coming soon)  
• 📊 See overall status and statistics  

Supported chains: **ETH, BSC, Base, Arbitrum, Solana, TON**

Type /help at any time to see all available commands.`;

    await ctx.reply(welcomeMessage, {
      reply_markup: getMainMenu(),
      parse_mode: 'Markdown',
    });

    LoggingService.info('Start command completed successfully', {
      userId: ctx.from?.id,
    });
  } catch (error) {
    ErrorService.handleBotError(error as Error, {
      command: 'start',
      userId: ctx.from?.id,
    });
    await ctx.reply('Sorry, something went wrong. Please try again.');
  }
}
