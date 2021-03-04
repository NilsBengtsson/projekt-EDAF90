import { Component } from '@angular/core';

export interface BookOption {
  name:string,
  value:BookItemComponent,
  checked:boolean
}

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {
  name:string = "";
  desc:string = "";
  author:string = "";
  id:string = "";
}
