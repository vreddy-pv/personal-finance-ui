import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StateService } from '../../services/state';

@Component({
  selector: 'app-add-transaction-dialog',
  templateUrl: './add-transaction-dialog.html',
  styleUrls: ['./add-transaction-dialog.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
  ],
})
export class AddTransactionDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private stateService: StateService
  ) {
    this.isEditMode = !!this.data;
    this.form = this.fb.group({
      date: [this.data?.date || ''],
      description: [this.data?.description || ''],
      amount: [this.data?.amount || ''],
      category: [this.data?.category?.name || ''],
    });
  }

  ngOnInit(): void {}

  save() {
    const { date, description, amount, category } = this.form.value;

    this.apiService.addCategory({ name: category }).subscribe((newCategory) => {
      const transaction = {
        id: this.data?.id,
        date,
        description,
        amount,
        category: newCategory,
      };

      if (this.isEditMode) {
        this.apiService.updateTransaction(transaction.id, transaction).subscribe(() => {
          this.stateService.notify();
          this.dialogRef.close();
        });
      } else {
        this.apiService.addTransaction(transaction).subscribe(() => {
          this.stateService.notify();
          this.dialogRef.close();
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
