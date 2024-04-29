import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { ExpertsService } from '../experts.service';

@Component({
  selector: 'app-experts-add',
  templateUrl: './experts-add.component.html',
  styleUrls: ['./experts-add.component.scss']
})
export class ExpertsAddComponent implements OnInit {
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
  types: string[] = [
    "Male",
    "Female",
    "Neutral"
  ];
  category = [
    "Anklets",
    "Bracelets",
    "Earrings",
    "Necklace",
    "Nose Pins",
    "Pendant",
    "Rings",
    "Jewellery Set",
    "Toe Rings"
  ]
  stone = [
    'LOréal',
    'Maybelline',
    'MAC',
    'Lakme',
    'Wella',
    'Toni & Guy',
    'TRESemmé',
    'Renee'
  ]
  color = [
    "Gold", "Oxidised Silver", "Rose Gold", "Silver"
  ]
  designation = [
    "Doctor", "Cardiologist", "Yoga Teacher", "Heart Specialist"
  ]
  collections = [
    "Diwali", "New Year", "Mother's Day", "Christmas", "Raksha Bandhan", "Eid", "Holi", "Durga pooja", ""
  ]
  productId: string;
  edit = false;
  view = false;
  uploadEnabled: boolean = true;
  result: any;
  experDet: any;
  isSave = false;
  instList: any;

  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private api: ApiService, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private expSer: ExpertsService) {

  }

  ngOnInit(): void {
    this.getInstitutionList();
    this.initializeForm();
    if (!this.productId) {
      this.mainImageSrc = this.noImage;
    }
  }


  getExpertDet(data) {
    this.experDet = data;
    this.form.controls['name'].setValue(this.experDet.name);
    this.form.controls['institution'].setValue(this.experDet.institution);
    this.form.controls['designation'].setValue(this.experDet.designation);
    this.form.controls['introduction'].setValue(this.experDet.introduction);
    this.mainImageSrc = this.experDet?.image;
    if (this.router.url.includes('view')) {
      this.form.disable();
    }
  }
  allFiles: any;
  onFileChange(event: any) {
    const files = event.target.files;
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
  getInstitutionList(): void {
    this.api.apiGetCall('institute').subscribe((data) => {
      this.instList = data.data;
    })
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required], //bc name 
      designation: ['', Validators.required],
      introduction: ['', Validators.required],
      institution: ['', Validators.required],
    })
    this.activeRoute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId && this.router.url.includes('edit')) {
        this.edit = true;
        this.getExpertDet(this.expSer.data);
      } else if (this.router.url.includes('view')) {
        this.view = true;
        this.getExpertDet(this.expSer.data);
      }
    })
  }

  discard() {
    if (this.productId) {
      this.form.patchValue(this.experDet);
    } else {
      this.form.reset();
    }
    this.router.navigate(['/experts/list'])
  }


  save() {
    if (this.form.invalid) {
      return
    } else {
      // const formData = new FormData()
      // formData.append('image', this.mainImageSrc)
      // formData.append('key', 'experts')
      // this.api.apiPostCall(formData, 'ImageUpload').subscribe(data => {
      //   if (data.status === true) {
      const payload = {
        "name": this.form.controls['name'].value,
        "institution": this.form.controls['institution'].value,
        "designation": this.form.controls['designation'].value,
        "introduction": this.form.controls['introduction'].value,
        "image": 'https://api.medstream360.com/image-1702999237801.png',
      }

      if (!this.productId) {
        this.api.apiPostCall(payload, 'experts').subscribe(data => {
          if (data.status == true) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: 'Successfully Saved',
            });
            this.router.navigate(['/experts/list'])
          }
        })
      } else {
        this.api.apiPutCall(payload, 'experts' +'/'+ this.productId).subscribe(data => {
          if (data.status == true) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: 'Successfully Updated',
            });
            this.router.navigate(['/experts/list'])
          }
        })
      }

      console.log(payload)
      // }
      // })

    }
  }

}

