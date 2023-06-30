import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product} from '@app/_interfaces/product.interface';
import { ProductService } from '@app/_services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '@app/_services/alert.service';
import { AdminEnumsService } from '@app/_services/admin-enums.service';
// import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Output() closeModalEvent = new EventEmitter<boolean>();
  products: Product[]=[];
  productForm!: FormGroup;
  selectedFile!: File;
  selectedFileUrl!: string;
  selectedProductId!: number;
  selectedProduct!: Product;
  modalVisible = true;


  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private alertService: AlertService,
    public enums: AdminEnumsService,
  ) { }
  ngOnInit(): void {
    this.productService.allProducts.subscribe((res:Product[])=>{
      this.products=res;
      console.log(this.products);
    });
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      discount: [0],
      quantity: [0, Validators.required],
      about: [''],
      category: ['',Validators.required],
      brand: ['',Validators.required],
      is_featured: [false],
      is_published: [true],
    });
  }
  get pf(){
    return this.productForm.controls;
  }

  search(input: string) {
    this.productService.getWithKeys(input);
  }
  onImageSelected(event: Event):void {
    const inputElement = event.target as HTMLInputElement;
    const fileList = inputElement.files;
    if (fileList && fileList.length) {
      this.selectedFile = fileList[0];
      console.log(this.selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        // this.productForm.get('image')!.setValue(reader.result as string);
      };
    }
  }

  add(event: any){
    console.log("add a product function");
    if (this.productForm.invalid) {
      console.log("productForm.invalid");
      for (const controlName in this.productForm.controls) {
        if (this.productForm.controls[controlName].invalid) {
          console.log(controlName);
          // set the control as touched so that the error message is displayed
          this.productForm.controls[controlName].markAsTouched();
        }
      }
      return;
    }
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    formData.append('discount', this.productForm.value.discount);
    formData.append('quantity', this.productForm.value.quantity);
    formData.append('type', this.productForm.value.type);
    formData.append('about', this.productForm.value.about);
    formData.append('category', this.productForm.value.category);
    formData.append('brand', this.productForm.value.brand);
    formData.append('is_featured', this.productForm.value.is_featured);
    formData.append('is_published', this.productForm.value.is_published);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.productService.create(formData).subscribe({
      next: (res) => {
        console.log(res);
        this.alertService.success(`Product has been created!`, { keepAfterRouteChange: true });
        this.productService.gets();
      },
      error: error => {
          this.alertService.error(error);
          console.log("error ");
          console.log(error);
      }
    });
    this.closeModalEvent.emit(false);

  }

  update(event: any){
    if (this.productForm.invalid) {
      console.log("productForm.invalid");
      for (const controlName in this.productForm.controls) {
        if (this.productForm.controls[controlName].invalid) {
          console.log(controlName);
          // set the control as touched so that the error message is displayed
          this.productForm.controls[controlName].markAsTouched();
        }
      }
      return;
    }

    const updatedProduct = this.productForm.value;
    this.productService.update(updatedProduct,this.selectedProductId).subscribe({
      next: (res) => {
        console.log(res);
        this.alertService.success(`Product has been updated!`, { keepAfterRouteChange: true });
        this.productService.gets();
      },
      error: error => {
          this.alertService.error(error);
          console.log("error ");
          console.log(error);
      }
    });
    this.closeModalEvent.emit(false);
  }

  selectForUpdate(id:number){
    this.products.forEach(p=>{
      if(id==p.id){
        this.productForm.patchValue(p);
        this.selectedFileUrl=String(p.imgpath);
        this.selectedProductId=id;
        this.productService.setImage(String('/api/'+p.imgpath))
        .then(file => {
          this.selectedFile=file
        })
        .catch(error => {
          console.error('Error fetching file:', error);
        });
      }
    })
  }

  delete(event: any){
    this.productService.delete(this.selectedProductId).subscribe({
      next: (res) => {
        console.log(res);
        this.alertService.success(`Product ${res.name} has been deleted!`, { keepAfterRouteChange: true });
        this.productService.gets();
      },
      error: error => {
          this.alertService.error(error);
          console.log("error ");
          console.log(error);
      }
    });
    this.closeModalEvent.emit(false);
    // this.modalVisible = false;

  }

  selectForDelete(id:number){
    this.products.forEach(p=>{
      if(id==p.id){
        this.selectedProductId=id;
      }
    })
  }

  selectForSee(id:number){
    this.products.forEach(p=>{
      if(id==p.id){
        this.selectedProduct=p;
      }
    })
  }

  onClose(isVisible: any){
    console.log("onClose");
    this.modalVisible = false;
   }


}
