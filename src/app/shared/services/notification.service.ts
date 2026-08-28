import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly message = signal<string | null>(null);
  private timeoutId: ReturnType<typeof setTimeout> | undefined;

  show(message: string): void {
    if (this.timeoutId !== undefined) {
      clearTimeout(this.timeoutId);
    }

    this.message.set(message);
    this.timeoutId = setTimeout(() => {
      this.message.set(null);
      this.timeoutId = undefined;
    }, 3000);
  }
}
