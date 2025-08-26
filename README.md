# Copy Trading Bot

A minimal Telegram bot built with TypeScript and grammY for tracking cryptocurrency wallet addresses across multiple blockchain networks.

## Features

- Track wallet addresses across supported blockchain networks
- Add and remove wallets from your personal tracking list
- View all your tracked wallets organized by blockchain
- Get bot status and statistics
- Simple in-memory storage (no database required)

## Supported Commands

- `/start` - Welcome message with bot introduction
- `/help` - Display all commands with descriptions
- `/add <address> <chain>` - Add a wallet address to track under a chain
- `/remove <address> <chain>` - Remove a wallet address from tracking
- `/list` - List all wallets you are tracking
- `/balance <chain>` - Show your balance on the given chain (coming soon)
- `/status` - Show bot status and statistics

### Command Suggestions

The bot automatically configures slash command suggestions using the Telegram Bot API's `setMyCommands` feature. When you type `/` in a private chat with the bot, Telegram will show a list of available commands with descriptions. This list:

- Is rendered by the Telegram client using the official Bot API
- Supports localization (Russian descriptions for users with Russian locale)
- May take a few seconds to propagate after bot restart
- Can also be configured manually via BotFather, but the bot auto-configures itself on startup

## Supported Blockchains

- `eth` - Ethereum
- `bsc` - Binance Smart Chain
- `base` - Base
- `arb` - Arbitrum
- `sol` - Solana
- `ton` - TON

## Setup

### Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Set your Telegram bot token in the `.env` file:
   ```
   BOT_TOKEN=your_telegram_bot_token_here
   ```

### Installation

Install the required dependencies:
```bash
npm install
```

### Development

Run the bot in development mode with automatic reload:
```bash
npm run dev
```

### Production

Build the project:
```bash
npm run build
```

Run the compiled bot:
```bash
npm start
```

## Code Quality

The project includes linting and formatting tools:

- Check code with ESLint: `npm run lint`
- Fix linting issues: `npm run lint:fix`
- Check formatting with Prettier: `npm run format`
- Fix formatting issues: `npm run format:fix`

## Project Structure

```
copytrading-bot-ts/
├── src/
│   ├── commands/          # Bot command handlers
│   ├── lib/              # Utility modules
│   ├── bot.ts            # Bot initialization and setup
│   └── index.ts          # Application entry point
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── .eslintrc.cjs        # ESLint configuration
└── .prettierrc          # Prettier configuration
```

## Technical Details

- **Runtime**: Node.js with TypeScript
- **Bot Framework**: grammY
- **Storage**: In-memory (resets on restart)
- **Development**: Long polling (no webhooks)
- **Code Quality**: ESLint + Prettier with strict TypeScript configuration