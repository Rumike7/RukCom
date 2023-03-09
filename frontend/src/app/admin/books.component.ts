import { Component, OnInit } from '@angular/core';
import { Book} from '@app/_interfaces/book.interface';
import { BookService } from '@app/_services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  error:boolean=false;
  choosed:boolean=false;
  unverified_books:Book[]=[];
  
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getUnverifiedBook().subscribe({
      next: (books:Book[]) => {
          console.log(books);
          this.unverified_books=books;
      },
      error: (error:any) => {
          this.error=true;
          console.log(error);
      }
    });
  }

  toPreview(book:Book){
    this.bookService.toPreview(book);
  }

  accept(book:Book){
    this.bookService.getUnverifiedBook().subscribe({
      next: (books:Book[]) => {
          console.log(books);
          this.unverified_books=books;
      },
      error: (error:any) => {
          this.error=true;
          console.log(error);
      }
    });
  }
  reject(book:Book){
    this.bookService.reject(book).subscribe({
      next: () => {
          this.choosed=true;
      },
      error: (error:any) => {
          this.error=true;
          console.log(error);
      }
    });
  }
}


