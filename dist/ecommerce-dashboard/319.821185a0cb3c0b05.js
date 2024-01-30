"use strict";(self.webpackChunkecommerce_dashboard=self.webpackChunkecommerce_dashboard||[]).push([[319],{4319:(At,b,a)=>{a.r(b),a.d(b,{LiveCasesModule:()=>qt});var p=a(6895),u=a(671),L=a(7766),g=a(5259),t=a(4650),T=a(9625),O=a(5938),y=a(7009),d=a(8729);let q=(()=>{class e{constructor(){}static#t=this.\u0275fac=function(o){return new(o||e)};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var U=a(7392),I=a(1572),D=a(6308),M=a(266);function N(e,r){1&e&&(t.TgZ(0,"th",25)(1,"span"),t._uU(2,"S.No"),t.qZA()())}function w(e,r){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Oqu(i._id)}}function P(e,r){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Title"),t.qZA()())}function S(e,r){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Oqu(i.title)}}function Y(e,r){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Category"),t.qZA()())}function k(e,r){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Oqu(i.category)}}function Q(e,r){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Sub Category"),t.qZA()())}function J(e,r){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Oqu(null==i?null:i.subCategory)}}function F(e,r){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Institution"),t.qZA()())}function V(e,r){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Oqu(i.institution)}}function j(e,r){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Week No"),t.qZA()())}function H(e,r){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Oqu(i.duration)}}function z(e,r){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Month"),t.qZA()())}function R(e,r){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=r.$implicit;t.xp6(1),t.Oqu(i.time)}}function B(e,r){1&e&&(t.TgZ(0,"th",28)(1,"span"),t._uU(2,"Action"),t.qZA()())}function $(e,r){if(1&e){const i=t.EpF();t.TgZ(0,"td",26)(1,"div",29)(2,"mat-icon",30),t.NdJ("click",function(){const s=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.edit("edit",s._id,s))}),t._uU(3,"edit"),t.qZA(),t.TgZ(4,"mat-icon",31),t.NdJ("click",function(){const s=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.delete(s._id))}),t._uU(5,"delete"),t.qZA(),t.TgZ(6,"mat-icon",32),t.NdJ("click",function(){const s=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.edit("view",s._id,s))}),t._uU(7,"visibility"),t.qZA()()()}}function G(e,r){1&e&&t._UZ(0,"tr",33)}function E(e,r){1&e&&t._UZ(0,"tr",34)}function K(e,r){1&e&&(t.TgZ(0,"div",35),t._UZ(1,"mat-spinner",36),t.qZA()),2&e&&(t.xp6(1),t.Q6J("diameter",50))}function X(e,r){1&e&&(t.TgZ(0,"div",37)(1,"p",38),t._uU(2),t.qZA()()),2&e&&(t.xp6(2),t.Oqu("No data available"))}let W=(()=>{class e{constructor(i,o,n,s,c){this.api=i,this.dialog=o,this.snackbar=n,this.router=s,this.liveSer=c,this.dataSource=new u.by([]),this.columnsToDisplay=["s.no","title","category","subCategory","inst","week","month","action"],this.noData=!1}ngOnInit(){this.getLiveCasesList()}edit(i,o,n){this.liveSer.data=n,this.router.navigate(["/liveCases/"+i,o])}getLiveCasesList(){this.api.apiGetCall("schedulecase").subscribe(i=>{this.liveCasesList=i.data,this.dataSource.data=i.data.sort((o,n)=>Date.parse(n.createdAt)-Date.parse(o.createdAt)),i.data?.length||(this.noData=!0)})}delete(i){this.dialog.open(L.$,{width:"250px",data:{from:"delete"}}).afterClosed().subscribe(n=>{n&&this.api.apiDeleteCall(i,"schedulecase").subscribe(s=>{s.message.includes("Schedule Case Video deleted successfully")&&(this.snackbar.openFromComponent(g.h,{data:s.message}),this.getLiveCasesList())})})}applyFilter(i){this.dataSource.filter=i.trim().toLowerCase()}applyTypeFilter(){this.selectedColourValue?.length||this.selectedValue?.length?this.filteredData=this.dataSource.data.filter(i=>!(this.selectedValue?.length&&!this.selectedValue?.includes(i.category[0])||this.selectedColourValue?.length&&!this.selectedColourValue?.includes(i.colour[0]))):(this.filteredData=[],this.dataSource.data=this.liveCasesList)}static#t=this.\u0275fac=function(o){return new(o||e)(t.Y36(T.s),t.Y36(O.uw),t.Y36(y.ux),t.Y36(d.F0),t.Y36(q))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-live-list"]],decls:39,vars:6,consts:[[1,"container"],[1,"card"],[1,"row",2,"display","flex","flex-direction","row","align-items","center"],[1,"section-b","col-md-3"],["type","text","name","Search","placeholder","Search...",1,"input","m-3",3,"keyup"],[1,"col-md-6",2,"display","flex","justify-content","flex-start","gap","10px"],[1,"add-coupon","col-md-3"],["routerLink","/liveCases/add"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","s.no"],["class","first","mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","title"],["mat-header-cell","",4,"matHeaderCellDef"],["matColumnDef","category"],["matColumnDef","subCategory"],["matColumnDef","inst"],["matColumnDef","week"],["matColumnDef","month"],["matColumnDef","action"],["class","last","mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","spinner-container",4,"ngIf"],["class","no_data",4,"ngIf"],["mat-header-cell","",1,"first"],["mat-cell",""],["mat-header-cell",""],["mat-header-cell","",1,"last"],[1,"displayicon"],["matTooltip","Edit",2,"font-size","18px","cursor","pointer",3,"click"],["matTooltip","Delete",2,"font-size","18px","cursor","pointer",3,"click"],["matTooltip","View",2,"font-size","18px","cursor","pointer",3,"click"],["mat-header-row",""],["mat-row",""],[1,"spinner-container"],[3,"diameter"],[1,"no_data"],[2,"color","white"]],template:function(o,n){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"input",4),t.NdJ("keyup",function(c){return n.applyFilter(c.target.value)}),t.qZA()(),t._UZ(5,"div",5),t.TgZ(6,"div",6)(7,"a",7),t._uU(8),t.qZA()()()(),t.TgZ(9,"div",1)(10,"table",8),t.ynx(11,9),t.YNc(12,N,3,0,"th",10),t.YNc(13,w,2,1,"td",11),t.BQk(),t.ynx(14,12),t.YNc(15,P,3,0,"th",13),t.YNc(16,S,2,1,"td",11),t.BQk(),t.ynx(17,14),t.YNc(18,Y,3,0,"th",13),t.YNc(19,k,2,1,"td",11),t.BQk(),t.ynx(20,15),t.YNc(21,Q,3,0,"th",13),t.YNc(22,J,2,1,"td",11),t.BQk(),t.ynx(23,16),t.YNc(24,F,3,0,"th",13),t.YNc(25,V,2,1,"td",11),t.BQk(),t.ynx(26,17),t.YNc(27,j,3,0,"th",13),t.YNc(28,H,2,1,"td",11),t.BQk(),t.ynx(29,18),t.YNc(30,z,3,0,"th",13),t.YNc(31,R,2,1,"td",11),t.BQk(),t.ynx(32,19),t.YNc(33,B,3,0,"th",20),t.YNc(34,$,8,0,"td",11),t.BQk(),t.YNc(35,G,1,0,"tr",21),t.YNc(36,E,1,0,"tr",22),t.qZA(),t.YNc(37,K,2,1,"div",23),t.YNc(38,X,3,1,"div",24),t.qZA()()),2&o&&(t.xp6(8),t.hij("+\xa0","Add New Scheduled Cases",""),t.xp6(2),t.Q6J("dataSource",null!=n.filteredData&&n.filteredData.length?n.filteredData:n.dataSource),t.xp6(25),t.Q6J("matHeaderRowDef",n.columnsToDisplay),t.xp6(1),t.Q6J("matRowDefColumns",n.columnsToDisplay),t.xp6(1),t.Q6J("ngIf",!(null!=n.dataSource.data&&n.dataSource.data.length||n.noData)),t.xp6(1),t.Q6J("ngIf",!(null!=n.dataSource.data&&n.dataSource.data.length)&&n.noData))},dependencies:[p.O5,U.Hw,I.Ou,D.YE,u.BZ,u.fO,u.as,u.w1,u.Dz,u.nj,u.ge,u.ev,u.XQ,u.Gk,M.gM,d.rH],styles:[".section-b[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]{padding:15px;border:none;border-radius:10px;background:#111111;color:#fff;width:100%;border:#111111;line-height:24px}.add-coupon[_ngcontent-%COMP%]{font-size:16px}.add-coupon[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-weight:500;color:#fff;text-decoration:none}.no_data[_ngcontent-%COMP%]{font-size:16px;font-weight:500}.card[_ngcontent-%COMP%]{background-color:#2e2e2e;height:90%;border-radius:10px;box-shadow:0 2px 5px #0000001a;padding:5px;text-align:center;margin:10px}.disFlex[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.disFlex[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]{position:relative}.disFlex[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   .normal-search[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]{border:none;height:2.375rem;padding-left:2.5rem;padding-right:1.25rem;background-color:#f3f3f9;box-shadow:none;border-radius:1.875rem;outline:0}.disFlex[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   .normal-search[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%]{position:absolute;font-size:1rem;line-height:2.375rem;left:.813rem;top:0;color:#74788d}.mat-table[_ngcontent-%COMP%]{width:100%}.displayicon[_ngcontent-%COMP%]{display:flex}.first[_ngcontent-%COMP%]{border-bottom-left-radius:15px;border-top-left-radius:15px}.last[_ngcontent-%COMP%]{border-bottom-right-radius:15px;border-top-right-radius:15px}"]})}return e})(),tt=(()=>{class e{constructor(){}ngOnInit(){}static#t=this.\u0275fac=function(o){return new(o||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-live-cases"]],decls:1,vars:0,template:function(o,n){1&o&&t._UZ(0,"router-outlet")},dependencies:[d.lC]})}return e})();var l=a(4006),et=a(2158),it=a(3238),nt=a(4859),A=a(9549),ot=a(4144),rt=a(4385);const at=["fileInput"];function st(e,r){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Title is required"))}function lt(e,r){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("URL is required"))}function ct(e,r){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.hij("","Description is required"," "))}function ut(e,r){1&e&&(t.TgZ(0,"p",40),t._uU(1,"Upload Thumbnail"),t.qZA())}function dt(e,r){if(1&e&&(t.TgZ(0,"mat-option",41),t._uU(1),t.qZA()),2&e){const i=r.$implicit;t.Q6J("value",i),t.xp6(1),t.Oqu(i)}}function pt(e,r){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Category is required"))}function mt(e,r){if(1&e&&(t.TgZ(0,"mat-option",41),t._uU(1),t.qZA()),2&e){const i=r.$implicit;t.Q6J("value",i),t.xp6(1),t.Oqu(i)}}function gt(e,r){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Sub category is required"))}function ft(e,r){if(1&e&&(t.TgZ(0,"mat-option",41),t._uU(1),t.qZA()),2&e){const i=r.$implicit;t.Q6J("value",i),t.xp6(1),t.Oqu(i)}}function ht(e,r){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Institution is required"))}function _t(e,r){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Date is required"))}function Ct(e,r){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Time is required"))}function vt(e,r){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Duration is required"))}function xt(e,r){if(1&e){const i=t.EpF();t.TgZ(0,"button",46),t.NdJ("click",function(){t.CHM(i);const n=t.oxw(2);return t.KtG(n.save())}),t._uU(1),t.ALo(2,"uppercase"),t.qZA()}if(2&e){const i=t.oxw(2);t.Q6J("disabled",i.isSave),t.xp6(1),t.Oqu(t.lcZ(2,2,"Save"))}}function Zt(e,r){if(1&e){const i=t.EpF();t.TgZ(0,"button",47),t.NdJ("click",function(){t.CHM(i);const n=t.oxw(2);return t.KtG(n.save())}),t._uU(1),t.ALo(2,"uppercase"),t.qZA()}2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Update")))}function bt(e,r){if(1&e){const i=t.EpF();t.TgZ(0,"div",42)(1,"button",43),t.NdJ("click",function(){t.CHM(i);const n=t.oxw();return t.KtG(n.discard())}),t._uU(2),t.ALo(3,"uppercase"),t.qZA(),t.YNc(4,xt,3,4,"button",44),t.YNc(5,Zt,3,3,"button",45),t.qZA()}if(2&e){const i=t.oxw();t.xp6(2),t.Oqu(t.lcZ(3,3,"Discard")),t.xp6(2),t.Q6J("ngIf",!i.edit),t.xp6(1),t.Q6J("ngIf",i.edit)}}let f=(()=>{class e{constructor(i,o,n,s,c,m){this.router=i,this.formBuilder=o,this.api=n,this.snackbar=s,this.activeRoute=c,this.liveSer=m,this.productview=!1,this.videoSelect=!1,this.images=[],this.apiMainImages=[],this.submitted=!1,this.noImage="assets/noImg.png",this.url=["test"],this.edit=!1,this.view=!1,this.uploadEnabled=!0,this.isSave=!1}ngOnInit(){this.initializeForm(),this.productId||(this.mainImageSrc=this.noImage,this.generateRandomString())}generateRandomString(){const i="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";this.result="";for(let o=0;o<12;o++){const n=Math.floor(Math.random()*i.length);this.result+=i.charAt(n)}return this.result}onFileChange(i){const o=i.target.files;if(o.length>0){const n=o[0];n&&this.handleImageUpload(n)}}handleImageUpload(i){const o=new FileReader;o.onload=n=>{n.target.result.includes("image/")&&(this.mainImageSrc=n.target.result)},o.readAsDataURL(i)}removeImage(){this.mainImageSrc=null}clearFileInput(){this.fileInput.nativeElement.value=""}initializeForm(){this.form=this.formBuilder.group({title:["",l.kI.required],youtubeUrl:["",l.kI.required],desciription:["",l.kI.required],category:["",l.kI.required],subCategory:["",l.kI.required],institution:["",l.kI.required],date:["",l.kI.required],time:["",l.kI.required],duration:["",l.kI.required]}),this.activeRoute.paramMap.subscribe(i=>{this.productId=i.get("id"),this.productId&&this.router.url.includes("edit")?(this.edit=!0,this.getProductDetails(this.liveSer.data)):this.router.url.includes("view")&&(this.view=!0,this.getProductDetails(this.liveSer.data))})}getProductDetails(i){this.productDetails=i,this.mainImageSrc=i.thumbnail,this.form.controls.title.setValue(this.productDetails.title),this.form.controls.youtubeUrl.setValue(this.productDetails.youtubeUrl),this.form.controls.desciription.setValue(this.productDetails.desciription),this.form.controls.category.setValue(this.productDetails.category),this.form.controls.subCategory.setValue(this.productDetails.subCategory),this.form.controls.institution.setValue(this.productDetails.institution),this.form.controls.date.setValue(this.productDetails.date),this.form.controls.time.setValue(this.productDetails.time),this.form.controls.duration.setValue(this.productDetails.duration),this.router.url.includes("view")&&this.form.disable()}discard(){this.productId?this.form.patchValue(this.productDetails):this.form.reset(),this.router.navigate(["/liveCases/list"])}save(){if(!this.form.invalid){const i={title:this.form.controls.title.value,youtubeUrl:this.form.controls.youtubeUrl.value,desciription:this.form.controls.desciription.value,thumbnail:"https://api.medstream360.com/image-1702999237801.png",category:this.form.controls.category.value,subCategory:this.form.controls.subCategory.value,institution:this.form.controls.institution.value,date:this.form.controls.date.value,time:this.form.controls.time.value,duration:this.form.controls.duration.value};this.productId?this.api.apiPutCall(i,"schedulecase/"+this.productId).subscribe(o=>{1==o.status&&(this.snackbar.openFromComponent(g.h,{data:"Successfully Updated"}),this.router.navigate(["/liveCases/list"]))}):this.api.apiPostCall(i,"schedulecase").subscribe(o=>{1==o.status&&(this.snackbar.openFromComponent(g.h,{data:"Successfully Saved"}),this.router.navigate(["/liveCases/list"]))}),console.log(i)}}static#t=this.\u0275fac=function(o){return new(o||e)(t.Y36(d.F0),t.Y36(l.QS),t.Y36(T.s),t.Y36(y.ux),t.Y36(d.gz),t.Y36(q))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-add-live-cases"]],viewQuery:function(o,n){if(1&o&&t.Gf(at,5),2&o){let s;t.iGM(s=t.CRH())&&(n.fileInput=s.first)}},decls:73,vars:22,consts:[[1,"container"],[1,"card-title"],["routerLink","/liveCases/list",1,"fa","fa-arrow-left",2,"font-size","20px","cursor","pointer","color","white"],[2,"padding","0px !important","margin","0px !important","font-weight","600","color","white","font-size","18px","margin","10px 0px 10px 0px !important"],[1,"card"],[2,"padding","0px !important","margin","0px !important","font-weight","600","color","#f24c44"],[1,"new4"],[3,"formGroup"],[1,"row"],[1,"section-b","col"],["placeholder","Title","type","text","name","Search","matInput","","formControlName","title","maxlength","100","required","",1,"input"],[1,"hintalign"],[4,"ngIf"],["placeholder","URL of the Video","type","text","name","Search","matInput","","formControlName","youtubeUrl","required","",1,"input"],[1,"col-md-10"],["matInput","","rows","5","cols","4","formControlName","desciription","placeholder","Description","maxlength","250",1,"input"],[1,"col-md-2",2,"display","flex","justify-content","center"],["id","images"],["id","main-img-holder"],["id","main-img","alt","main-img",2,"width","250px","height","120px","border-radius","10px","margin-top","5px",3,"src"],[1,"upload-icon-container"],["for","image-upload-input",1,"upload-icon-label"],[1,"cursor-pointer"],[1,"fa","fa-upload","fa-2x",2,"color","white"],["style","color: white;margin: 10px;",4,"ngIf"],["type","file","accept","image/*","id","image-upload-input",2,"display","none",3,"change"],["imageUploadInput",""],[1,"section-b","col-4"],["placeholder","Category","formControlName","category",2,"margin","0  !important"],[3,"value",4,"ngFor","ngForOf"],["placeholder","Sub Category","formControlName","subCategory",2,"margin","0  !important"],[2,"padding","0px !important","margin","25px 0px 0px 0px !important","font-weight","600","color","#f24c44"],[1,"section-b","col-6"],["placeholder","Name","formControlName","institution",2,"margin","0  !important"],[1,"col-6"],[2,"padding","0px !important","margin","25px 0px 0px 0px!important","font-weight","600","color","#f24c44"],["placeholder","Date","type","text","name","Search","matInput","","formControlName","date","required","",1,"input",2,"margin","0  !important"],["placeholder","Time","type","text","name","Search","matInput","","formControlName","time","maxlength","50","required","",1,"input",2,"margin","0  !important"],["placeholder","Duration","type","text","name","Search","matInput","","formControlName","duration","required","",1,"input",2,"margin","0  !important"],["class","disflex mt-5",4,"ngIf"],[2,"color","white","margin","10px"],[3,"value"],[1,"disflex","mt-5"],["mat-flat-button","","color","warn",3,"click"],["mat-flat-button","","color","primary","type","submit",3,"disabled","click",4,"ngIf"],["mat-flat-button","","color","primary","type","submit",3,"click",4,"ngIf"],["mat-flat-button","","color","primary","type","submit",3,"disabled","click"],["mat-flat-button","","color","primary","type","submit",3,"click"]],template:function(o,n){if(1&o&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"i",2),t._uU(3,"\xa0\xa0 "),t.TgZ(4,"h2",3),t._uU(5),t.qZA()(),t.TgZ(6,"div",4)(7,"h4",5),t._uU(8),t.qZA(),t._UZ(9,"hr",6),t.TgZ(10,"form",7)(11,"div",8)(12,"div",9),t._UZ(13,"input",10),t.TgZ(14,"mat-hint",11),t._uU(15),t.qZA(),t.YNc(16,st,2,1,"mat-error",12),t.qZA()(),t.TgZ(17,"div",8)(18,"div",9),t._UZ(19,"input",13),t.YNc(20,lt,2,1,"mat-error",12),t.qZA()(),t.TgZ(21,"div",8)(22,"div",14)(23,"div",8)(24,"div",9),t._UZ(25,"textarea",15),t.TgZ(26,"mat-hint",11),t._uU(27),t.qZA(),t.YNc(28,ct,2,1,"mat-error",12),t.qZA()()(),t.TgZ(29,"div",16)(30,"div")(31,"div",17)(32,"div",18),t._UZ(33,"img",19),t.TgZ(34,"div",20)(35,"label",21)(36,"span",22),t._UZ(37,"i",23),t.YNc(38,ut,2,0,"p",24),t.qZA(),t.TgZ(39,"input",25,26),t.NdJ("change",function(c){return n.onFileChange(c)}),t.qZA()()()()()()()(),t.TgZ(41,"div",8)(42,"div",27)(43,"mat-select",28),t.YNc(44,dt,2,2,"mat-option",29),t.qZA(),t.YNc(45,pt,2,1,"mat-error",12),t.qZA(),t.TgZ(46,"div",27)(47,"mat-select",30),t.YNc(48,mt,2,2,"mat-option",29),t.qZA(),t.YNc(49,gt,2,1,"mat-error",12),t.qZA()(),t.TgZ(50,"h4",31),t._uU(51),t.qZA(),t._UZ(52,"hr",6),t.TgZ(53,"div",8)(54,"div",32)(55,"mat-select",33),t.YNc(56,ft,2,2,"mat-option",29),t.qZA(),t.YNc(57,ht,2,1,"mat-error",12),t.qZA(),t._UZ(58,"div",34),t.qZA(),t.TgZ(59,"h4",35),t._uU(60),t.qZA(),t._UZ(61,"hr",6),t.TgZ(62,"div",8)(63,"div",27),t._UZ(64,"input",36),t.YNc(65,_t,2,1,"mat-error",12),t.qZA(),t.TgZ(66,"div",27),t._UZ(67,"input",37),t.YNc(68,Ct,2,1,"mat-error",12),t.qZA(),t.TgZ(69,"div",27),t._UZ(70,"input",38),t.YNc(71,vt,2,1,"mat-error",12),t.qZA()(),t.YNc(72,bt,6,5,"div",39),t.qZA()()()),2&o){let s,c,m,h,_,C,v,x,Z;t.xp6(5),t.hij("Add ","Scheduled Cases",""),t.xp6(3),t.hij("","Scheduled Case Detail"," "),t.xp6(2),t.Q6J("formGroup",n.form),t.xp6(5),t.hij("",(null==n.form.get("title").value?null:n.form.get("title").value.length)||0,"/50 "),t.xp6(1),t.Q6J("ngIf",n.submitted&&(null==(s=n.form.get("title"))||null==s.errors?null:s.errors.required)),t.xp6(4),t.Q6J("ngIf",n.submitted&&(null==(c=n.form.get("youtubeUrl"))||null==c.errors?null:c.errors.required)),t.xp6(7),t.hij("",(null==n.form.get("desciription").value?null:n.form.get("desciription").value.length)||0,"/250 "),t.xp6(1),t.Q6J("ngIf",n.submitted&&(null==(m=n.form.get("desciription"))||null==m.errors?null:m.errors.required)),t.xp6(5),t.Q6J("src",n.mainImageSrc,t.LSH),t.xp6(5),t.Q6J("ngIf",n.mainImageSrc.includes("noImg.png")),t.xp6(6),t.Q6J("ngForOf",n.url),t.xp6(1),t.Q6J("ngIf",n.submitted&&(null==(h=n.form.get("category"))||null==h.errors?null:h.errors.required)),t.xp6(3),t.Q6J("ngForOf",n.url),t.xp6(1),t.Q6J("ngIf",n.submitted&&(null==(_=n.form.get("subCategory"))||null==_.errors?null:_.errors.required)),t.xp6(2),t.Oqu("Institute Detail"),t.xp6(5),t.Q6J("ngForOf",n.url),t.xp6(1),t.Q6J("ngIf",n.submitted&&(null==(C=n.form.get("institution"))||null==C.errors?null:C.errors.required)),t.xp6(3),t.Oqu("Update Detail"),t.xp6(5),t.Q6J("ngIf",n.submitted&&(null==(v=n.form.get("date"))||null==v.errors?null:v.errors.required)),t.xp6(3),t.Q6J("ngIf",n.submitted&&(null==(x=n.form.get("time"))||null==x.errors?null:x.errors.required)),t.xp6(3),t.Q6J("ngIf",n.submitted&&(null==(Z=n.form.get("duration"))||null==Z.errors?null:Z.errors.required)),t.xp6(1),t.Q6J("ngIf",!n.view)}},dependencies:[p.sg,p.O5,it.ey,nt.lW,A.bx,A.TO,ot.Nt,rt.gD,l._Y,l.Fj,l.JJ,l.JL,l.Q7,l.nD,l.sg,l.u,d.rH,p.gd],styles:["#images[_ngcontent-%COMP%]{height:0}#main-img-holder[_ngcontent-%COMP%]{max-width:300px;height:300px;margin-bottom:10px}.merged-icon[_ngcontent-%COMP%]{position:relative;display:inline-block}hr.new4[_ngcontent-%COMP%]{border:1px solid rgb(163,119,119);margin-bottom:15px}.merged-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:last-child{position:absolute;top:0;right:0}.closeIcon[_ngcontent-%COMP%]{position:absolute;left:4.2rem;bottom:6.5rem}#main-img[_ngcontent-%COMP%]{object-fit:cover;margin-bottom:15px;max-width:340px;width:100%;max-height:300px;height:100%}#img-catalogue[_ngcontent-%COMP%]{display:flex;justify-content:center}.displayflx[_ngcontent-%COMP%]{display:flex;text-align:center}.sub-images[_ngcontent-%COMP%]:hover{cursor:pointer}.card[_ngcontent-%COMP%]{background-color:#2e2e2e;height:90%;border-radius:10px;box-shadow:0 2px 5px #0000001a;padding:1rem}mat-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%]{color:red}.required-error[_ngcontent-%COMP%]{border-color:red!important}.hintalign[_ngcontent-%COMP%]{display:flex!important;justify-content:end!important}.section-b[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]{padding:10px;border-radius:10px;background:#111111!important;color:#fff!important;border:#111111!important;width:100%;line-height:20px;margin-top:5px;margin-bottom:5px}.section-b[_ngcontent-%COMP%]     .mat-mdc-select-trigger{border-radius:10px;background:#111111;line-height:17px;padding:8px}.section-b[_ngcontent-%COMP%]     .mat-mdc-select{margin:10px}.card-title[_ngcontent-%COMP%]{display:flex;align-items:center;margin:4px}.upload-icon-container[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.upload-icon-label[_ngcontent-%COMP%]{display:block;text-align:center}.disflex[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;gap:10px}"]})}return e})();const yt=[{path:"",component:tt,children:[{path:"list",component:W,canActivate:[a(8238).a]},{path:"add",component:f},{path:"edit/:id",component:f},{path:"view/:id",component:f}]}];let qt=(()=>{class e{static#t=this.\u0275fac=function(o){return new(o||e)};static#e=this.\u0275mod=t.oAB({type:e});static#i=this.\u0275inj=t.cJS({imports:[p.ez,et.q,l.UX,d.Bz.forChild(yt)]})}return e})()}}]);