import { CommandContext, Context } from 'grammy';

import { startTime } from '../index';
import { formatUptime } from '../utils/parse';
import { getTotalUsers, getTotalWallets } from '../utils/store';

export async function statusCommand(
  ctx: CommandContext<Context>
): Promise<void> {
  const uptime = formatUptime(startTime);
  const totalUsers = getTotalUsers();
  const totalWallets = getTotalWallets();

  const statusMessage = `Bot Status:

Uptime: ${uptime}
Total users: ${totalUsers}
Total tracked wallets: ${totalWallets}`;

  await ctx.reply(statusMessage);
}
