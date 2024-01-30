import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { LiveCasesService } from '../live-cases.service';
import {
  MatPaginator
} from '@angular/material/paginator';


@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.scss']
})
export class LiveListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) scheduleCasePaginations: MatPaginator;
  columnsToDisplay = ['s.no', 'title', 'category', 'subCategory', 'inst', 'week', 'month', 'action'];
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData: any[];
  liveCasesList: any;
  originalData: any[];
  noData = false;
  pageSize: number=5;

  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router, private liveSer: LiveCasesService) { }

  ngOnInit(): void {
    this.getLiveCasesList();
  }

  edit(type, id, data) {
    this.liveSer.data = data;
    this.router.navigate(['/liveCases/' + type, id]);
  }

  getLiveCasesList(): void {
    this.api.apiGetCall('schedulecase').subscribe((data) => {
      this.liveCasesList = data.data;
      this.dataSource = new MatTableDataSource(this.liveCasesList);
      this.dataSource.data = data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      this.dataSource.paginator = this.scheduleCasePaginations;
      if(!this.liveCasesList.length){
        this.dataSource = new MatTableDataSource([]);
      this.noData=true;
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

        this.api.apiDeleteCall(id, 'schedulecase').subscribe(response => {
          if (response.message.includes('Schedule Case Video deleted successfully')) {
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
    this.noData = this.dataSource.filteredData.length ? false : true
  }
}
