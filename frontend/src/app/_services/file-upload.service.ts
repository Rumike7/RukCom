import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FileForm, FileProgress } from '@app/_interfaces/file.interface';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private fileUploadSubject:BehaviorSubject<FileProgress[]>;
  public filesProgress: Observable<FileProgress[]>;
  private fileFormSubject:BehaviorSubject<FileForm>;
  public fileForm: Observable<FileForm>;
  error:boolean=false; 

    
  constructor(private http:HttpClient, private router:Router,
    private accountService:AccountService) {
    this.fileUploadSubject = new BehaviorSubject<FileProgress[]>((JSON.parse(<string>localStorage.getItem('filesProgress'))));
    this.filesProgress=this.fileUploadSubject.asObservable();
    this.fileFormSubject = new BehaviorSubject<FileForm>((JSON.parse(<string>localStorage.getItem('fileForm'))));
    this.fileForm=this.fileFormSubject.asObservable();
   }
  
  // Returns an observable
  upload(file:File):Observable<any> {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", this.accountService.userValue.email);
      formData.append("domain", this.f.domain);
      formData.append("faculty", this.f.faculty);
      
      return this.http.post(environment.apiUrl+'/file/uploading', formData, {
        reportProgress: true,
        observe: 'events'
    })
  }

  getFiles(event:Event):FileList{
    const files:FileList= (<FileList>(<HTMLInputElement>event.target).files);
    return files;
  }

  public get filesProgressValue(): FileProgress[] {
    return this.fileUploadSubject.value;
  }
  public get f(): FileForm {
    return this.fileFormSubject.value;
  }

  uploading(fileProgress:FileProgress){
    const upload$ = this.upload(fileProgress.file).pipe(
      finalize(() => this.reset(fileProgress))
    );
    
    upload$.subscribe(event => console.log(event));

  fileProgress.uploadSub = upload$.subscribe({
    next:(event) => {
      if (event.type == HttpEventType.UploadProgress) {
        if(event.total===undefined) 
          fileProgress.uploadProgress =undefined;
        else
          fileProgress.uploadProgress = Math.round(100 * (event.loaded / event.total));
      }
    }, 
    error:(err:any)=>{
      fileProgress.error=true;
      console.log(err);
    }
    })

  }
  cancelUpload(fileProgress:FileProgress) {
    if(fileProgress.uploadSub)fileProgress.uploadSub.unsubscribe();
    this.reset(fileProgress);
  }

  reset(fileProgress:FileProgress) {
    fileProgress.uploadProgress = 100;
    fileProgress.uploadSub = undefined;
  }
  setFilesProgress(filesProgress:FileProgress[]){
    localStorage.setItem('filesProgress', JSON.stringify(filesProgress));
    this.fileUploadSubject.next(filesProgress);
  }
  setFileForm(fileForm:FileForm){
    localStorage.setItem('fileForm', JSON.stringify(fileForm));
    this.fileFormSubject.next(fileForm);
  }

  initFilesProgress(){
    this.setFilesProgress([]);
  }
}
