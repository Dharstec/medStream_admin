import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { InstitutionService } from '../institution.service';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MediaMatcher
} from '@angular/cdk/layout';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss']
})
export class InstitutionListComponent  implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) institutionPaginations: MatPaginator;
  columnsToDisplay = ['s.no', 'image', 'name', 'location','action'];
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData: any[];
  instList: any;
  originalData: any[];
  noData=false;
  pageSize: number=5;
  opsList : any;

  constructor(private api: ApiService,public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router,private insSer:InstitutionService) { }

  ngOnInit(): void {
    this.getInstitutionList();
  }

  edit(type,id,data) {
    this.insSer.data=data;
    this.router.navigate(['/institution/'+type, id]);
  }

  getInstitutionList(): void {
    this.api.apiGetCall('institute').subscribe((data) => {
      this.instList = data.data;
      this.dataSource = new MatTableDataSource(this.instList);
      this.dataSource.data = data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      this.dataSource.paginator = this.institutionPaginations;
      if(!this.instList.length){
        this.dataSource = new MatTableDataSource([]);
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

        this.api.apiDeleteCall(id, 'institute').subscribe(response => {
          if (response.message.includes('Institute deleted successfully')) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: response.message,
            });
            this.getInstitutionList();
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
