import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownSelectChoice } from '@app/_interfaces/dropdown-select-choice';
import { BookService } from '@app/_services/book.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  faculties:DropdownSelectChoice[]= [
    {
      label: 'Tous',
      values: ['Tous']
    },
    {
      label:"ENSA",
      values:["CP1","CP2","Genie Informatique","Genie Civil","Genie Cyber Sécurité","Genie Electrique"]
    },
    {
      label:"ENCG",
      values:["CP1","CP2","Gestion","Commerce"]
    },
    {
      label:"FSJES",
      values:["Gestion et médiation sociales","Sciences économiques et Gestion","Droit et sciences juridiques"]
    },
    {
      label:"FSO",
      values:["Sciences Mathématiques et Informatique","Sciences de la Matière Physique et Chimie","Sciences de la Vie","Sciences de la Terre et de l'Univers"]
    },
    {
      label:"FMPO",
      values:["Sciences Mathématiques et Informatique","Sciences de la Matière Physique et Chimie","Sciences de la Vie","Sciences de la Terre et de l'Univers"]
    },
    {
      label:"ESTO",
      values:["Sciences Mathématiques et Informatique","Sciences de la Matière Physique et Chimie","Sciences de la Vie","Sciences de la Terre et de l'Univers"]
    },
    {
      label:"Lettres",
      values:["Lettres et Sciences Humaines-Oujda"]
    },

  ]
  private _prevSelected:any;
  keysearch:boolean = true;
  form!:FormGroup;

  constructor(private formBuilder: FormBuilder,
    private bookService: BookService
    ) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      keyword: [''],
      faculty: [''],
      domain: [''],
      type: [''],
      title: [''],
    })
  }

  get f() { return this.form.controls; }


  plusSearch(evt:Event){
    var target = <HTMLInputElement>evt.target;
    console.log("plus Search");
    if(target.checked){
      if(target.value=="keyword"){
        this.keysearch = true;
      }
      else{ 
        this.keysearch = false;
      }
      this._prevSelected = target;
      console.log(this.keysearch);
    }else{
      if(this._prevSelected.value=="keyword"){
        this.keysearch = false;
      }
      else{ 
        this.keysearch = true;
      } 
    }
  }

  onSubmit(){
    console.log("onSubmit");
    console.log(this.form.value);
    console.log(this.f);
    this.bookService.search(this.form,this.keysearch).subscribe();
  }

}
