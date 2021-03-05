import { EventEmitter } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef, Input, Output } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Input() myName : String = "Anonym";
  @Output() nameChange = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  changeName(nameInput: String){
    this.myName = nameInput;
    this.nameChange.emit(this.myName);
    console.log(this.myName);
  }
  

}
