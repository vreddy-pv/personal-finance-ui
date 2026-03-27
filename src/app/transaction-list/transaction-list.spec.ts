import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionListComponent } from './transaction-list';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

describe('TransactionListComponent', () => {
  let component: TransactionListComponent;
  let fixture: ComponentFixture<TransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionListComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatTableModule,
        MatSortModule,
      ],
      providers: [{ provide: MatDialog, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
