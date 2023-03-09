import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Book } from '@app/_interfaces/book.interface';
import { BookService } from '@app/_services/book.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  book!:Book;
  data:any;
  bookPath:string|undefined;
  trustedPath!:SafeResourceUrl;
  constructor(private activatedRoute: ActivatedRoute, 
    private bookService: BookService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.book=this.bookService.bookValue;
    console.log("PreviewC");
    console.log("this.book");
    console.log(this.book);
    if(this.book)this.bookPath=this.book.path;
    this.bookPath="assets/pdf/Les_cartes_graphiques-fr.pdf";
    this.trustedPath=this.sanitizer.bypassSecurityTrustResourceUrl(this.bookPath);
  }

}
