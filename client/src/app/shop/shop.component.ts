import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brands';
import { IProduct } from '../shared/models/products';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  
  @ViewChild('search', {static: true}) searchTerm: ElementRef;
  products: IProduct[];
  brands:IBrand[];
  productTypes: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions =[
      {name: 'Alphabetical (A-Z)', value: 'name'},
      {name: 'Price: Low to High', value: 'priceAsc'},
      {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopSerivce: ShopService) { }

  ngOnInit(){
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts()
  {
    this.shopSerivce.getProducts(this.shopParams).subscribe(response =>
      {
          this.products = response.data;
          this.shopParams.pageNumber = response.pageIndex;
          this.shopParams.pageSize = response.pageSize;
          this.totalCount = response.count;
      }, error => {
        console.log(error);
      });
  }
  getBrands()
  {
    this.shopSerivce.getBrands().subscribe(response =>
      {
        this.brands = [{id: 0, name: 'All'}, ...response];
      },
      error => 
      {
        console.log(error);
      });
      
  }
  getTypes()
  {
    this.shopSerivce.getTypes().subscribe(response =>
      {
        this.productTypes = [{id: 0, name: 'All'}, ...response];
      },
      error => 
      {
        console.log(error);
      });
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string)
  {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any)
  {
    //NOTICE: prevent multiple calles across the network
    if(this.shopParams.pageNumber !== event)
    {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }



  // TODO: create a parsing system for if the user enters multiple inputs either by ' ' whitespace or adds a '+' too lookup items
  onSearch(){
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset()
  {
    this.searchTerm.nativeElement.value = undefined;
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
