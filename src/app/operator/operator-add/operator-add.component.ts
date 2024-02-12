import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { OperatorService } from '../operator.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';

@Component({
  selector: 'app-operator-add',
  templateUrl: './operator-add.component.html',
  styleUrls: ['./operator-add.component.scss']
})
export class OperatorAddComponent implements OnInit {
  form: FormGroup;
  editproduct: any;
  productview = false;
  changename: any;
  changetheproductName: any
  @ViewChild('fileInput') fileInput: ElementRef;
  videoSelect = false;
  mainImageSrc: string;
  video: string;
  apiVideoUrl: string;
  submitted = false;
  noImage = "assets/noImg.png"
  designation = [
    "Doctor", "Cardiologist", "Yoga Teacher", "Heart Specialist"
  ]
  productId: string;
  edit = false;
  view = false;
  uploadEnabled: boolean = true;
  result: any;
  operatorsDet: any;
  isSave = false;
  instList: any;
  imageUpload: any

  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private api: ApiService, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private opeSer: OperatorService) {

  }

  ngOnInit(): void {
    this.getInstitutionList();

    this.initializeForm();
    if (!this.productId) {
      this.mainImageSrc = this.noImage;
    }
  }

  getOperatorDet(data) {
    this.operatorsDet = data;
    this.mainImageSrc = this.operatorsDet?.avatar;
    this.form.controls['name'].setValue(this.operatorsDet.name);
    this.form.controls['institution'].setValue(this.operatorsDet.institution._id);
    this.form.controls['designation'].setValue(this.operatorsDet.designation);
    this.form.controls['introduction'].setValue(this.operatorsDet.introduction);
    // this.form.controls['email'].setValue(this.operatorsDet.email);
    this.form.controls['fb'].setValue(this.operatorsDet.social_media_link.fb);
    this.form.controls['insta'].setValue(this.operatorsDet.social_media_link.insta);
    this.form.controls['x'].setValue(this.operatorsDet.social_media_link.x);
    this.form.controls['li'].setValue(this.operatorsDet.social_media_link.li);

    if (this.router.url.includes('view')) {
      this.form.disable();
    }

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

  getInstitutionList(): void {
    this.api.apiGetCall('institute').subscribe((data) => {
      this.instList = data.data;
    })
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
      designation: ['', Validators.required],
      introduction: ['', Validators.required],
      institution: ['', Validators.required],
      fb: [''],
      insta: [''],
      x: [''],
      li: [''],
    })

    this.activeRoute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId && this.router.url.includes('edit')) {
        this.edit = true;
        this.getOperatorDet(this.opeSer.data);
      } else if (this.router.url.includes('view')) {
        this.view = true;
        this.getOperatorDet(this.opeSer.data);
      }

    })
  }

  discard() {
    if (this.productId) {
      this.form.patchValue(this.operatorsDet);
    } else {
      this.form.reset();
    }
    this.router.navigate(['/operator/list'])
  }


  save() {
    if (this.form.invalid) {
      this.submitted=true
      // console.log("invalid form ", this.form.controls)
      // return this.snackbar.openFromComponent(SnackbarComponent, {
      //   data: 'Enter the valid values',
      // });
    } else {
      console.log("valid form ")
      this.submitted=false
      const formData = new FormData()
      var payload: any = {
        "name": this.form.controls['name'].value,
        "institution": this.form.controls['institution'].value,
        "designation": this.form.controls['designation'].value,
        "introduction": this.form.controls['introduction'].value,
        "image": this.mainImageSrc,
        "social_media_link": {
          "fb": this.form.controls['fb'].value,
          "insta": this.form.controls['insta'].value,
          "x": this.form.controls['x'].value,
          "li": this.form.controls['li'].value
        }
      }
      if(this.imageUpload && this.imageUpload.length){
        formData.append('image', this.imageUpload[0])
        this.api.apiPostCall(formData, 'ImageUpload').subscribe(data => {
          if (data.status === true) {
            payload['image']=data.Image
            if (!this.productId) {
              this.api.apiPostCall(payload, 'operator').subscribe(data => {
                if (data.status == true) {
                  this.snackbar.openFromComponent(SnackbarComponent, {
                    data: 'Successfully Saved',
                  });
                  this.router.navigate(['/operator/list'])
                }
              })
            } else {
              this.api.apiPutCall(payload, 'operator' + '/' + this.productId).subscribe(data => {
                if (data.status == true) {
                  this.snackbar.openFromComponent(SnackbarComponent, {
                    data: 'Successfully Updated',
                  });
                  this.router.navigate(['/operator/list'])
                }
              })
            }
          } else {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: 'Failed to upload image',
            });
          }
        })
      }else{
        this.api.apiPutCall(payload, 'operator' + '/' + this.productId).subscribe(data => {
          if (data.status == true) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: 'Successfully Updated',
            });
            this.router.navigate(['/operator/list'])
          }
        })
      }
    }
  }


}

