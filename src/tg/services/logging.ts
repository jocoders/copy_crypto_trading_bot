export class LoggingService {
  private static formatMessage(level: string, message: string, context?: any): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
  }

  static info(message: string, context?: any): void {
    console.log(this.formatMessage('info', message, context));
  }

  static warn(message: string, context?: any): void {
    console.warn(this.formatMessage('warn', message, context));
  }

  static error(message: string, context?: any): void {
    console.error(this.formatMessage('error', message, context));
  }

  static debug(message: string, context?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(this.formatMessage('debug', message, context));
    }
  }
}