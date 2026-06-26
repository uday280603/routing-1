import { Injectable } from '@angular/core';
import { Iuser } from '../model/Iuser';
import { Observable, of } from 'rxjs';
import { Ires } from '../model/Ires';

@Injectable({
  providedIn: 'root',
})
export class UserService {
usersArray: Iuser[] = [
  {
    userName: 'Rahul',
    userId: '101',
    userRole: "Candidate",
    profileImage:
      'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?w=179&h=208&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    profileDescription:
      'Passionate Frontend Developer with expertise in Angular and modern web technologies.',
    skills: ['Angular', 'TypeScript', 'HTML', 'CSS'],
    experienceYears: '4',
    isActive: true,
    address: {
      current: {
        city: 'Pune',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '411001',
      },
      permanent: {
        city: 'Nashik',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '422001',
      },
    },
    isAddSame: false,
  },
  {
    userName: 'Priya',
    userId: '102',
    userRole: "Admin",
    profileImage:
      'https://th.bing.com/th/id/OIP.AbGafkazjc_S1pZPh0B9cQHaIm?w=179&h=208&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    profileDescription:
      'Experienced Backend Developer specializing in scalable APIs and database management.',
    skills: ['Node.js', 'Express', 'MongoDB'],
    experienceYears: '10+ Years',
    isActive: false,
    address: {
      current: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '400001',
      },
      permanent: {
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '400001',
      },
    },
    isAddSame: true,
  },
];

  constructor() {}

  fetchAll(): Observable<Iuser[]> {
    return of(this.usersArray);
  }

  getUserById(userId: string): Observable<Iuser> {
    let userObj = this.usersArray.find((u) => u.userId === userId)!;
    return of(userObj);
  }

  createUser(userObj: Iuser): Observable<Ires<Iuser>> {
    this.usersArray.unshift(userObj);
    return of({
      msg: `New user with id ${userObj.userId} is added successfully..!`,
      data: userObj,
    });
  }

  onUpdateUser(updatedObj : Iuser) : Observable<Ires<Iuser>>{
    let GETINDEX = this.usersArray.findIndex(u => u.userId === updatedObj.userId);
    this.usersArray[GETINDEX] = updatedObj;
    return of({
      msg : `Product with id ${updatedObj.userId} is updated successfylly..!`,
      data : updatedObj
    })
  }

  onRemove(userId : string) : Observable<Ires<Iuser>>{
    let GETINDEX = this.usersArray.findIndex(u => u.userId === userId);
    let arrar = this.usersArray.splice(GETINDEX,1);
    return of({
      msg : `The user with id ${userId} is removed successfully..!`,
      data : arrar[0]
    })

  }
}
