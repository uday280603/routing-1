import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iuser } from 'src/app/shared/model/Iuser';
import { SanckbarService } from 'src/app/shared/service/snackbar.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  userForm!: FormGroup;
  userId!: string;
  userObj!: Iuser;
  isInEditMode: boolean = false;

  constructor(
    private _userservice: UserService,
    private _snackbar: SanckbarService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.onAddSkills();
    this.onSameAddresshandler();
    this.onPatchData();
  }

  onSameAddresshandler() {
    this.getControl['address'].get('current')?.valueChanges.subscribe((val) => {
      if (this.getControl['address'].get('current')?.valid) {
        this.getControl['isAddSame'].enable();
      } else {
        this.getControl['isAddSame'].disable();
      }
    });
    this.getControl['isAddSame'].valueChanges.subscribe((val) => {
      if (val) {
        let address = this.getControl['address'].get('current')?.value;
        this.getControl['address'].get('permanent')?.patchValue(address);
      } else {
        this.getControl['address'].get('permanent')?.reset();
      }
    });
  }
  createUserForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      userRole: new FormControl('Candidate'),
      profileImage: new FormControl(null, [Validators.required]),
      experienceYears: new FormControl(null, [Validators.required]),
      isActive: new FormControl(false, [Validators.required]),
      isAddSame: new FormControl({ value: null, disabled: true }),
      profileDescription: new FormControl(null, [Validators.required]),
      address: new FormGroup({
        current: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl(null, [Validators.required]),
          zipCode: new FormControl(null, [Validators.required]),
        }),
        permanent: new FormGroup({
          city: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          country: new FormControl(null, [Validators.required]),
          zipCode: new FormControl(null, [Validators.required]),
        }),
      }),
      skills: new FormArray([]),
    });
  }

  get getControl() {
    return this.userForm.controls;
  }
  onAddUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      let NEW_OBJ: Iuser = {
        ...this.userForm.value,
        userId: Date.now().toString(),
      };
      this._userservice.createUser(NEW_OBJ).subscribe({
        next: (data) => {
          this._snackbar.openSnackbar(data.msg);
          this._router.navigate(['users']);
          this.userForm.reset();
        },
        error: (err) => {
          this._snackbar.openSnackbar(err);
        },
      });
    }
  }

  get skillsArr() {
    return this.userForm.get('skills') as FormArray;
  }

  onAddSkills() {
    if (this.skillsArr.length < 3 && this.skillsArr.valid) {
      let control = new FormControl(null, [Validators.required]);
      this.skillsArr.push(control);
    }
  }
  onPatchData() {
    this.userId = this._activatedRoute.snapshot.paramMap.get('userId')!;

    if (this.userId) {
      this.isInEditMode = true;

      this._userservice.getUserById(this.userId).subscribe({
        next: (data) => {
          this.userObj = data;

          this.userForm.patchValue(this.userObj);

          // Patch permanent address
          this.userForm
            .get('address.permanent')
            ?.patchValue(this.userObj.address.permanent);

          // Patch skills
          this.skillsArr.clear();

          this.userObj.skills.forEach((skill) => {
            this.skillsArr.push(new FormControl(skill, Validators.required));
          });
        },
      });
    }
  }

  onUpdateUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      let UPDATED_OBJ: Iuser = {
        ...this.userForm.value,
        userId: this.userId,
      };
      this._userservice.onUpdateUser(UPDATED_OBJ).subscribe({
        next: (data) => {
          this._snackbar.openSnackbar(data.msg);
          this._router.navigate(['users']);
          this.userForm.reset();
        },
        error: (err) => {
          this._snackbar.openSnackbar(err);
        },
      });
    }
  }
}
