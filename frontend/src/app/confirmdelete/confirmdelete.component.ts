import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-confirmdelete',
  templateUrl: './confirmdelete.component.html',
  styleUrls: ['./confirmdelete.component.css']
})
export class ConfirmdeleteComponent implements OnInit {

  constructor() { }

  @Input() deletedUser: User
  @Output() confirmationStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  onConfirmation(status: boolean){
    this.confirmationStatus.emit(status)
  }

}
