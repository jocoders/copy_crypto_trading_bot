// src/db/models/trackedWallets.ts
import mongoose from "mongoose";

const trackedWalletSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      trim: true,
    },
    chain: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastChecked: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

trackedWalletSchema.index({ address: 1, chain: 1 }, { unique: true });

const TrackedWallet = mongoose.model("TrackedWallet", trackedWalletSchema);

export default TrackedWallet;
