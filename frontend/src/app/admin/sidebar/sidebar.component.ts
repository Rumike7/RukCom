import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@app/_interfaces/user.interface';
import { AdminEnumsService } from '@app/_services/admin-enums.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() user!:User;
  newCategory: string="";
  brandForm!: FormGroup;
  categoryForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public enums: AdminEnumsService,
  ) { 
  }

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addBrand(){
    const newBrand:string=this.brandForm.value['name'];
    const id=this.enums.brands.findIndex(el=>el==newBrand);
    if(newBrand!='' && id==-1)this.enums.brands.push(newBrand);
    this.brandForm.controls['name'].setValue('');
    this.enums.update(this.enums.brands,0);
  }
  addCategory(){
    const newCategory:string=this.categoryForm.value['name'];
    const id=this.enums.categories.findIndex(el=>el==newCategory);
    if(newCategory!='' && id==-1)this.enums.categories.push(newCategory);
    this.categoryForm.controls['name'].setValue('');
    this.enums.update(this.enums.categories,1);
  }
  removeBrand(e:string){
    const id=this.enums.brands.findIndex(el=>el==e);
    if(id!==-1)this.enums.brands.splice(id,1);
    this.enums.update(this.enums.brands,0);
  }
  removeCategory(e:string){
    const id=this.enums.categories.findIndex(el=>el==e);
    if(id!=-1)this.enums.categories.splice(id,1);
    this.enums.update(this.enums.categories,1);
  }

}
