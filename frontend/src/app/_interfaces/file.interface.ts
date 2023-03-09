import { BehaviorSubject, Observable, Subscription } from 'rxjs';

export interface FileProgress {
    file:File;
    error:boolean;
    uploadProgress?:number;
    uploadSub?: Subscription;
}
export interface FileForm{
    faculty: string;
    domain: string;
}