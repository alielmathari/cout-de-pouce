import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { promises } from 'dns';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService   {


products : Product[]=[];
productOSubject : BehaviorSubject<Product[]>  = new BehaviorSubject(<Product[]>[]);

  constructor(private db: AngularFireDatabase) { 
    this.getProductOn();
  }

  getProduct() : void {
this.db.list('products').query.limitToLast(10).once('value', snapshot =>{
  console.log(snapshot);

const productsSnapshotValue = snapshot.val();
if(productsSnapshotValue){
  console.log('object ==> ' ,productsSnapshotValue);

  const products = Object.keys(productsSnapshotValue).map(id => ({id,...productsSnapshotValue[id]}));
  console.log('array ==> ' ,products);
  this.products = products ;
}


this.dispatchProduct();

})


  }
getProductOn() : void {

  this.db.list('products').query.limitToLast(10).once('value', snapshot =>{
    const productsSnapshotValue = snapshot.val();
    const products = Object.keys(productsSnapshotValue).map(id => ({id,...productsSnapshotValue[id]}));
    console.log('this is product ',products);




  })

}

  dispatchProduct() {
    this.productOSubject.next(this.products);

  }
  creatProduct(product:Product) : Promise<Product>{

return new Promise((resolve,reject)=>{
this.db.list('products').push(product)
.then(res=>{
 // console.log(res);
 const createdProduct ={...product ,id: <string>res.key};
 this.products.push(createdProduct);
 this.dispatchProduct();
  resolve(createdProduct);
}).catch(reject);
});
    
      }
     
          editProduct(product: Product , productId : string) :Promise <Product>{
return new Promise((resolve,reject)=>{

this.db.list('products').update(productId,product)
.then(()=>{
  const updatedProduct ={...product ,id:productId};
  const productToupdateIndex =this.products.findIndex(el =>el.id ===productId)
  this.products[productToupdateIndex] = updatedProduct;
  this.dispatchProduct();
resolve({...product,id:productId});
})

});
        
            
              }
              deleteProduct(productId : string) : Promise<Product> {

                return new Promise((resolve,reject)=>{

this.db.list('products').remove(productId)
.then(()=>{

const productDeleteIndex = this.products.findIndex(el => el.id === productId)
this.products.splice(productDeleteIndex);
this.dispatchProduct();
})
.catch(console.error);

                })
                
                  }
}
