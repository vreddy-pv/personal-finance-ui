import { Component, effect, OnInit, signal } from '@angular/core';
import { ApiService } from '../services/api';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { StateService } from '../services/state';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionDialogComponent } from '../components/add-transaction-dialog/add-transaction-dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.html',
  styleUrls: ['./transaction-list.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule]
})
export class TransactionListComponent implements OnInit {

  transactions = signal<any[]>([]);
  displayedColumns: string[] = ['date', 'description', 'amount', 'category', 'actions'];

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    public dialog: MatDialog
  ) {
    effect(() => {
      this.stateService.refresh(); // a signal read
      this.loadTransactions();
    });
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.apiService.getAllTransactions().subscribe(data => {
      this.transactions.set(data);
    });
  }

  deleteTransaction(id: number) {
    this.apiService.deleteTransaction(id).subscribe(() => {
      this.stateService.notify();
    });
  }

  editTransaction(transaction: any) {
    const dialogRef = this.dialog.open(AddTransactionDialogComponent, {
      width: '400px',
      data: transaction,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.stateService.notify();
    });
  }
}
