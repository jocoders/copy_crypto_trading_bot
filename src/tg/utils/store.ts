import { Chain } from './chains';

interface UserWallets {
  [chain: string]: Set<string>;
}

interface Store {
  users: Map<number, UserWallets>;
}

const store: Store = {
  users: new Map(),
};

export function addWallet(userId: number, address: string, chain: Chain): void {
  if (!store.users.has(userId)) {
    store.users.set(userId, {});
  }

  const userWallets = store.users.get(userId)!;
  if (!userWallets[chain]) {
    userWallets[chain] = new Set();
  }

  userWallets[chain]!.add(address);
}

export function removeWallet(
  userId: number,
  address: string,
  chain: Chain
): boolean {
  const userWallets = store.users.get(userId);
  if (!userWallets || !userWallets[chain]) {
    return false;
  }

  return userWallets[chain]!.delete(address);
}

export function getUserWallets(userId: number): UserWallets {
  return store.users.get(userId) || {};
}

export function getTotalUsers(): number {
  return store.users.size;
}

export function getTotalWallets(): number {
  let total = 0;
  for (const userWallets of store.users.values()) {
    for (const wallets of Object.values(userWallets)) {
      total += wallets.size;
    }
  }
  return total;
}
