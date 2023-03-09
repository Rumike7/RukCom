import { Component, OnInit } from '@angular/core';
import { Book } from '@app/_interfaces/book.interface';
import { BookService } from '@app/_services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book!:Book;
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.book=this.bookService.bookValue;
    console.log("BookComponent");
    console.log(this.book);
  }

  getBook(name:string,id:string){

  }
  toPreview(){
    this.bookService.toPreview(this.book);
  }

}
