import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderModalComponent } from '../../components/modals/loader/loader.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openLoader(title: string | undefined = undefined) {
    return this.dialog.open(LoaderModalComponent, {
      data: { title },
      height: '250px',
      width: '380px',
    });
  }
}
