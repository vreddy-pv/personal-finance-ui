import { Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav';
import { Dashboard } from './components/dashboard/dashboard';
import { TransactionListComponent } from './transaction-list/transaction-list';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      { path: '', component: Dashboard },
      { path: 'transactions', component: TransactionListComponent },
    ],
  },
];

