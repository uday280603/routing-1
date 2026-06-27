import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/Iproduct';
import { Iuser } from 'src/app/shared/model/Iuser';
import { UserService } from 'src/app/shared/service/user.service';
import { MatButtonModule } from '@angular/material/button';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { useAnimation } from '@angular/animations';
import { GetConfirmationComponent } from '../../get-confirmation/get-confirmation.component';
import { SanckbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-s-user',
  templateUrl: './s-user.component.html',
  styleUrls: ['./s-user.component.scss'],
})
export class SUserComponent implements OnInit {
  getUserObj!: Iuser;
  userId!: string;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _matDialog: MatDialog,
    private _snackbar: SanckbarService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.userId = params['userId']!;
      this._userService.getUserById(this.userId).subscribe({
        next: (data) => {
          this.getUserObj = data;
        },
      });
    });
  }

  onRemove() {
    let config = new MatDialogConfig();
    config.disableClose = true;
    config.width = '400px';
    config.data = `Are you sure to remove the user with id ${this.userId}..?`;
    let _matRef = this._matDialog.open(GetConfirmationComponent, config);
    _matRef.afterClosed().subscribe((getconfirm) => {
      if (getconfirm) {
        this._userService.onRemove(this.userId).subscribe({
          next: (data) => {
            this._snackbar.openSnackbar(data.msg);
            this._router.navigate(['users']);
          },
        });
      }
    });
  }
}
