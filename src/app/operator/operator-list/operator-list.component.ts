import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { OperatorService } from '../operator.service';
import {
  MatPaginator
} from '@angular/material/paginator';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.scss']
})
export class OperatorListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) allCasePaginations: MatPaginator;
  columnsToDisplay = ['s.no', 'image', 'name', 'designation', 'institution', 'action'];
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData: any[];
  operatorList: any;
  originalData: any[];
  noData=false;
  pageSize: number=5;

  constructor(private api: ApiService,public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router,private opeSer:OperatorService) { }

  ngOnInit(): void {
    this.getOperatorDet();
  }

  edit(type,id,data) {
    this.opeSer.data=data;
    this.router.navigate(['/operator/'+type, id]);
  }

  getOperatorDet(): void {
    this.api.apiGetCall('operator').subscribe((data) => {
      this.operatorList = data.data;
      this.dataSource = new MatTableDataSource(this.operatorList);
      this.dataSource.data = data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      this.dataSource.paginator = this.allCasePaginations;
      if(!this.operatorList.length){
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

        this.api.apiDeleteCall(id, 'operator').subscribe(response => {
          if (response.message.includes('successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: response.message,
            });
            this.getOperatorDet();
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
