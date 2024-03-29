import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SnackbarComponent } from 'src/app/shared-module/snackbar/snackbar.component';
import { AllCasesService } from '../all-cases.service';

@Component({
  selector: 'app-add-all-cases',
  templateUrl: './add-all-cases.component.html',
  styleUrls: ['./add-all-cases.component.scss']
})
export class AddAllCasesComponent implements OnInit {
  form: FormGroup;
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

  caseId: string;
  edit = false;
  view = false;
  uploadEnabled: boolean = true;
  result: any;
  caseDetails: any;
  isSave = false;
  // ///////////////////
  instList :any;
  ops:any;
  cat:any;
  category:any;
  filteredSubCategories: string[] = [];
  categoryList: any ={}
  imageUpload :any;
  caseOfTheWeekList=["Yes","No"]
  textName = ''

  constructor(private router: Router, private formBuilder: UntypedFormBuilder, private api: ApiService, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private allSer: AllCasesService) {
      this.textName = this.router.url.includes('view') ? 'View' :  this.router.url.includes('edit') ? 'Edit' : 'Add'
  }

  async ngOnInit(): Promise<void> {
    this.initializeForm();
    await this.getCategory();
    // this.getOperator();
    this.getInstitutionList();
    this.bindCaseDetail()
    if (!this.caseId) {
      this.mainImageSrc = this.noImage;
      this.generateRandomString();
    }
  }
  getInstitutionList(): void {
    this.api.apiGetCall('institute').subscribe((data) => {
      this.instList = data.data;
    })
  }
  // getOperator() {
  //   return this.api.apiGetCall('operator').subscribe((data) => {
  //     this.ops = data.data;
  //     // this.getOperatorsForInstitution(selectedInstitutionId);
  //   })
  // }
  getCategory() {
    return new Promise(async (resolve, reject) => {
       this.api.apiGetCall('filters').subscribe((data) => {
        this.categoryList = data.data;
        resolve(true)
      },err => {
        console.error('Error in getting filter api:', err);
        reject(err)
      })
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
      weekNo: ['', Validators.required],
      month: ['', Validators.required],
      caseOfTheWeek: ['', Validators.required],
      operator: ['',Validators.required],
      year: ['',Validators.required]
    })
  }

  bindCaseDetail(){
    this.activeRoute.paramMap.subscribe(params => {
      this.caseId = params.get('id');
      if (this.caseId && this.router.url.includes('edit')) {
        this.edit = true;
        this.getCaseDetails(this.allSer.data);
      } else if (this.router.url.includes('view')) {
        this.view = true;
        this.getCaseDetails(this.allSer.data);
      }

    })
  }

  async getCaseDetails(data) {
    this.caseDetails = data;
    this.mainImageSrc = data.thumbnail;
    if (this.router.url.includes('view')) {
      this.form.disable();
    }
    await this.getOperatorsForInstitution(this.caseDetails.institution._id);
    // console.log("currentcaseDetails",this.caseDetails)
    this.form.controls['title'].setValue(this.caseDetails.title);
    this.form.controls['youtubeUrl'].setValue(this.caseDetails.youtubeUrl);
    this.form.controls['desciription'].setValue(this.caseDetails.desciription);
    this.form.controls['category'].setValue(this.caseDetails.category);
    const selectedCategory = this.categoryList.category_list.find(category => category.category === this.caseDetails.category);
    if (selectedCategory && selectedCategory.subCategory.length > 0) {
      this.filteredSubCategories = selectedCategory.subCategory;
    }
    this.form.controls['subCategory'].setValue(this.caseDetails.subCategory);
    this.form.controls['institution'].setValue(this.caseDetails.institution._id);
    this.form.controls['weekNo'].setValue(this.caseDetails.weekNo);
    this.form.controls['month'].setValue(this.caseDetails.month);
    this.form.controls['caseOfTheWeek'].setValue(this.caseDetails.caseOfTheWeek);
    this.form.controls['operator'].setValue(this.caseDetails.operator_id);
    this.form.controls['year'].setValue(this.caseDetails.year);
    // console.log("--------",this.form)
    // if (this.router.url.includes('view')) {
    //      this.form.disable();
    // }
  }

  discard() {
    if (this.caseId) {
      this.form.patchValue(this.caseDetails);
    } else {
      this.form.reset();
    }
    this.router.navigate(['/allCases/list'])
  }

  
  save() {

    if (this.form.invalid) {
      console.log("invalid form ", this.form.controls)
      this.submitted=true
      // return this.snackbar.openFromComponent(SnackbarComponent, {
      //   data: 'Enter the valid values',
      // });
      // return
    } else {
      console.log("valid form ")
      this.submitted=false
      const formData = new FormData()
      var payload = {
        "title": this.form.controls['title'].value,
        "youtubeUrl": this.form.controls['youtubeUrl'].value,
        "desciription": this.form.controls['desciription'].value,
        "filepath": this.mainImageSrc,
        "thumbnail": this.mainImageSrc,
        "category": this.form.controls['category'].value,
        "subCategory": this.form.controls['subCategory'].value,
        "institution": this.form.controls['institution'].value,
        "weekNo": this.form.controls['weekNo'].value,
        "month": this.form.controls['month'].value,
        "caseOfTheWeek": this.form.controls['caseOfTheWeek'].value,
        "operator_id": this.form.controls['operator'].value,
        "year":this.form.controls['year'].value,
        "liveStatus":false
      }
      if(this.imageUpload && this.imageUpload.length){
        formData.append('image', this.imageUpload[0])
        this.api.apiPostCall(formData, 'ImageUpload').subscribe(data => {
          if (data.status === true) {
         payload ['filepath']=data.Image
         payload ['thumbnail']=data.Image
        if (!this.caseId) {
          this.api.apiPostCall(payload, 'allcase').subscribe(data => {
            if (data.status == true) {
              this.snackbar.openFromComponent(SnackbarComponent, {
                data: 'Successfully Saved',
              });
              this.router.navigate(['/allCases/list'])
            }else{
              this.snackbar.openFromComponent(SnackbarComponent, {
                data: data.message //'Successfully Updated',
              });
            }
          })
        } else {
          this.api.apiPutCall(payload, 'allcase' +'/'+ this.caseId).subscribe(data => {
            if (data.status == true) {
              this.snackbar.openFromComponent(SnackbarComponent, {
                data:  data.message //'Successfully Updated',
              });
              this.router.navigate(['/allCases/list'])
            }else{
              this.snackbar.openFromComponent(SnackbarComponent, {
                data: data.message //'Successfully Updated',
              });
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
        this.api.apiPutCall(payload, 'allcase' +'/'+ this.caseId).subscribe(data => {
          if (data.status == true) {
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: data.message //'Successfully Updated',
            });
            this.router.navigate(['/allCases/list'])
          }else{
            this.snackbar.openFromComponent(SnackbarComponent, {
              data: data.message //'Successfully Updated',
            });
          }
        })
      }
     
    }
  }

  onCategoryChange() {
    const selectedCategoryId = this.form.get('category')?.value;
    // console.log("---",this.categoryList)
    const selectedCategory = this.categoryList.category_list.find(category => category.category === selectedCategoryId);
    if (selectedCategory && selectedCategory.subCategory.length > 0) {
      this.filteredSubCategories = selectedCategory.subCategory;
    } else {
      this.filteredSubCategories = [];
    }
  }

  // ///////////////////
  // onInstitutionChange(): void {
  //   const selectedInstitutionId = this.form.get('institution')?.value;
  //   const selectedInstitution = this.instList.find((institution: any) => institution._id === selectedInstitutionId);
  
  //   if (selectedInstitution) {
  //     this.getOperatorsForInstitution(selectedInstitutionId);
  //   } else {
  //     this.ops = [];
  //   }
  // }
  onInstitutionChange(): void {
    const selectedInstitutionId = this.form.get('institution')?.value;
    if (selectedInstitutionId) {
      // Fetch operators based on the selected institution and update the ops array
      this.getOperatorsForInstitution(selectedInstitutionId);
    } else {
      this.ops = [];
    }
  }
  async getOperatorsForInstitution(institutionId) {
    // Call your API to get operators based on the selected institution
    // Update the ops array with the fetched operators
    // Example:
    return new Promise((resolve, reject) => {
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

