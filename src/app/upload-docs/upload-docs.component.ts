import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DocValidatorServiceTsService } from '../doc-validator.service.ts.service';
@Component({
  selector: 'app-upload-docs',
  templateUrl: './upload-docs.component.html',
  styleUrls: ['./upload-docs.component.css']
})
export class UploadDocsComponent implements OnInit {
  @ViewChild("fileInput") fileInput!: ElementRef;
  userFile:File[] = [];

  error : boolean = false;
  errorMessage : string = '';
  max_doc_limit!: number;
  constructor(private validationService : DocValidatorServiceTsService) { }

  ngOnInit(): void {
   this.loadInvoiceConfig();
  }
  loadInvoiceConfig(){
    this.max_doc_limit = this.validationService?.fileConfig.MAX_DOC_UPLOAD;
  }


  onSupportDocsSelect(){
    this.fileInput.nativeElement.click();
  }

  onFileChange(event:any){
   const files = event.target?.files
   if(files.length>0) {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if(this.isFileUploaded(file.name)) {
        this.errorMessage = 'File already present';
        return 
      }

      const validation = this.validationService.ValidateFile(file);
      if(!validation.valid) {
        this.errorMessage = validation.error!;
        console.log(this.errorMessage);
        return;
      }
      this.userFile.push(files[index]);
    }
   }
  }

  isFileUploaded(name:any){
   return this.userFile.some((file:any)=>file.name === name)
  }
  removeDoc(index:any){
     
  }

  // Very Imp Note when dealing with file uploads in Angular and using them in forms 
  //  for setting validations on upload or filed or other thngs 
/* The error message indicates that you are trying to programmatically set a value for an <input type="file"> element
using setValue(). However, for security reasons, browsers do not allow setting the value of a file
input field programmatically—except for setting it to an empty string ("").
-------------------Issue that you will see..............................
this.renewalTotFormGroup.controls['uploadToT'].setValue(documentName);
the above is not allowed beacuse of the above note
  */
}
