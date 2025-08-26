import { CommandContext, Context } from 'grammy';

import { getChainsList, isValidChain } from '../utils/chains';
import { parseArgs } from '../utils/parse';

export async function balanceCommand(
  ctx: CommandContext<Context>
): Promise<void> {
  const args = parseArgs(ctx.match);

  if (args.length !== 1) {
    await ctx.reply('Usage: /balance <chain>\n\nExample: /balance eth');
    return;
  }

  const chainInput = args[0];
  const chain = chainInput!.toLowerCase();

  if (!isValidChain(chain)) {
    await ctx.reply(
      `Invalid chain: ${chain}\n\nSupported chains: ${getChainsList()}`
    );
    return;
  }

  await ctx.reply(
    `Balance checking for ${chain.toUpperCase()} is not yet implemented.\n\nThis feature will be available in a future update.`
  );
}
