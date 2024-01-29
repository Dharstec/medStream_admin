import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { InstitutionService } from '../institution.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-institution-add',
  templateUrl: './institution-add.component.html',
  styleUrls: ['./institution-add.component.scss']
})
export class InstitutionAddComponent implements OnInit {
  form: FormGroup;
  editproduct: any;
  productview = false;
  changename: any;
  changetheproductName: any
  @ViewChild('fileInput') fileInput: ElementRef;
  videoSelect = false;
  mainImageSrc: string;
  apiMainImageSrc: string;
  images: Array<string> = [];
  apiMainImages: Array<string> = [];
  video: string;
  apiVideoUrl: string;
  submitted = false;
  noImage = "assets/noImg.png"
  productId: string;
  edit = false;
  view = false;
  uploadEnabled: boolean = true;
  result: any;
  productDetails: any;
  isSave = false;

  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private api: ApiService, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private insSer: InstitutionService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    if (!this.productId) {
      this.mainImageSrc = this.noImage;
    }
  }


  getInstitutionDet(data) {
    this.productDetails = data;
    this.mainImageSrc = data.image;
    this.form.controls['name'].setValue(this.productDetails.name);
    this.form.controls['city'].setValue(this.productDetails.city);
    this.form.controls['country'].setValue(this.productDetails.country);
    this.form.controls['location'].setValue(this.productDetails.location);
    this.form.controls['description'].setValue(this.productDetails.description);
    this.form.controls['address'].setValue(this.productDetails.address);
    if (this.router.url.includes('view')) {
      this.form.disable();
    }
  }
  allFiles: any;
  // onFileChange(event: any) {
  //   const files = event.target.files;
  //   if (files.length > 0) {
  //     const file = files[0];
  //     if (file) {
  //       this.handleImageUpload(file);
  //     }
  //   }
  // }
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
      name: ['', Validators.required], //bc name 
      city: ['', Validators.required],
      country: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      // operator: ['', Validators.required],
    })
    this.activeRoute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId && this.router.url.includes('edit')) {
        this.edit = true;
        this.getInstitutionDet(this.insSer.data);
      } else if (this.router.url.includes('view')) {
        this.view = true;
        this.getInstitutionDet(this.insSer.data);
      }

    })

  }

  discard() {
    if (this.productId) {
      this.form.patchValue(this.productDetails);
    } else {
      this.form.reset();
    }
    this.router.navigate(['/institution/list'])
  }


  save() {
    if (this.form.invalid) {
      return
    } else {
      console.log("valid form ")
      const formData = new FormData()
      formData.append('image', this.imageUpload[0])
      this.api.apiPostCall(formData, 'ImageUpload').subscribe(data => {
        if (data.status === true) {
          const payload = {
            "name": this.form.controls['name'].value,
            "city": this.form.controls['city'].value,
            "country": this.form.controls['country'].value,
            "image": data.Image,
            "location": this.form.controls['location'].value,
            "description": this.form.controls['description'].value,
            "address": this.form.controls['address'].value,
          }

      if (!this.productId) {
        this.api.apiPostCall(payload, 'institute').subscribe(data => {
          if (data.status == true) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: 'Successfully Saved',
            });
            this.router.navigate(['/institution/list'])
          }
        })
      } else {
        this.api.apiPutCall(payload, 'institute' +'/'+ this.productId).subscribe(data => {
          if (data.status == true) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: 'Successfully Updated',
            });
            this.router.navigate(['/institution/list'])
          }
        })
      }

      console.log(payload)
      }
      })

    }

  }

}

