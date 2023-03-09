import { Component, OnInit } from '@angular/core';
import { FileProgress } from '@app/_interfaces/file.interface';
import { FileUploadService } from '@app/_services/file-upload.service';

@Component({
  selector: 'app-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.scss']
})
export class UploadingComponent implements OnInit {
  filesProgress:FileProgress[]=[];
  constructor(private fileUploadService:FileUploadService) {
  }
  
  ngOnInit(): void {
    this.filesProgress=this.fileUploadService.filesProgressValue;
    if(this.filesProgress)
      this.filesProgress.forEach(fileProgress=>{
        this.fileUploadService.uploading(fileProgress);
      });
  }

  cancelUpload(fileProgress:FileProgress) {
    this.fileUploadService.cancelUpload(fileProgress);
  }
  init(){
    this.fileUploadService.initFilesProgress();
    console.log(this.filesProgress);
  }

}
