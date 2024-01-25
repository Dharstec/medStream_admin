import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { OperatorService } from '../operator.service';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.scss']
})
export class OperatorListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['s.no', 'image', 'name', 'designation', 'institution', 'action'];
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData: any[];
  operatorList: any;
  originalData: any[];
  noData=false;

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
      this.dataSource.data = data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      if(!data.data?.length){
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
  }

  applyTypeFilter() {
  if(this.selectedColourValue?.length || this.selectedValue?.length){
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
  }else{
    this.filteredData=[];
    this.dataSource.data=this.operatorList;
  }
}
}
