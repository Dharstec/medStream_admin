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
  mainImageSrc: string='';
  noImage = "assets/noImg.png"
  url = ['test']
 currentDate =new Date()
  productId: string;
  edit = false;
  view = false;
  uploadEnabled: boolean = true;
  result: any;
  productDetails: any;
  isSave = false;
  instList :any;
  ops:any;
  // cat:any;
  category:any;
  filteredSubCategories: string[] = [];
  cat: any = {};
  imageUpload :any;

  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private api: ApiService, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private liveSer: LiveCasesService) {

  }

  async ngOnInit(): Promise<void> {
    this.initializeForm();
    await this.getCategory();
    // this.getOperator();
    this.getInstitutionList();
    this.bindCurrentCaseDtl()
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
  // getOperator(): void {
  //   this.api.apiGetCall('operator').subscribe((data) => {
  //     this.ops = data.data;
  //   })
  // }
  async getCategory() {
    return new Promise(async (resolve, reject) => {
      this.api.apiGetCall('filters').subscribe((data) => {
       this.cat = data.data;
       resolve(true)
     },err => {
       console.error('Error in getting filter api:', err);
       reject(err)
     })
   })
  }

  changeCaseTime(){
    let startTime = this.form.controls['caseStartTime'].value
    let endTime = this.form.controls['caseEndTime'].setValue(startTime)
  
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
      operator_id: [null, Validators.required],
      institution: ['', Validators.required],
      caseStartTime: ['', Validators.required],
      caseEndTime: ['', Validators.required],
      // duration: ['', Validators.required],
    })
  }

  bindCurrentCaseDtl(){
    this.activeRoute.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId && this.router.url.includes('edit')) {
        this.getProductDetails(this.liveSer.data);
        this.edit = true;
      } else if (this.router.url.includes('view')) {
        this.getProductDetails(this.liveSer.data);
        this.view = true;
      }

    })
  }

  async getProductDetails(data) {
    this.productDetails = data;
    this.mainImageSrc = data.thumbnail;
    await this.getOperatorsForInstitution(this.productDetails.institution._id);
    // this.mainImageSrc = data.image;
    this.form.controls['title'].setValue(this.productDetails.title);
    this.form.controls['youtubeUrl'].setValue(this.productDetails.youtubeUrl);
    this.form.controls['desciription'].setValue(this.productDetails.desciription);
    this.form.controls['category'].setValue(this.productDetails.category);
    const selectedCategory = this.cat.category_list.find(category => category.category === this.productDetails.category);
    if (selectedCategory && selectedCategory.subCategory.length > 0) {
      this.filteredSubCategories = selectedCategory.subCategory;
    }
    this.form.controls['subCategory'].setValue(this.productDetails.subCategory);
    this.form.controls['institution'].setValue(this.productDetails.institution._id);
    this.form.controls['operator_id'].setValue(this.productDetails.operator_id);
    this.form.controls['caseStartTime'].setValue(this.productDetails.startTime);
    this.form.controls['caseEndTime'].setValue(this.productDetails.endTime);
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
      return this.submitted=true
    } else {
      this.submitted=false
      const formData = new FormData()
      var payload = {
        "title": this.form.controls['title'].value,
        "youtubeUrl": this.form.controls['youtubeUrl'].value,
        "desciription": this.form.controls['desciription'].value,
        "thumbnail": this.mainImageSrc,
        "category": this.form.controls['category'].value,
        "subCategory": this.form.controls['subCategory'].value,
        "institution": this.form.controls['institution'].value,
        "operator_id": this.form.controls['operator_id'].value,
        "startTime": this.form.controls['caseStartTime'].value,
        "endTime": this.form.controls['caseEndTime'].value,
        "timeZone": localStorage.getItem('userRegion') ?  localStorage.getItem('userRegion') : null,
        // "duration": this.form.controls['duration'].value
      }
      if(this.imageUpload && this.imageUpload.length){
        formData.append('image', this.mainImageSrc)
        this.api.apiPostCall(formData, 'ImageUpload').subscribe(data => {
          if (data.status === true) {
            payload['thumbnail']=data.Image
  
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
              }
        })
      }else{
        this.api.apiPutCall(payload, 'schedulecase' +'/'+ this.productId).subscribe(data => {
          if (data.status == true) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: 'Successfully Updated',
            });
            this.router.navigate(['/liveCases/list'])
          }
        })
      }
    }
  }


  onCategoryChange() {
    const selectedCategoryId = this.form.get('category')?.value;
    const selectedCategory = this.cat.category_list.find(category => category.category === selectedCategoryId);
    if (selectedCategory && selectedCategory.subCategory.length > 0) {
      this.filteredSubCategories = selectedCategory.subCategory;
    } else {
      this.filteredSubCategories = [];
    }
  }

  // ///////////////////
  onInstitutionChange(): void {
    const selectedInstitutionId = this.form.get('institution')?.value;
    if (selectedInstitutionId) {
      // Fetch operators based on the selected institution and update the ops array
      this.getOperatorsForInstitution(selectedInstitutionId);
    } else {
      // Reset the ops array or take any other appropriate action
      this.ops = [];
    }
  }
  async getOperatorsForInstitution(institutionId) {
    // Call your API to get operators based on the selected institution
    // Update the ops array with the fetched operators
    // Example:
    return new Promise(async (resolve, reject) => {
      this.api.apiGetCall(`operatorByInstitute/${institutionId}`).subscribe((data) => {
        this.ops = data.data;
       resolve(true)
     },err => {
       console.error('Error in getting filter api:', err);
       reject(err)
     })
   })
  }
}

