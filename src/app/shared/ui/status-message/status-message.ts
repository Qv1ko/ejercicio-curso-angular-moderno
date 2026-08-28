import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-status-message',
  template:
    '<div class="status-message" [class.error-message]="error()" [attr.role]="role()">{{ message() }}</div>',
})
export class StatusMessage {
  readonly message = input.required<string>();
  readonly error = input(false);
  readonly role = input<'status' | 'alert'>('status');
}
