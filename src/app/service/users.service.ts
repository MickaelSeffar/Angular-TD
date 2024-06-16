import {Injectable} from '@angular/core';
import {UserLdap} from "../models/user-ldap.model";
import {LDAP_USERS} from "../models/ldap-mock-data";
import {Observable, of, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: UserLdap[] = LDAP_USERS;
  private usersUrl ='api/users';
  private httpOptions = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  addUser(user: UserLdap): Observable<UserLdap> {
   return this.http.post<UserLdap>(this.usersUrl, user, {
     headers: this.httpOptions
   });
  }

  updateUser(user:UserLdap): Observable<UserLdap>{
    return this.http.put<UserLdap>(this.usersUrl+'/'+user.id, user,{
      headers:this.httpOptions
    });
  }

  getUsers(): Observable<UserLdap[]> {
    return this.http.get<UserLdap[]>(this.usersUrl);
  }


  getUser(id: number): Observable<UserLdap> {
    return this.http.get<UserLdap>(this.usersUrl+'/'+id);
  }

  deleteUser(id:number): Observable<UserLdap> {
    return this.http.delete<UserLdap>(this.usersUrl+'/'+id,{
      headers: this.httpOptions
    });
  }
}


