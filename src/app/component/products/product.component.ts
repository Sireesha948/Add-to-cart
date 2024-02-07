import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  public productList:any;

  public filterCategory : any;

  searchKey:string = '';
  
  constructor(private api: ApiService, private cartSerivice:CartService){}

  ngOnInit():void{

    this.api.getProduct().subscribe(res => {

      this.filterCategory = res;

      this.productList = res;

      
      this.productList.forEach((a:any)=>{
        if(a.category === "women's clothing" || a.category === "men's clothing"){
           a.category = "fashion";
        }

        Object.assign(a,{quantity:1,total:a.price});

      });

     

    });

    
    this.cartSerivice.search.subscribe((val:any) =>{
      this.searchKey = val;
    })
    
  }

  addtocart(item:any){

    this.cartSerivice.addtoCart(item);

  }

  filter(category:string){

    this.filterCategory = this.productList.filter((a:any)=>{

      if(a.category == category || category == ''){
        return a;
      }


    })

  }

}
