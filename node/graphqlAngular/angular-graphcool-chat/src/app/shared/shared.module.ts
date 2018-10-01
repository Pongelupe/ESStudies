import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSlideToggleModule,
  MatIconModule,
  MatLineModule,
  MatTabsModule
} from '@angular/material';
import { NoRecordComponent } from './components/no-record/no-record.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FromNowPipe } from './pipes/from-now.pipe';

@NgModule({
  exports: [
    AvatarComponent,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatLineModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTabsModule,
    NoRecordComponent,
    ReactiveFormsModule,
    FromNowPipe
  ],
  imports: [
    MatIconModule,
    CommonModule
  ],
  declarations: [NoRecordComponent, AvatarComponent, FromNowPipe]
})
export class SharedModule { }
