import {Injectable} from '@angular/core';
import {UserLdap} from "../models/user-ldap.model";
import {LDAP_USERS} from "../models/ldap-mock-data";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: UserLdap[] = LDAP_USERS;

  constructor() {
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    this.users.push(user);
    return of(user);
  }

  updateUser(userToUpdate:UserLdap): Observable<UserLdap>{
    const user = this.users.find(u=>u.login === userToUpdate.login);
    if (user){
      user.nom = userToUpdate.nom;
      user.prenom = userToUpdate.prenom;
      user.nomComplet = userToUpdate.nomComplet;
      user.motDePasse = userToUpdate.motDePasse;
      return of(userToUpdate);
    }
    return throwError(()=>new Error('Utilisateur non trouvé'));
  }

  getUsers(): Observable<UserLdap[]> {
    return of(this.users);
  }


  getUser(login: string): Observable<UserLdap> {
    const user: UserLdap | undefined = this.users.find(user => user?.login === login);
    if (user !== undefined)
      return of(user);

    return throwError(() => new Error('Utilisateurs non trouvé'));
  }
}


