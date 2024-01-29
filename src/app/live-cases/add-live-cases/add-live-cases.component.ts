import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LiveCasesService } from '../live-cases.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-add-live-cases',
  templateUrl: './add-live-cases.component.html',
  styleUrls: ['./add-live-cases.component.scss']
})
export class AddLiveCasesComponent implements OnInit {
  form: FormGroup;
  editproduct: any;
  productview = false;
  changename: any;
  changetheproductName: any
  @ViewChild('fileInput') fileInput: ElementRef;
  videoSelect = false;
  apiMainImageSrc: string;
  images: Array<string> = [];
  apiMainImages: Array<string> = [];
  video: string;
  apiVideoUrl: string;
  submitted = false;
  mainImageSrc: string;
  noImage = "assets/noImg.png"
  url = ['test']

  productId: string;
  edit = false;
  view = false;
  uploadEnabled: boolean = true;
  result: any;
  productDetails: any;
  isSave = false;

  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private api: ApiService, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private liveSer: LiveCasesService) {

  }

  ngOnInit(): void {
    this.getCategory();
    this.getOperator();
    this.getInstitutionList();
    this.initializeForm();
    if (!this.productId) {
      this.mainImageSrc = this.noImage;
      this.generateRandomString();
    }
  }
  getInstitutionList(): void {
    this.api.apiGetCall('institute').subscribe((data) => {
      this.instList = data.data;
    })
  }
  getOperator(): void {
    this.api.apiGetCall('operator').subscribe((data) => {
      this.ops = data.data;
    })
  }
  getCategory(): void {
    this.api.apiGetCall('filters').subscribe((data) => {
      this.cat = data.data;
      this.filteredSubCategories=[]

    })
  }

  generateRandomString(): string {
    const characters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    this.result = "";

    for (let i: number = 0; i < 12; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      this.result += characters.charAt(randomIndex);
    }

    return this.result;
  }



  allFiles: any;
  onFileChange(event: any) {
    const files = event.target.files;
    this.imageUpload = files
    if (files.length > 0) {
      const file = files[0];
      if (file) {
        this.handleImageUpload(file);
      }
    }
  }

  handleImageUpload(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (e.target.result.includes('image/')) {
        this.mainImageSrc = e.target.result;
      } else {
        // Handle non-image file (if needed)
      }
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.mainImageSrc = null;
    // If you have additional logic to handle removal, add it here
  }

  clearFileInput() {
    this.fileInput.nativeElement.value = '';
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required], //bc name 
      youtubeUrl: ['', Validators.required],
      desciription: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      // ppt: ['', Validators.required],
      institution: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      duration: ['', Validators.required],
    })
    this.activeRoute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId && this.router.url.includes('edit')) {
        this.edit = true;
        this.getProductDetails(this.liveSer.data);
      } else if (this.router.url.includes('view')) {
        this.view = true;
        this.getProductDetails(this.liveSer.data);
      }

    })
  }

  getProductDetails(data) {
    this.productDetails = data;
    // this.mainImageSrc = data.thumbnail;
    this.mainImageSrc = data.image;
    this.form.controls['title'].setValue(this.productDetails.title);
    this.form.controls['youtubeUrl'].setValue(this.productDetails.youtubeUrl);
    this.form.controls['desciription'].setValue(this.productDetails.desciription);
    this.form.controls['category'].setValue(this.productDetails.category);
    this.form.controls['subCategory'].setValue(this.productDetails.subCategory);
    this.form.controls['institution'].setValue(this.productDetails.institution);
    this.form.controls['date'].setValue(this.productDetails.date);
    this.form.controls['time'].setValue(this.productDetails.time);
    this.form.controls['duration'].setValue(this.productDetails.duration);
    if (this.router.url.includes('view')) {
      this.form.disable();
    }
  }

  discard() {
    if (this.productId) {
      this.form.patchValue(this.productDetails);
    } else {
      this.form.reset();
    }
    this.router.navigate(['/liveCases/list'])
  }


  save() {
    if (this.form.invalid) {
      return
    } else {
      // const formData = new FormData()
      // formData.append('image', this.mainImageSrc)
      // this.api.apiPostCall(formData, 'ImageUpload').subscribe(data => {
      //   if (data.status === true) {
      const payload = {
        "title": this.form.controls['title'].value,
        "youtubeUrl": this.form.controls['youtubeUrl'].value,
        "desciription": this.form.controls['desciription'].value,
        "thumbnail": 'https://api.medstream360.com/image-1702999237801.png',
        "category": this.form.controls['category'].value,
        "subCategory": this.form.controls['subCategory'].value,
        "institution": this.form.controls['institution'].value,
        "date": this.form.controls['date'].value,
        "time": this.form.controls['time'].value,
        "duration": this.form.controls['duration'].value
      }

      if (!this.productId) {
        this.api.apiPostCall(payload, 'schedulecase').subscribe(data => {
          if (data.status == true) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: 'Successfully Saved',
            });
            this.router.navigate(['/liveCases/list'])
          }
        })
      } else {
        this.api.apiPutCall(payload, 'schedulecase' +'/'+ this.productId).subscribe(data => {
          if (data.status == true) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: 'Successfully Updated',
            });
            this.router.navigate(['/liveCases/list'])
          }
        })
      }

      console.log(payload)
      // }
      // })

    }

  }

}

