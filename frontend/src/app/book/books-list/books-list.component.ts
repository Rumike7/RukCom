import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileType } from '@app/upload/upload-factory';
import { Book} from '@app/_interfaces/book.interface';
import { AccountService } from '@app/_services/account.service';
import { BookService } from '@app/_services/book.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books:Book[]=[];
  error:boolean=false;

  constructor(private bookService: BookService,
    private router: Router,
    private accountService: AccountService) { }

  ngOnInit(): void {
    this.bookService.getVerifiedBook().subscribe({
      next: (books:Book[]) => {
          console.log(books);
          this.books=books;
      },
      error: (error:any) => {
          this.error=true;
          console.log(error);
      }
    });
    console.log("Book list");
    console.log(this.accountService.userValue);
  }

  toBook(book:Book){
    console.log("toBook");
    this.bookService.setBook(book);
    this.router.navigate(['/books',book.filename,book.id]);
  }
}
