import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from '../classes/product';
import { ProductsService } from '../services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit,OnDestroy {
  productForm!: FormGroup;
  products: Product[] = [];
  sucsription : Subscription

  constructor(private formBuilder: FormBuilder
    ,private productService : ProductsService) {}
 
  ngOnInit(): void {
    this.initproductForm();
    this.sucsription =this.productService.productOSubject.subscribe({

next:(products:Product[])=>{
  console.log('NEXT');
  this.products = products
},
error:(error)=>{
  console.log(error);  
},

});

//this.productService.dispatchProduct();
//console.log(this.productService.productOSubject.value)
this.productService.getProduct();


    
  }
  initproductForm(): void {
    this.productForm = this.formBuilder.group({
      id : [null],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      prix: [0, Validators.required],
      imgUrl: ['', Validators.required],
    });
  }
  onSubmitproductrForm(): void {
    const productId = this.productForm.value.id;
    let product = this.productForm.value;

    if(!productId || productId && productId ==='' ){ //creation
delete product.index;
 this.productService.creatProduct(product)
.catch(console.error); 

    }else{ // modification
      delete product.index;
       this.productService.editProduct(product,productId).catch(console.error);
    }


    this.productForm.reset();
    console.log(this.products);
  }
  onEditProduct(product :Product) :void {

    this.productForm.setValue({
id:product.id ? product.id : '',
titre:product.titre ? product.titre : '',
imgUrl:product.imgUrl ? product.imgUrl : '',
prix:product.prix ? product.prix : 0,
description:product.description ? product.description : '',






    });
  }
  onDeleteProduct(productId:string) : void {
if(productId){
  this.productService.deleteProduct(productId).catch(console.error);

}
else{
  console.error('an id must be provided to delete product !')
}
  }
  ngOnDestroy(): void {
    this.sucsription.unsubscribe();

  }

}
