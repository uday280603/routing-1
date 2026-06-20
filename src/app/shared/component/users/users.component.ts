import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Iuser } from '../../model/Iuser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  getAllUsers!: Iuser[];

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._userService.fetchAll().subscribe({
      next: (data) => {
        this.getAllUsers = data;
      },
    });
  }
}
