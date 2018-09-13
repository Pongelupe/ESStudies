import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatIconModule,
  MatLineModule
} from '@angular/material';

@NgModule({
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatLineModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
