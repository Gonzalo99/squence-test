import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  imports: [CommonModule, TranslateModule, MaterialModule],
})
export class DefaultModalComponent {
  protected title = '';
  protected content = '';
  protected okLabel = 'MODAL.OK';
  protected cancelLabel: string = '';

  constructor(
    public dialogRef: MatDialogRef<DefaultModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      okLabel?: string;
      cancelLabel?: string;
    }
  ) {
    this.title = data?.title;
    this.content = data?.content;
    this.okLabel = data?.okLabel ?? this.okLabel;
    this.cancelLabel = data?.cancelLabel ?? this.cancelLabel;
  }

  onOkClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}
