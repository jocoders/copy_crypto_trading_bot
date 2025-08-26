import mongoose from 'mongoose';

const botConfigSchema = new mongoose.Schema(
  {
    setting: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const BotConfig = mongoose.model('BotConfig', botConfigSchema);

export default BotConfig;
