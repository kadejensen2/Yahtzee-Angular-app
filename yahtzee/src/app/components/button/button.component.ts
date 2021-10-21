import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input()
  text!: string;
  @Output() onClick = new EventEmitter<any>();

  onClickButton(event: any) {
      this.onClick.emit(event);
    }
  constructor() { }

  ngOnInit(): void {
  }

}
