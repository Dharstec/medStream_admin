import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { ExpertsService } from '../experts.service';

@Component({
  selector: 'app-experts-list',
  templateUrl: './experts-list.component.html',
  styleUrls: ['./experts-list.component.scss']
})
export class ExpertsListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['s.no', 'image', 'name', 'designation', 'institution', 'action'];
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData: any[];
  expertList: any;
  originalData: any[];
  noData = false;
  institutionList: any[] = [];
  selectedInstitution:string;

  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router, private expSer: ExpertsService) { }

  ngOnInit(): void {
    this.getExpertList();
  }

  edit(type, id, data) {
    this.expSer.data = data;
    this.router.navigate(['/experts/' + type, id]);
  }
  getInstitutionList(): void {
    this.api.apiGetCall('institute').subscribe((data) => {
      this.institutionList = data.data;
    })
  }
  onInstitutionSelect(event: any): void {
    this.selectedInstitution = event.value;
  }
  
  getExpertList(): void {
    this.api.apiGetCall('experts').subscribe((data) => {
      this.expertList = data.data;
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

        this.api.apiDeleteCall(id, 'experts').subscribe(response => {
          if (response.message.includes('successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: response.message,
            });
            this.getExpertList();
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
      this.dataSource.data = this.expertList;
    }
  }
}
