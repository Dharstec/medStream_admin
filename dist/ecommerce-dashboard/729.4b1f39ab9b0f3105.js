"use strict";(self.webpackChunkecommerce_dashboard=self.webpackChunkecommerce_dashboard||[]).push([[729],{729:(Nt,v,r)=>{r.r(v),r.d(v,{AllCasesModule:()=>Ut});var p=r(6895),u=r(671),I=r(7766),g=r(5259),t=r(4650),T=r(9625),U=r(5938),y=r(7009),d=r(8729);let q=(()=>{class e{constructor(){}static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var N=r(7392),w=r(1572),k=r(6308),M=r(266);function D(e,a){1&e&&(t.TgZ(0,"th",25)(1,"span"),t._uU(2,"S.No"),t.qZA()())}function Y(e,a){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.xp6(1),t.Oqu(i._id)}}function P(e,a){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Title"),t.qZA()())}function S(e,a){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.xp6(1),t.Oqu(i.title)}}function L(e,a){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Category"),t.qZA()())}function Q(e,a){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.xp6(1),t.Oqu(i.category)}}function J(e,a){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Sub Category"),t.qZA()())}function F(e,a){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.xp6(1),t.Oqu(null==i?null:i.subCategory)}}function V(e,a){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Institution"),t.qZA()())}function j(e,a){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.xp6(1),t.Oqu(i.institution)}}function G(e,a){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Week No"),t.qZA()())}function H(e,a){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.xp6(1),t.Oqu(i.duration)}}function $(e,a){1&e&&(t.TgZ(0,"th",27)(1,"span"),t._uU(2,"Month"),t.qZA()())}function z(e,a){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.xp6(1),t.Oqu(i.time)}}function B(e,a){1&e&&(t.TgZ(0,"th",28)(1,"span"),t._uU(2,"Action"),t.qZA()())}function R(e,a){if(1&e){const i=t.EpF();t.TgZ(0,"td",26)(1,"div",29)(2,"mat-icon",30),t.NdJ("click",function(){const s=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.edit("edit",s._id,s))}),t._uU(3,"edit"),t.qZA(),t.TgZ(4,"mat-icon",31),t.NdJ("click",function(){const s=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.delete(s._id))}),t._uU(5,"delete"),t.qZA(),t.TgZ(6,"mat-icon",32),t.NdJ("click",function(){const s=t.CHM(i).$implicit,c=t.oxw();return t.KtG(c.edit("view",s._id,s))}),t._uU(7,"visibility"),t.qZA()()()}}function W(e,a){1&e&&t._UZ(0,"tr",33)}function E(e,a){1&e&&t._UZ(0,"tr",34)}function K(e,a){1&e&&(t.TgZ(0,"div",35),t._UZ(1,"mat-spinner",36),t.qZA()),2&e&&(t.xp6(1),t.Q6J("diameter",50))}function X(e,a){1&e&&(t.TgZ(0,"div",37)(1,"p",38),t._uU(2),t.qZA()()),2&e&&(t.xp6(2),t.Oqu("No data available"))}let tt=(()=>{class e{constructor(i,n,o,s,c){this.api=i,this.dialog=n,this.snackbar=o,this.router=s,this.allSer=c,this.dataSource=new u.by([]),this.columnsToDisplay=["s.no","title","category","subCategory","inst","week","month","action"],this.noData=!1}ngOnInit(){this.getLiveCasesList()}edit(i,n,o){this.allSer.data=o,this.router.navigate(["/allCases/"+i,n])}getLiveCasesList(){this.api.apiGetCall("allcase").subscribe(i=>{this.allCases=i.data,this.dataSource.data=i.data.sort((n,o)=>Date.parse(o.createdAt)-Date.parse(n.createdAt)),i.data?.length||(this.noData=!0)})}delete(i){this.dialog.open(I.$,{width:"250px",data:{from:"delete"}}).afterClosed().subscribe(o=>{o&&this.api.apiDeleteCall(i,"allcase").subscribe(s=>{s.message.includes("successfully")&&(this.snackbar.openFromComponent(g.h,{data:s.message}),this.getLiveCasesList())})})}applyFilter(i){this.dataSource.filter=i.trim().toLowerCase()}applyTypeFilter(){this.selectedColourValue?.length||this.selectedValue?.length?this.filteredData=this.dataSource.data.filter(i=>!(this.selectedValue?.length&&!this.selectedValue?.includes(i.category[0])||this.selectedColourValue?.length&&!this.selectedColourValue?.includes(i.colour[0]))):(this.filteredData=[],this.dataSource.data=this.allCases)}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(T.s),t.Y36(U.uw),t.Y36(y.ux),t.Y36(d.F0),t.Y36(q))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-all-cases-list"]],decls:39,vars:6,consts:[[1,"container"],[1,"card"],[1,"row",2,"display","flex","flex-direction","row","align-items","center"],[1,"section-b","col-md-3"],["type","text","name","Search","placeholder","Search...",1,"input","m-3",3,"keyup"],[1,"col-md-6",2,"display","flex","justify-content","flex-start","gap","10px"],[1,"add-coupon","col-md-3"],["routerLink","/allCases/add"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","s.no"],["class","first","mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","title"],["mat-header-cell","",4,"matHeaderCellDef"],["matColumnDef","category"],["matColumnDef","subCategory"],["matColumnDef","inst"],["matColumnDef","week"],["matColumnDef","month"],["matColumnDef","action"],["class","last","mat-header-cell","",4,"matHeaderCellDef"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["class","spinner-container",4,"ngIf"],["class","no_data",4,"ngIf"],["mat-header-cell","",1,"first"],["mat-cell",""],["mat-header-cell",""],["mat-header-cell","",1,"last"],[1,"displayicon"],["matTooltip","Edit",2,"font-size","18px","cursor","pointer",3,"click"],["matTooltip","Delete",2,"font-size","18px","cursor","pointer",3,"click"],["matTooltip","View",2,"font-size","18px","cursor","pointer",3,"click"],["mat-header-row",""],["mat-row",""],[1,"spinner-container"],[3,"diameter"],[1,"no_data"],[2,"color","white"]],template:function(n,o){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"input",4),t.NdJ("keyup",function(c){return o.applyFilter(c.target.value)}),t.qZA()(),t._UZ(5,"div",5),t.TgZ(6,"div",6)(7,"a",7),t._uU(8),t.qZA()()()(),t.TgZ(9,"div",1)(10,"table",8),t.ynx(11,9),t.YNc(12,D,3,0,"th",10),t.YNc(13,Y,2,1,"td",11),t.BQk(),t.ynx(14,12),t.YNc(15,P,3,0,"th",13),t.YNc(16,S,2,1,"td",11),t.BQk(),t.ynx(17,14),t.YNc(18,L,3,0,"th",13),t.YNc(19,Q,2,1,"td",11),t.BQk(),t.ynx(20,15),t.YNc(21,J,3,0,"th",13),t.YNc(22,F,2,1,"td",11),t.BQk(),t.ynx(23,16),t.YNc(24,V,3,0,"th",13),t.YNc(25,j,2,1,"td",11),t.BQk(),t.ynx(26,17),t.YNc(27,G,3,0,"th",13),t.YNc(28,H,2,1,"td",11),t.BQk(),t.ynx(29,18),t.YNc(30,$,3,0,"th",13),t.YNc(31,z,2,1,"td",11),t.BQk(),t.ynx(32,19),t.YNc(33,B,3,0,"th",20),t.YNc(34,R,8,0,"td",11),t.BQk(),t.YNc(35,W,1,0,"tr",21),t.YNc(36,E,1,0,"tr",22),t.qZA(),t.YNc(37,K,2,1,"div",23),t.YNc(38,X,3,1,"div",24),t.qZA()()),2&n&&(t.xp6(8),t.hij("+\xa0","Add New Cases",""),t.xp6(2),t.Q6J("dataSource",null!=o.filteredData&&o.filteredData.length?o.filteredData:o.dataSource),t.xp6(25),t.Q6J("matHeaderRowDef",o.columnsToDisplay),t.xp6(1),t.Q6J("matRowDefColumns",o.columnsToDisplay),t.xp6(1),t.Q6J("ngIf",!(null!=o.dataSource.data&&o.dataSource.data.length||o.noData)),t.xp6(1),t.Q6J("ngIf",!(null!=o.dataSource.data&&o.dataSource.data.length)&&o.noData))},dependencies:[p.O5,N.Hw,w.Ou,k.YE,u.BZ,u.fO,u.as,u.w1,u.Dz,u.nj,u.ge,u.ev,u.XQ,u.Gk,M.gM,d.rH],styles:[".section-b[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]{padding:15px;border:none;border-radius:10px;background:#111111;color:#fff;width:100%;border:#111111;line-height:24px}.add-coupon[_ngcontent-%COMP%]{font-size:16px}.add-coupon[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-weight:500;color:#fff;text-decoration:none}.no_data[_ngcontent-%COMP%]{font-size:16px;font-weight:500}.card[_ngcontent-%COMP%]{background-color:#2e2e2e;height:90%;border-radius:10px;box-shadow:0 2px 5px #0000001a;padding:5px;text-align:center;margin:10px}.disFlex[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;align-items:center}.disFlex[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]{position:relative}.disFlex[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   .normal-search[_ngcontent-%COMP%]   .search[_ngcontent-%COMP%]{border:none;height:2.375rem;padding-left:2.5rem;padding-right:1.25rem;background-color:#f3f3f9;box-shadow:none;border-radius:1.875rem;outline:0}.disFlex[_ngcontent-%COMP%]   .search-container[_ngcontent-%COMP%]   .normal-search[_ngcontent-%COMP%]   .search-icon[_ngcontent-%COMP%]{position:absolute;font-size:1rem;line-height:2.375rem;left:.813rem;top:0;color:#74788d}.mat-table[_ngcontent-%COMP%]{width:100%}.displayicon[_ngcontent-%COMP%]{display:flex}.first[_ngcontent-%COMP%]{border-bottom-left-radius:15px;border-top-left-radius:15px}.last[_ngcontent-%COMP%]{border-bottom-right-radius:15px;border-top-right-radius:15px}"]})}return e})(),et=(()=>{class e{constructor(){}ngOnInit(){}static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-all-cases"]],decls:1,vars:0,template:function(n,o){1&n&&t._UZ(0,"router-outlet")},dependencies:[d.lC]})}return e})();var l=r(4006),it=r(2158),ot=r(3238),nt=r(4859),O=r(9549),at=r(4144),rt=r(4385);const st=["fileInput"];function lt(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Title is required"))}function ct(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("URL is required"))}function ut(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.hij("","Description is required"," "))}function dt(e,a){1&e&&(t.TgZ(0,"p",42),t._uU(1,"Upload Thumbnail"),t.qZA())}function pt(e,a){if(1&e&&(t.TgZ(0,"mat-option",43),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.Q6J("value",i._id),t.xp6(1),t.Oqu(i.category)}}function mt(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Category is required"))}function gt(e,a){if(1&e&&(t.TgZ(0,"mat-option",43),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.Q6J("value",i),t.xp6(1),t.Oqu(i)}}function ft(e,a){if(1&e&&(t.ynx(0),t.YNc(1,gt,2,2,"mat-option",29),t.BQk()),2&e){const i=a.$implicit;t.xp6(1),t.Q6J("ngForOf",i.subCategory)}}function ht(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Sub category is required"))}function _t(e,a){if(1&e&&(t.TgZ(0,"mat-option",43),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.Q6J("value",i._id),t.xp6(1),t.Oqu(i.name)}}function Ct(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Institution is required"))}function xt(e,a){if(1&e&&(t.TgZ(0,"mat-option",43),t._uU(1),t.qZA()),2&e){const i=a.$implicit;t.Q6J("value",i._id),t.xp6(1),t.Oqu(i.name)}}function At(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Operator is required"))}function Zt(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("week No is required"))}function bt(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("Month is required"))}function vt(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e&&(t.xp6(1),t.Oqu("case of the Week is required"))}function Tt(e,a){if(1&e){const i=t.EpF();t.TgZ(0,"button",48),t.NdJ("click",function(){t.CHM(i);const o=t.oxw(2);return t.KtG(o.save())}),t._uU(1),t.ALo(2,"uppercase"),t.qZA()}if(2&e){const i=t.oxw(2);t.Q6J("disabled",i.isSave),t.xp6(1),t.Oqu(t.lcZ(2,2,"Save"))}}function yt(e,a){if(1&e){const i=t.EpF();t.TgZ(0,"button",49),t.NdJ("click",function(){t.CHM(i);const o=t.oxw(2);return t.KtG(o.save())}),t._uU(1),t.ALo(2,"uppercase"),t.qZA()}2&e&&(t.xp6(1),t.Oqu(t.lcZ(2,1,"Update")))}function qt(e,a){if(1&e){const i=t.EpF();t.TgZ(0,"div",44)(1,"button",45),t.NdJ("click",function(){t.CHM(i);const o=t.oxw();return t.KtG(o.discard())}),t._uU(2),t.ALo(3,"uppercase"),t.qZA(),t.YNc(4,Tt,3,4,"button",46),t.YNc(5,yt,3,3,"button",47),t.qZA()}if(2&e){const i=t.oxw();t.xp6(2),t.Oqu(t.lcZ(3,3,"Discard")),t.xp6(2),t.Q6J("ngIf",!i.edit),t.xp6(1),t.Q6J("ngIf",i.edit)}}let f=(()=>{class e{constructor(i,n,o,s,c,m){this.router=i,this.formBuilder=n,this.api=o,this.snackbar=s,this.activeRoute=c,this.allSer=m,this.productview=!1,this.videoSelect=!1,this.images=[],this.apiMainImages=[],this.submitted=!1,this.noImage="assets/noImg.png",this.url=["test"],this.edit=!1,this.view=!1,this.uploadEnabled=!0,this.isSave=!1,this.filteredSubCategories=[],this.cat={}}ngOnInit(){this.getCategory(),this.getOperator(),this.getInstitutionList(),this.initializeForm(),this.productId||(this.mainImageSrc=this.noImage,this.generateRandomString())}getInstitutionList(){this.api.apiGetCall("institute").subscribe(i=>{this.instList=i.data})}getOperator(){this.api.apiGetCall("operator").subscribe(i=>{this.ops=i.data})}getCategory(){this.api.apiGetCall("filters").subscribe(i=>{this.cat=i.data})}generateRandomString(){const i="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";this.result="";for(let n=0;n<12;n++){const o=Math.floor(Math.random()*i.length);this.result+=i.charAt(o)}return this.result}onFileChange(i){const n=i.target.files;if(n.length>0){const o=n[0];o&&this.handleImageUpload(o)}}handleImageUpload(i){const n=new FileReader;n.onload=o=>{o.target.result.includes("image/")&&(this.mainImageSrc=o.target.result)},n.readAsDataURL(i)}removeImage(){this.mainImageSrc=null}clearFileInput(){this.fileInput.nativeElement.value=""}initializeForm(){this.form=this.formBuilder.group({title:["",l.kI.required],youtubeUrl:["",l.kI.required],desciription:["",l.kI.required],category:["",l.kI.required],subCategory:["",l.kI.required],institution:["",l.kI.required],weekNo:["",l.kI.required],month:["",l.kI.required],caseOfTheWeek:["",l.kI.required],operator:["",l.kI.required]}),this.activeRoute.paramMap.subscribe(i=>{this.productId=i.get("id"),this.productId&&this.router.url.includes("edit")?(this.edit=!0,this.getProductDetails(this.allSer.data)):this.router.url.includes("view")&&(this.view=!0,this.getProductDetails(this.allSer.data))})}getProductDetails(i){this.productDetails=i,this.mainImageSrc=i.thumbnail,this.form.controls.title.setValue(this.productDetails.title),this.form.controls.youtubeUrl.setValue(this.productDetails.youtubeUrl),this.form.controls.desciription.setValue(this.productDetails.desciription),this.form.controls.category.setValue(this.productDetails.category),this.form.controls.subCategory.setValue(this.productDetails.subCategory),this.form.controls.institution.setValue(this.productDetails.institution),this.form.controls.weekNo.setValue(this.productDetails.weekNo),this.form.controls.month.setValue(this.productDetails.month),this.form.controls.caseOfTheWeek.setValue(this.productDetails.caseOfTheWeek),this.form.controls.operator.setValue(this.productDetails.operator),this.router.url.includes("view")&&this.form.disable()}discard(){this.productId?this.form.patchValue(this.productDetails):this.form.reset(),this.router.navigate(["/allCases/list"])}save(){if(!this.form.invalid){const i={title:this.form.controls.title.value,youtubeUrl:this.form.controls.youtubeUrl.value,desciription:this.form.controls.desciription.value,filepath:"https://api.medstream360.com/image-1702999237801.png",thumbnail:"https://api.medstream360.com/image-1702999237801.png",category:this.form.controls.category.value,subCategory:this.form.controls.subCategory.value,institution:this.form.controls.institution.value,weekNo:this.form.controls.weekNo.value,month:this.form.controls.month.value,caseOfTheWeek:this.form.controls.caseOfTheWeek.value,operator:this.form.controls.operator.value};this.productId?this.api.apiPutCall(i,"allcase/"+this.productId).subscribe(n=>{1==n.status&&(this.snackbar.openFromComponent(g.h,{data:"Successfully Updated"}),this.router.navigate(["/allCases/list"]))}):this.api.apiPostCall(i,"allcase").subscribe(n=>{1==n.status&&(this.snackbar.openFromComponent(g.h,{data:"Successfully Saved"}),this.router.navigate(["/allCases/list"]))}),console.log(i)}}onCategoryChange(){const i=this.form.get("category")?.value,n=this.cat.category_list.find(o=>o._id===i);this.filteredSubCategories=n?n.subCategory:[]}onInstitutionChange(){const i=this.form.get("institution")?.value;this.instList.find(o=>o._id===i)?this.getOperatorsForInstitution(i):this.ops=[]}getOperatorsForInstitution(i){this.api.apiGetCall(`operators?institution=${i}`).subscribe(n=>{this.ops=n.data})}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(d.F0),t.Y36(l.QS),t.Y36(T.s),t.Y36(y.ux),t.Y36(d.gz),t.Y36(q))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-add-all-cases"]],viewQuery:function(n,o){if(1&n&&t.Gf(st,5),2&n){let s;t.iGM(s=t.CRH())&&(o.fileInput=s.first)}},decls:82,vars:25,consts:[[1,"container"],[1,"card-title"],["routerLink","/allCases/list",1,"fa","fa-arrow-left",2,"font-size","20px","cursor","pointer","color","white"],[2,"padding","0px !important","margin","0px !important","font-weight","600","color","white","font-size","18px","margin","10px 0px 10px 0px !important"],[1,"card"],[2,"padding","0px !important","margin","0px !important","font-weight","600","color","#f24c44"],[1,"new4"],[3,"formGroup"],[1,"row"],[1,"section-b","col"],["placeholder","Title","type","text","name","Search","matInput","","formControlName","title","maxlength","100","required","",1,"input"],[1,"hintalign"],[4,"ngIf"],["placeholder","URL of the Video","type","text","name","Search","matInput","","formControlName","youtubeUrl","required","",1,"input"],[1,"col-md-10"],["matInput","","rows","5","cols","4","formControlName","desciription","placeholder","Description","maxlength","250",1,"input"],[1,"col-md-2",2,"display","flex","justify-content","center"],["id","images"],["id","main-img-holder"],["id","main-img","alt","main-img",2,"width","250px","height","120px","border-radius","10px","margin-top","5px",3,"src"],[1,"upload-icon-container"],["for","image-upload-input",1,"upload-icon-label"],[1,"cursor-pointer"],[1,"fa","fa-upload","fa-2x",2,"color","white"],["style","color: white;margin: 10px;",4,"ngIf"],["type","file","accept","image/*","id","image-upload-input",2,"display","none",3,"change"],["imageUploadInput",""],[1,"section-b","col-4"],["placeholder","Category","formControlName","category",2,"margin","0 !important"],[3,"value",4,"ngFor","ngForOf"],["placeholder","Sub Category","formControlName","subCategory",2,"margin","0 !important"],[4,"ngFor","ngForOf"],[2,"padding","0px !important","margin","25px 0px 0px 0px !important","font-weight","600","color","#f24c44"],[1,"section-b","col-6","instituteCol"],["placeholder","Institution","formControlName","institution"],[1,"col-6"],["placeholder","Name","formControlName","operator","multiple",""],[2,"padding","0px !important","margin","25px 0px 0px 0px!important","font-weight","600","color","#f24c44"],["placeholder","week No","type","text","name","Search","matInput","","formControlName","weekNo","required","",1,"input",2,"margin","0  !important"],["placeholder","Month","type","text","name","Search","matInput","","formControlName","month","maxlength","50","required","",1,"input",2,"margin","0  !important"],["placeholder","Case of the Week","type","text","name","Search","matInput","","formControlName","caseOfTheWeek","required","",1,"input",2,"margin","0  !important"],["class","disflex mt-5",4,"ngIf"],[2,"color","white","margin","10px"],[3,"value"],[1,"disflex","mt-5"],["mat-flat-button","","color","warn",3,"click"],["mat-flat-button","","color","primary","type","submit",3,"disabled","click",4,"ngIf"],["mat-flat-button","","color","primary","type","submit",3,"click",4,"ngIf"],["mat-flat-button","","color","primary","type","submit",3,"disabled","click"],["mat-flat-button","","color","primary","type","submit",3,"click"]],template:function(n,o){if(1&n&&(t.TgZ(0,"div",0)(1,"div",1),t._UZ(2,"i",2),t._uU(3,"\xa0\xa0 "),t.TgZ(4,"h2",3),t._uU(5),t.qZA()(),t.TgZ(6,"div",4)(7,"h4",5),t._uU(8),t.qZA(),t._UZ(9,"hr",6),t.TgZ(10,"form",7)(11,"div",8)(12,"div",9),t._UZ(13,"input",10),t.TgZ(14,"mat-hint",11),t._uU(15),t.qZA(),t.YNc(16,lt,2,1,"mat-error",12),t.qZA()(),t.TgZ(17,"div",8)(18,"div",9),t._UZ(19,"input",13),t.YNc(20,ct,2,1,"mat-error",12),t.qZA()(),t.TgZ(21,"div",8)(22,"div",14)(23,"div",8)(24,"div",9),t._UZ(25,"textarea",15),t.TgZ(26,"mat-hint",11),t._uU(27),t.qZA(),t.YNc(28,ut,2,1,"mat-error",12),t.qZA()()(),t.TgZ(29,"div",16)(30,"div")(31,"div",17)(32,"div",18),t._UZ(33,"img",19),t.TgZ(34,"div",20)(35,"label",21)(36,"span",22),t._UZ(37,"i",23),t.YNc(38,dt,2,0,"p",24),t.qZA(),t.TgZ(39,"input",25,26),t.NdJ("change",function(c){return o.onFileChange(c)}),t.qZA()()()()()()()(),t.TgZ(41,"div",8)(42,"div",27)(43,"mat-select",28),t.YNc(44,pt,2,2,"mat-option",29),t.qZA(),t.YNc(45,mt,2,1,"mat-error",12),t.qZA(),t.TgZ(46,"div",27)(47,"mat-select",30),t.YNc(48,ft,2,1,"ng-container",31),t.qZA(),t.YNc(49,ht,2,1,"mat-error",12),t.qZA()(),t.TgZ(50,"h4",32),t._uU(51),t.qZA(),t._UZ(52,"hr",6),t.TgZ(53,"div",8)(54,"div",33)(55,"mat-select",34),t.YNc(56,_t,2,2,"mat-option",29),t.qZA(),t.YNc(57,Ct,2,1,"mat-error",12),t.qZA(),t._UZ(58,"div",35),t.qZA(),t.TgZ(59,"h4",32),t._uU(60),t.qZA(),t._UZ(61,"hr",6),t.TgZ(62,"div",8)(63,"div",27)(64,"mat-select",36),t.YNc(65,xt,2,2,"mat-option",29),t.qZA(),t.YNc(66,At,2,1,"mat-error",12),t.qZA(),t._UZ(67,"div",35),t.qZA(),t.TgZ(68,"h4",37),t._uU(69),t.qZA(),t._UZ(70,"hr",6),t.TgZ(71,"div",8)(72,"div",27),t._UZ(73,"input",38),t.YNc(74,Zt,2,1,"mat-error",12),t.qZA(),t.TgZ(75,"div",27),t._UZ(76,"input",39),t.YNc(77,bt,2,1,"mat-error",12),t.qZA(),t.TgZ(78,"div",27),t._UZ(79,"input",40),t.YNc(80,vt,2,1,"mat-error",12),t.qZA()(),t.YNc(81,qt,6,5,"div",41),t.qZA()()()),2&n){let s,c,m,h,_,C,x,A,Z,b;t.xp6(5),t.hij("Add ","All Cases",""),t.xp6(3),t.hij("","Case Detail"," "),t.xp6(2),t.Q6J("formGroup",o.form),t.xp6(5),t.hij("",(null==o.form.get("title").value?null:o.form.get("title").value.length)||0,"/50 "),t.xp6(1),t.Q6J("ngIf",o.submitted&&(null==(s=o.form.get("title"))||null==s.errors?null:s.errors.required)),t.xp6(4),t.Q6J("ngIf",o.submitted&&(null==(c=o.form.get("youtubeUrl"))||null==c.errors?null:c.errors.required)),t.xp6(7),t.hij("",(null==o.form.get("desciription").value?null:o.form.get("desciription").value.length)||0,"/250 "),t.xp6(1),t.Q6J("ngIf",o.submitted&&(null==(m=o.form.get("desciription"))||null==m.errors?null:m.errors.required)),t.xp6(5),t.Q6J("src",o.mainImageSrc,t.LSH),t.xp6(5),t.Q6J("ngIf",o.mainImageSrc.includes("noImg.png")),t.xp6(6),t.Q6J("ngForOf",o.cat.category_list),t.xp6(1),t.Q6J("ngIf",o.submitted&&(null==(h=o.form.get("category"))||null==h.errors?null:h.errors.required)),t.xp6(3),t.Q6J("ngForOf",o.cat.category_list),t.xp6(1),t.Q6J("ngIf",o.submitted&&(null==(_=o.form.get("subCategory"))||null==_.errors?null:_.errors.required)),t.xp6(2),t.Oqu("Institute Detail"),t.xp6(5),t.Q6J("ngForOf",o.instList),t.xp6(1),t.Q6J("ngIf",o.submitted&&(null==(C=o.form.get("institution"))||null==C.errors?null:C.errors.required)),t.xp6(3),t.Oqu("Operators Detail"),t.xp6(5),t.Q6J("ngForOf",o.ops),t.xp6(1),t.Q6J("ngIf",o.submitted&&(null==(x=o.form.get("operator"))||null==x.errors?null:x.errors.required)),t.xp6(3),t.Oqu("Update Detail"),t.xp6(5),t.Q6J("ngIf",o.submitted&&(null==(A=o.form.get("weekNo"))||null==A.errors?null:A.errors.required)),t.xp6(3),t.Q6J("ngIf",o.submitted&&(null==(Z=o.form.get("month"))||null==Z.errors?null:Z.errors.required)),t.xp6(3),t.Q6J("ngIf",o.submitted&&(null==(b=o.form.get("caseOfTheWeek"))||null==b.errors?null:b.errors.required)),t.xp6(1),t.Q6J("ngIf",!o.view)}},dependencies:[p.sg,p.O5,ot.ey,nt.lW,O.bx,O.TO,at.Nt,rt.gD,l._Y,l.Fj,l.JJ,l.JL,l.Q7,l.nD,l.sg,l.u,d.rH,p.gd],styles:["#images[_ngcontent-%COMP%]{height:0}#main-img-holder[_ngcontent-%COMP%]{max-width:300px;height:300px;margin-bottom:10px}.merged-icon[_ngcontent-%COMP%]{position:relative;display:inline-block}hr.new4[_ngcontent-%COMP%]{border:1px solid rgb(163,119,119);margin-bottom:15px}.merged-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:last-child{position:absolute;top:0;right:0}.closeIcon[_ngcontent-%COMP%]{position:absolute;left:4.2rem;bottom:6.5rem}#main-img[_ngcontent-%COMP%]{object-fit:cover;margin-bottom:15px;max-width:340px;width:100%;max-height:300px;height:100%}#img-catalogue[_ngcontent-%COMP%]{display:flex;justify-content:center}.displayflx[_ngcontent-%COMP%]{display:flex;text-align:center}.sub-images[_ngcontent-%COMP%]:hover{cursor:pointer}.card[_ngcontent-%COMP%]{background-color:#2e2e2e;height:90%;border-radius:10px;box-shadow:0 2px 5px #0000001a;padding:1rem}mat-label[_ngcontent-%COMP%]   .required[_ngcontent-%COMP%]{color:red}.required-error[_ngcontent-%COMP%]{border-color:red!important}.hintalign[_ngcontent-%COMP%]{display:flex!important;justify-content:end!important}.section-b[_ngcontent-%COMP%]   .input[_ngcontent-%COMP%]{padding:10px;border-radius:10px;background:#111111!important;color:#fff!important;border:#111111!important;width:100%;line-height:20px;margin-top:5px;margin-bottom:5px}.section-b[_ngcontent-%COMP%]     .mat-mdc-select-trigger{border-radius:10px;background:#111111;line-height:17px;padding:8px}.section-b[_ngcontent-%COMP%]     .mat-mdc-select{margin:10px}.card-title[_ngcontent-%COMP%]{display:flex;align-items:center;margin:4px}.upload-icon-container[_ngcontent-%COMP%]{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.upload-icon-label[_ngcontent-%COMP%]{display:block;text-align:center}.disflex[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:center;gap:10px}"]})}return e})();const It=[{path:"",component:et,children:[{path:"list",component:tt,canActivate:[r(8238).a]},{path:"add",component:f},{path:"edit/:id",component:f},{path:"view/:id",component:f}]}];let Ut=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#i=this.\u0275inj=t.cJS({imports:[p.ez,it.q,l.UX,d.Bz.forChild(It)]})}return e})()}}]);