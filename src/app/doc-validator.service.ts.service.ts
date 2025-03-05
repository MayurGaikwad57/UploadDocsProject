import { Injectable } from '@angular/core';
import { FileConfig } from './validator_interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocValidatorServiceTsService {

  fileConfig !: FileConfig
  constructor(private httpClient : HttpClient) { this.loadConfig()}
 
  
  loadConfig() {
    return this.httpClient.get<FileConfig>('assets/uploadDoc.json').subscribe({
        next: (config) => {
            this.fileConfig = config;
        },
        error: (err) => {
            console.error('Error loading config:', err);
        }
    });
}

  ValidateFile(file:File) {
    if (!this.fileConfig) {
      return { valid: false, error: 'Configuration not loaded yet' };
    }
   const fileSizeLimit = this.fileConfig?.FILE_SIZE;
   const accpetedExtensions = this.fileConfig.ACCEPTED_FILE_TYPES;

   const fileSize = file.size;
   const fileExtensions = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

   if(fileSize > fileSizeLimit) {
     return {valid : false, error:'File Size Exceeds 10MB Size'}
   }  
   if(!accpetedExtensions.includes(fileExtensions)){
     return {valid:false,error:'File type not allowed'} 
   }
   return {valid:true};
  }
  
  
}
