import { CommandContext, Context } from 'grammy';

import { getUserWallets } from '../utils/store';

export async function listCommand(ctx: CommandContext<Context>): Promise<void> {
  const userId = ctx.from?.id;
  if (!userId) {
    await ctx.reply('Unable to identify user');
    return;
  }

  const userWallets = getUserWallets(userId);
  const chains = Object.keys(userWallets);

  if (chains.length === 0) {
    await ctx.reply(
      'You are not tracking any wallets yet.\n\nUse /add <address> <chain> to start tracking.'
    );
    return;
  }

  let message = 'Your tracked wallets:\n\n';

  for (const chain of chains) {
    const wallets = userWallets[chain];
    if (wallets && wallets.size > 0) {
      message += `${chain.toUpperCase()}:\n`;
      for (const wallet of wallets) {
        message += `  ${wallet}\n`;
      }
      message += '\n';
    }
  }

  await ctx.reply(message.trim());
}
