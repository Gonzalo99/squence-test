import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderModalComponent } from '../../components/modals/loader/loader.component';
import { DefaultModalComponent } from '../../components/modals/default/default.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  open(title: string, content: string, okLabel?: string, cancelLabel?: string) {
    return this.dialog.open(DefaultModalComponent, {
      data: { title, content, okLabel, cancelLabel },
      height: '250px',
      width: '380px',
      disableClose: true,
    });
  }

  openLoader(title: string | undefined = undefined) {
    return this.dialog.open(LoaderModalComponent, {
      data: { title },
      height: '250px',
      width: '380px',
    });
  }
}
