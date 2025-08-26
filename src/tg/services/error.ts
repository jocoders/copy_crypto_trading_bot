import { LoggingService } from './logging';

export class ErrorService {
  static handle(error: Error, context?: any): void {
    LoggingService.error(error.message, {
      stack: error.stack,
      name: error.name,
      ...context,
    });
  }

  static handleAsync(error: Error, context?: any): void {
    this.handle(error, { ...context, async: true });
  }

  static handleBotError(error: Error, context?: any): void {
    this.handle(error, { ...context, source: 'bot' });
  }
}
