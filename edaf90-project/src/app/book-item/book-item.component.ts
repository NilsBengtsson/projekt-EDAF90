import { Component } from '@angular/core';

export interface BookOption {
  name:string,
  value:BookItemComponent,
  checked:boolean
}

export class BookItemComponent {
  name:string = "";
  desc:string = "";
  author:string = "";
  id:string = "";
}
