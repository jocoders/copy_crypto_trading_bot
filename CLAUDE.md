# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Run the bot in development mode with automatic reload using tsx
- `npm run build` - Build the TypeScript project to dist/
- `npm start` - Run the compiled bot from dist/index.js

### Code Quality
- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Check formatting with Prettier
- `npm run format:fix` - Fix formatting issues automatically

Always run `npm run lint` and `npm run format` before committing changes.

## Project Architecture

This is a minimal Telegram bot built with TypeScript and grammY for tracking cryptocurrency wallet addresses across multiple blockchain networks.

### Core Architecture
- **Bot Framework**: Uses grammY for Telegram bot functionality
- **Storage**: In-memory storage that resets on restart (no database)
- **Module System**: ES modules with TypeScript compilation
- **Command Pattern**: Each bot command is implemented as a separate module

### Key Components

#### Entry Points
- `src/index.ts` - Application entry point, handles environment setup and bot startup
- `src/bot.ts` - Bot initialization, command registration, and error handling

#### Storage System (`src/lib/store.ts`)
- In-memory storage using Maps and Sets
- Tracks user wallets organized by blockchain
- Functions: `addWallet()`, `removeWallet()`, `getUserWallets()`, `getTotalUsers()`, `getTotalWallets()`

#### Blockchain Support (`src/lib/chains.ts`)
- Supported chains: eth, bsc, base, arb, sol, ton
- Type-safe chain validation with `Chain` type and `isValidChain()`
- Chain listing utilities

#### Command Handlers (`src/commands/`)
Each command is a separate module following the pattern:
- Import from grammY for context types
- Import necessary utilities from `../lib/`
- Export async function that handles the command
- Consistent error handling and user feedback

#### Utilities (`src/lib/parse.ts`)
- `parseArgs()` - Parses command arguments from text
- `formatUptime()` - Formats uptime display for status command

### Code Style
- **TypeScript**: Strict configuration with exactOptionalPropertyTypes and noUncheckedIndexedAccess
- **ESLint**: Extended from recommended rules with import ordering
- **Prettier**: Single quotes, semicolons, 2-space tabs, 80 character line width
- **Import Organization**: Alphabetical with newlines between groups (builtin, external, internal, parent, sibling, index)

### Environment Setup
- Copy `.env.example` to `.env`
- Set `BOT_TOKEN` with your Telegram bot token
- Bot will exit with error if BOT_TOKEN is missing

### Bot Commands Structure
Commands follow a consistent pattern:
1. Parse arguments using `parseArgs()`
2. Validate input (argument count, chain validity, user identification)
3. Perform action (add/remove wallet, retrieve data)
4. Send response to user

The bot supports: `/start`, `/help`, `/add`, `/remove`, `/list`, `/balance`, `/status`