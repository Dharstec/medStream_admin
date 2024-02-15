import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { AllCasesService } from '../all-cases.service';
// import * as moment from 'moment';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MediaMatcher
} from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-all-cases-list',
  templateUrl: './all-cases-list.component.html',
  styleUrls: ['./all-cases-list.component.scss']
})
export class AllCasesListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) allCasePaginations: MatPaginator;
  mobileQuery: MediaQueryList;
  columnsToDisplay = ['s.no', 'title', 'category', 'subCategory', 'inst', 'week', 'month', 'action'];
  selectedValue: any;
  selectedColourValue: any;
  selectedStockValue: any
  filteredData: any[];
  allCases: any;
  originalData: any[];
  noData = false;
  pageSize: number=5;
  caseOfTheWeek = new FormControl();
  search = new FormControl();
  caseOfTheWeekList=["Yes","No"]

  constructor(private api: ApiService, public dialog: MatDialog, private snackbar: MatSnackBar,
    private media: MediaMatcher, private router: Router, private allSer: AllCasesService) {
    this.mobileQuery = media.matchMedia('(min-width: 1200px)');
    if (this.mobileQuery.matches) {
      this.pageSize = 5;
    } else {
      this.pageSize = 5;
    }
   }

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
      this.dataSource = new MatTableDataSource(this.allCases);
      this.dataSource.data = data.data.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
      this.dataSource.paginator = this.allCasePaginations;
      // this.dataSource.data.map(e=>{
      //   e['monthYear'] = e.createdAt ? moment(e.createdAt).format("MMM-YY") : '-'
      //   e['week'] = e.createdAt ? moment(e.createdAt).format("WW") : '-'
      // })
      if (!this.allCases?.length) {
        this.dataSource = new MatTableDataSource([]);
        this.noData = true;
      }
    })
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.allCasePaginations;
  // }

  applyCaseFilter() {
    this.search.setValue('')
    this.dataSource.filter=''
    // console.log("caseOfTheWeek",this.caseOfTheWeek.value)
    // console.log("allCases",this.allCases)
    if (this.caseOfTheWeek?.value.length) {
      this.dataSource.data= this.allCases.filter(item => {
        if (this.caseOfTheWeek?.value.length && !this.caseOfTheWeek?.value?.includes(item.caseOfTheWeek)) {
          return false;
        }
        return true;
      });
      this.noData = this.dataSource.data.length ? false : true
      // console.log(" this.dataSource.data", this.dataSource.data)
    } else {
      this.dataSource = new MatTableDataSource(this.allCases);
      this.dataSource.filter=''
      this.dataSource.paginator = this.allCasePaginations;
      this.noData = false
    }
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
    this.noData = this.dataSource.filteredData.length ? false : true
    // this.allCasePaginations.length=this.dataSource.filter.length
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
