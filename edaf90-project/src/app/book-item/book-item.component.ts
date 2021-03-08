import { Component } from '@angular/core';

export interface BookOption {
  name:string,
  value:BookItemComponent,
  checked:boolean,
  deleting:boolean,
  revieweing:boolean
}

export class BookItemComponent {
  name:string = "";
  desc:string = "";
  author:string = "";
  id:string = "";
  review:string = "";

}
