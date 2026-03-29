import { Routes } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav';
import { Dashboard } from './components/dashboard/dashboard';
import { LoginComponent } from './auth/components/login.component';
import { RegisterComponent } from './auth/components/register.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: Dashboard },    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];


