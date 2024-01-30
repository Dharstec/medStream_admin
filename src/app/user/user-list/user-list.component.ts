import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import {
  MatPaginator
} from '@angular/material/paginator';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent  implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) userListPaginations: MatPaginator;
  columnsToDisplay = ['s.no', 'firstName', 'lastName', 'email', 'last'];
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData: any[];
  inventoryList: any;
  originalData: any[];
  noData=false;
  pageSize: number=5;

  constructor(private api: ApiService,public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getInventoryList();
  }

  edit(type,id) {
    this.router.navigate(['/inventory/'+type, id]);
  }

  getInventoryList(): void {
    // this.api.apiGetCall('Product/getProduct').subscribe((data) => {
      // this.inventoryList = data.data;
      // this.dataSource = new MatTableDataSource(this.allCases);
      // this.dataSource.data = data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      // this.dataSource.paginator = this.userListPaginations;
      // if (!this.allCases?.length) {
        this.dataSource = new MatTableDataSource([]);
        this.noData = true;
      // }
    // })
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

        this.api.apiDeleteCall(id, 'Product/deleteProduct').subscribe(response => {
          if (response.message.includes('Successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: response.message,
            });
            this.getInventoryList();
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
