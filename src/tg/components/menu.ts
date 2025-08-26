import { InlineKeyboard } from 'grammy';

import { LoggingService } from '../services/logging';

export function getMainMenu(): InlineKeyboard {
  LoggingService.debug('Creating main menu inline keyboard');

  return new InlineKeyboard()
    .text('➕ Add Wallet', 'menu_add')
    .text('📋 List Wallets', 'menu_list')
    .row()
    .text('💰 Balance', 'menu_balance')
    .text('📊 Status', 'menu_status')
    .row()
    .text('⚙️ Settings', 'menu_settings')
    .text('❓ Help', 'menu_help');
}

export const MENU_CALLBACKS = {
  MENU_ADD: 'menu_add',
  MENU_LIST: 'menu_list',
  MENU_BALANCE: 'menu_balance',
  MENU_STATUS: 'menu_status',
  MENU_SETTINGS: 'menu_settings',
  MENU_HELP: 'menu_help',
} as const;

export type MenuCallback = (typeof MENU_CALLBACKS)[keyof typeof MENU_CALLBACKS];
