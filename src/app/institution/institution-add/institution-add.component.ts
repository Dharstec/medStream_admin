import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { InstitutionService } from '../institution.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-institution-add',
  templateUrl: './institution-add.component.html',
  styleUrls: ['./institution-add.component.scss']
})
export class InstitutionAddComponent implements OnInit {
  form: FormGroup;
  changetheproductName: any
  @ViewChild('fileInput') fileInput: ElementRef;
  videoSelect = false;
  mainImageSrc: string='';
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
  imageUpload :any;

  continentList=[
    {"name":"Africa"},
    {"name":"Asia"},
    {"name":"Australia"},
    {"name":"Europe"},
    {"name":"North America"},
    {"name":"South America"}
  ]

  textName =''

  
  constructor(private router: Router,
    private spinner:NgxSpinnerService,
     private formBuilder: UntypedFormBuilder, private api: ApiService, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private insSer: InstitutionService) {
    this.textName = this.router.url.includes('view') ? 'View' :  this.router.url.includes('edit') ? 'Edit' : 'Add'
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
    this.form.controls['continent'].setValue(this.productDetails.continent);
    this.form.controls['lng'].setValue(this.productDetails.lng);
    this.form.controls['lat'].setValue(this.productDetails.lat);
    this.form.controls['location'].setValue(this.productDetails.location);
    this.form.controls['description'].setValue(this.productDetails.description);
    this.form.controls['address'].setValue(this.productDetails.address);
    if (this.router.url.includes('view')) {
      this.form.disable();
    }
    this.spinner.hide()
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
      continent: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      // operator: ['', Validators.required],
    })
    this.activeRoute.paramMap.subscribe(params => {
      this.spinner.show()
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

  callGoogleApi(){
  //  let loc = this.form.get('location').value
   let body={
    "name":this.form.get('name').value,
    "country":this.form.get('country').value
   }
   if(this.form.get('name').value && this.form.get('country').value){
    this.api.apiPostCall(body,`getLngLat`).subscribe((data:any) => {
      let response= data.data.results
      console.log('geolocation',response)
      if(response.length){
        this.form.get('lat').setValue(response[0].geometry.location.lat)
        this.form.get('lng').setValue(response[0].geometry.location.lng)
      }else{
        this.form.get('lat').setValue(null)
        this.form.get('lng').setValue(null)
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: 'Location Not Found.',
        });
      }
    })
   }else{
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: 'Please enter the valid fields',
    });
   }
  }


  save() {
    // console.log("---",this.imageUpload,this.mainImageSrc)
    if (this.form.invalid) {
      this.submitted=true
      // console.log("---",this.form)
      return
    } else {
      this.submitted=false
      // console.log("valid form ",this.imageUpload,this.mainImageSrc,this.productId)
      const formData = new FormData()
      var payload = {
        "name": this.form.controls['name'].value,
        "city": this.form.controls['city'].value,
        "country": this.form.controls['country'].value,
        "continent": this.form.controls['continent'].value,
        "lat": this.form.controls['lat'].value.toString(),
        "lng": this.form.controls['lng'].value.toString(),
        "image": this.mainImageSrc,
        "location": this.form.controls['location'].value,
        "description": this.form.controls['description'].value,
        "address": this.form.controls['address'].value,
      }
      if(this.imageUpload && this.imageUpload.length){
        formData.append('image', this.imageUpload[0])
        formData.append('key', 'institutes')
        this.api.apiPostCall(formData, 'ImageUpload').subscribe(data => {
          if (data.status === true) {
             payload['image'] = data.Image
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
      }else{
          this.api.apiPutCall(payload, 'institute' +'/'+ this.productId).subscribe(data => {
            if (data.status == true) {
              this.snackbar.openFromComponent(SnackbarComponent, {
                data: 'Successfully Updated',
              });
              this.router.navigate(['/institution/list'])
            }
          })
  
        console.log(payload)
      }
    

    }

  }

}

