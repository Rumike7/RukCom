import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, VERSION } from '@angular/core';
import { Subscription } from 'rxjs';

import { of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {FileUploadService} from 'src/app/_services/file-upload.service';
import { FileType, UploadFactory, UploadImage, UploadPdf, UploadZip } from './upload-factory';
import { FileProgress } from '@app/_interfaces/file.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  name = "Angular " + VERSION.major;
  uploaded_files:File[]=[];
  multiple:boolean=true;
  // @Input() requiredFileType:string=".pdf";
  @Input() requiredFileType!:string;
  
  loading: boolean = false; // Flag variable
  filesProgress: FileProgress[]=[]; 
  uploadFactory?: UploadFactory;
  constructor(private http: HttpClient, 
    private fileUploadService: FileUploadService,
    private router:Router) {
    }
  ngOnInit(): void {
    this.filesProgress=this.fileUploadService.filesProgressValue;
    console.log(this.filesProgress);
    const button = document.querySelector("#selectbutton"); //Finds the button by id.
    button?.addEventListener("click", e => { //Runs the function (doesn't have to be an arrow function, just a function.) whenever said button is clicked.
        e.preventDefault(); //Stops said button from reloading the page.
    });
    const button2 = document.querySelector("#uploadbutton"); //Finds the button by id.
    button2?.addEventListener("click", e => { //Runs the function (doesn't have to be an arrow function, just a function.) whenever said button is clicked.
        e.preventDefault(); //Stops said button from reloading the page.
    });
    if(this.requiredFileType==".pdf"){
      this.uploadFactory = new UploadPdf();

    }
    if(this.requiredFileType=="image/*"){
      this.uploadFactory = new UploadImage();
      this.multiple=true;
    }
    if(this.requiredFileType==".zip"){
      this.uploadFactory = new UploadZip();
    }

  }

  onFileSelected(event:Event) {
    console.log("onFileSelected");
    console.log(this.requiredFileType);
    const files:FileList= this.fileUploadService.getFiles(event);
    const file:File=files[0];
    for(let i=0;i<files.length;i++){
      console.log(files[i]);
      this.uploaded_files.push(files[i]);
    }   
  }
  
  onUpload(){
    
    console.log("onUpload");
    console.log(this.filesProgress);
    if(!this.filesProgress)this.filesProgress=[];
    for(let i=0;i<this.uploaded_files.length;i++){
      if(!this.filesProgress.some(x=>x.file.name==this.uploaded_files[i].name)){
        (<FileProgress[]>this.filesProgress).push({
          "file":this.uploaded_files[i],
          "uploadProgress":0,
          "error":false,
        })
      }
      // else
      //   console.log(this.uploaded_files);
    }
    console.log(this.filesProgress);
    this.fileUploadService.setFilesProgress(this.filesProgress);
    this.router.navigate(['/upload/uploading']);
  }

  deleteFile(){
    this.uploaded_files.pop();
  }
}
