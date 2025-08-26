import { CommandContext, Context } from 'grammy';

import { getChainsList, isValidChain } from '../utils/chains';
import { parseArgs } from '../utils/parse';
import { removeWallet } from '../utils/store';

export async function removeCommand(
  ctx: CommandContext<Context>
): Promise<void> {
  const args = parseArgs(ctx.match);

  if (args.length !== 2) {
    await ctx.reply(
      'Usage: /remove <address> <chain>\n\nExample: /remove 0x123...abc eth'
    );
    return;
  }

  const [address, chainInput] = args;
  const chain = chainInput!.toLowerCase();

  if (!isValidChain(chain)) {
    await ctx.reply(
      `Invalid chain: ${chain}\n\nSupported chains: ${getChainsList()}`
    );
    return;
  }

  const userId = ctx.from?.id;
  if (!userId) {
    await ctx.reply('Unable to identify user');
    return;
  }

  const removed = removeWallet(userId, address!, chain);
  if (removed) {
    await ctx.reply(`Successfully removed wallet ${address} from ${chain}`);
  } else {
    await ctx.reply(`Wallet ${address} not found on ${chain}`);
  }
}
