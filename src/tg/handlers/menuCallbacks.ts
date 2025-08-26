import { CallbackQueryContext, Context } from 'grammy';

import { helpCommand } from '../commands/help';
import { listCommand } from '../commands/list';
import { statusCommand } from '../commands/status';
import { MENU_CALLBACKS, MenuCallback } from '../components/menu';
import { ErrorService } from '../services/error';
import { LoggingService } from '../services/logging';

export async function handleMenuCallback(
  ctx: CallbackQueryContext<Context>
): Promise<void> {
  try {
    const callbackData = ctx.callbackQuery.data as MenuCallback;

    LoggingService.info('Menu callback triggered', {
      userId: ctx.from?.id,
      callback: callbackData,
    });

    // Answer the callback to remove the loading state
    await ctx.answerCallbackQuery();

    switch (callbackData) {
      case MENU_CALLBACKS.MENU_ADD:
        await ctx.reply(
          'Please use the format: /add <address> <chain>\n\nExample: /add 0x123...abc eth'
        );
        break;

      case MENU_CALLBACKS.MENU_LIST:
        // Convert callback context to command context for reusing existing command
        const listCtx = {
          ...ctx,
          match: '',
          from: ctx.from,
          reply: ctx.reply.bind(ctx),
        };
        await listCommand(listCtx as any);
        break;

      case MENU_CALLBACKS.MENU_BALANCE:
        await ctx.reply(
          'Please use the format: /balance <chain>\n\nExample: /balance eth'
        );
        break;

      case MENU_CALLBACKS.MENU_STATUS:
        const statusCtx = {
          ...ctx,
          match: '',
          from: ctx.from,
          reply: ctx.reply.bind(ctx),
        };
        await statusCommand(statusCtx as any);
        break;

      case MENU_CALLBACKS.MENU_SETTINGS:
        await ctx.reply(
          '⚙️ Settings coming soon!\n\nThis feature will be available in a future update.'
        );
        break;

      case MENU_CALLBACKS.MENU_HELP:
        const helpCtx = {
          ...ctx,
          match: '',
          from: ctx.from,
          reply: ctx.reply.bind(ctx),
        };
        await helpCommand(helpCtx as any);
        break;

      default:
        LoggingService.warn('Unknown menu callback', {
          callback: callbackData,
        });
        await ctx.reply('Unknown action. Please try again.');
    }

    LoggingService.info('Menu callback handled successfully', {
      userId: ctx.from?.id,
      callback: callbackData,
    });
  } catch (error) {
    ErrorService.handleBotError(error as Error, {
      source: 'menuCallback',
      callback: ctx.callbackQuery.data,
      userId: ctx.from?.id,
    });
    await ctx.reply('Sorry, something went wrong. Please try again.');
  }
}
