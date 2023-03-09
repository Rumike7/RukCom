export enum FileType {
    Pdf,
    Image,
    Zip
}

export abstract class UploadFactory{
    private multipleUpload!:boolean;
    private requiredFileType!:FileType;
    private files!:File[];
    public abstract createUpload():any;
    public setMultipleUpload(multipleUpload:boolean){
        this.multipleUpload = multipleUpload;
    }
    public setFiles(files:File[]){
        this.files = files;
    }
    public setRequiredFileType(requiredFileType:FileType){
        this.requiredFileType = requiredFileType;
    }
}
export class UploadPdf extends UploadFactory{
    
    public createUpload():any{
        this.setMultipleUpload(false);
        this.setRequiredFileType(FileType.Pdf);
    }
}
export class UploadImage extends UploadFactory{

    
    public createUpload():any{
        this.setRequiredFileType(FileType.Image);
    }
}
export class UploadZip extends UploadFactory{
    public createUpload():any{
        this.setRequiredFileType(FileType.Zip);
    }
}