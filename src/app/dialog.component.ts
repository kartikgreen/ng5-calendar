import { Component } from '@angular/core';

@Component({
  template: `
    <h1 mat-dialog-title>Event's detail</h1>
    <mat-dialog-content>
    
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="closeDialog()">Cancel</button>
    </mat-dialog-actions>
  `
})
export class DialogComponent {
  closeDialog() {
    console.log('how to close');
  }
}
