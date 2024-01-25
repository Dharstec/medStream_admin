import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { AllCasesService } from '../all-cases.service';

@Component({
  selector: 'app-all-cases-list',
  templateUrl: './all-cases-list.component.html',
  styleUrls: ['./all-cases-list.component.scss']
})
export class AllCasesListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['s.no', 'title', 'category', 'subCategory', 'inst', 'week', 'month', 'action'];
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData: any[];
  allCases: any;
  originalData: any[];
  noData = false;

  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router, private allSer: AllCasesService) { }

  ngOnInit(): void {
    this.getLiveCasesList();
  }

  edit(type, id, data) {
    this.allSer.data = data;
    this.router.navigate(['/allCases/' + type, id]);
  }

  getLiveCasesList(): void {
    this.api.apiGetCall('allcase').subscribe((data) => {
      this.allCases = data.data;
      this.dataSource.data = data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      if (!data.data?.length) {
        this.noData = true;
      }
    })
  }

  delete(id: string): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        from: "delete",
      }
    });
    dialog.afterClosed().subscribe(data => {
      if (data) {

        this.api.apiDeleteCall(id, 'allcase').subscribe(response => {
          if (response.message.includes('successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: response.message,
            });
            this.getLiveCasesList();
          }
        })
      }
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyTypeFilter() {
    if (this.selectedColourValue?.length || this.selectedValue?.length) {
      this.filteredData = this.dataSource.data.filter(item => {
        // Check if the item's category is included in the selectedValue array
        if (this.selectedValue?.length && !this.selectedValue?.includes(item.category[0])) {
          return false;
        }
        // Check if the item's colour is included in the selectedColourValue array
        if (this.selectedColourValue?.length && !this.selectedColourValue?.includes(item.colour[0])) {
          return false;
        }
        // If the item passed both filters, return true
        return true;
      });
    } else {
      this.filteredData = [];
      this.dataSource.data = this.allCases;
    }
  }
}
