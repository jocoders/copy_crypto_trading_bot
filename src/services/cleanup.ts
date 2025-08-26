import Swap from '../db/models/swaps';
import 'dotenv/config';

let cleanupInterval: NodeJS.Timeout | null = null;

export const cleanupProcessedSwaps = async (): Promise<void> => {
  try {
    console.log('Starting cleanup of processed swaps...');

    // Calculate cutoff time based on environment variable
    const hoursThreshold = parseInt(
      process.env.CLEANUP_HOURS_THRESHOLD || '24'
    );
    const cutoffTime = new Date();
    cutoffTime.setHours(cutoffTime.getHours() - hoursThreshold);

    // Delete processed swaps older than the threshold
    const result = await Swap.deleteMany({
      processed: true,
      processingTimestamp: { $lt: cutoffTime },
    });

    console.log(`Cleaned up ${result.deletedCount} processed swaps`);
  } catch (error) {
    console.error('Error cleaning up processed swaps:', error);
  }
};

export const startCleanupService = async (): Promise<boolean> => {
  try {
    // Run initial cleanup
    await cleanupProcessedSwaps();

    // Set up cleanup interval
    const cleanupFreq = parseInt(process.env.CLEANUP_FREQ || '3600000'); // Default: 1 hour
    cleanupInterval = setInterval(cleanupProcessedSwaps, cleanupFreq);

    console.log(`Cleanup service started with frequency: ${cleanupFreq}ms`);
    return true;
  } catch (error) {
    console.error('Error starting cleanup service:', error);
    return false;
  }
};

export const stopCleanupService = (): boolean => {
  if (cleanupInterval) {
    clearInterval(cleanupInterval);
    cleanupInterval = null;
    console.log('Cleanup service stopped');
    return true;
  }
  return false;
};
