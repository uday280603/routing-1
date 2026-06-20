import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/Iproduct';
import { Iuser } from 'src/app/shared/model/Iuser';
import { UserService } from 'src/app/shared/service/user.service';
import { MatButtonModule } from "@angular/material/button";
import { OverlayModule } from "@angular/cdk/overlay";

@Component({
  selector: 'app-s-user',
  templateUrl: './s-user.component.html',
  styleUrls: ['./s-user.component.scss'],
  
})
export class SUserComponent implements OnInit {

  getUserObj !: Iuser;
  userId !: string;

  constructor(private _activatedRoute : ActivatedRoute,
    private _userService : UserService
  ) { }

  ngOnInit(): void {
    this.getUser()

  }

  getUser(){
    this.userId = this._activatedRoute.snapshot.paramMap.get('userId')!;
    this._userService.getUserById(this.userId)
    .subscribe({
      next : data =>{
        this.getUserObj = data;
      }
    })
    
    
  }



}
