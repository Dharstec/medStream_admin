import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { InstitutionService } from '../institution.service';

@Component({
  selector: 'app-institution-list',
  templateUrl: './institution-list.component.html',
  styleUrls: ['./institution-list.component.scss']
})
export class InstitutionListComponent  implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['s.no', 'image', 'name', 'location', 'operator','action'];
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData: any[];
  instList: any;
  originalData: any[];
  noData=false;

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
    this.dataSource.data=this.instList;
  }
}
}
