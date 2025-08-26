import { CommandContext, Context } from 'grammy';

import { getChainsList, isValidChain } from '../utils/chains';
import { parseArgs } from '../utils/parse';
import { addWallet } from '../utils/store';

export async function addCommand(ctx: CommandContext<Context>): Promise<void> {
  const args = parseArgs(ctx.match);

  if (args.length !== 2) {
    await ctx.reply(
      'Usage: /add <address> <chain>\n\nExample: /add 0x123...abc eth'
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

  addWallet(userId, address!, chain);
  await ctx.reply(`Successfully added wallet ${address} on ${chain}`);
}
