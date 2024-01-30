import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  userData: any;
  noData: boolean;

  constructor(private api: ApiService,private router:Router) { }
  ngOnInit(): void {
    this.userData={
      "email":localStorage.getItem('userEmail'),
      "region":localStorage.getItem('userRegion')
    }
  }

 
  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = "head-md-screen"
    }
    return styleClass;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
