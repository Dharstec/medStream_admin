import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { OperatorService } from '../operator.service';
import * as _ from 'lodash'
import {
  MatPaginator
} from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-operator-list',
  templateUrl: './operator-list.component.html',
  styleUrls: ['./operator-list.component.scss']
})
export class OperatorListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) institutionPaginations: MatPaginator;
  columnsToDisplay = ['s.no', 'image', 'name', 'designation', 'institution', 'action'];
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData= new MatTableDataSource<any>([]);
  operatorList: any;
  originalData: any[];
  noData=false;
  pageSize: number=5;
  institutions = new FormControl();
  search = new FormControl();
  institutionList:any

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
      this.operatorList = data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      this.dataSource = new MatTableDataSource(this.operatorList);
      this.institutionList = []
      // let check =_.uniqBy(this.dataSource.data,'institution._id')
      let uniqInstitutue =_.uniqBy( this.dataSource.data,'institution._id').map(e=>{
        this.institutionList.push(e.institution.name)
      })
      console.log("institutionList",this.institutionList);
      
      // uniqInstitutue.map(e=>this.institutionList.push(e.institution.name))
      this.dataSource.paginator = this.institutionPaginations;
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

  //  ngAfterViewInit() {
  //   console.log("after")
  //   this.dataSource.paginator = this.institutionPaginations;
  // }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.noData = this.dataSource.filteredData.length ? false : true
      this.dataSource.paginator = this.institutionPaginations;
   
  }

  applyTypeFilter() {
    this.search.setValue('')
    this.dataSource.filter=''
    if (this.institutions?.value.length) {
      this.dataSource.data= this.operatorList.filter(item => {
        if (this.institutions?.value?.length && !this.institutions?.value?.includes(item.institution.name)) {
          return false;
        }
        return true;
      });
      this.noData = this.dataSource.data.length ? false : true
    } else {
      this.dataSource = new MatTableDataSource(this.operatorList);
      this.dataSource.filter=''
      this.dataSource.paginator = this.institutionPaginations;
      this.noData = false
    }
  }
}
