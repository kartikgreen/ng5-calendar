import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
  <h2 mat-dialog-title>
    Event's Detail
  </h2>
  <mat-dialog-content>
  <div *ngFor='let events of dialog;'>
    <span>event's Name: {{events.events_name}}</span>
    <span>event's Location: {{events.events_location}}</span>
  </div>  
  </mat-dialog-content>
  <mat-dialog-actions>
    <button
        mat-button
        (click)="dialogRef.close(false)"
        color="primary">
        close
    </button>
  </mat-dialog-actions>
  `
})
export class DialogComponent {

  get dialog() {
      return this.data;
  }

  constructor(
      @Inject(MAT_DIALOG_DATA) public data,
      public dialogRef: MatDialogRef<DialogComponent>
  ) {}

}
