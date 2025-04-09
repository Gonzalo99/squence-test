import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MaterialModule],
})
export class LoaderModalComponent {
  protected title = '';

  constructor(
    public dialogRef: MatDialogRef<LoaderModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string }
  ) {
    dialogRef.disableClose = true;
    this.title = data?.title;
  }
}
