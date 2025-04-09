import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: string, action?: string, config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config);
  }
}
