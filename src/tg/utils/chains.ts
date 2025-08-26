export const SUPPORTED_CHAINS = [
  'eth',
  'bsc',
  'base',
  'arb',
  'sol',
  'ton',
] as const;

export type Chain = (typeof SUPPORTED_CHAINS)[number];

export function isValidChain(chain: string): chain is Chain {
  return SUPPORTED_CHAINS.includes(chain as Chain);
}

export function getChainsList(): string {
  return SUPPORTED_CHAINS.join(', ');
}
