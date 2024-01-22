import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItems:[]=[];
  constructor(private _SharedService:SharedService){
  }
  ngOnInit(){
    this._SharedService.sharedData.subscribe(data => {
      this.cartItems = data;
    });

    // this.cartItems = JSON.parse(localStorage.getItem("cart")!)
    // console.log("cartItems:"+this.cartItems)
  }
  performSearch() {
    // Your search logic here
  }
}
