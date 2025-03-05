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
}
