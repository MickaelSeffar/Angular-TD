import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {UserLdap} from "../../models/user-ldap.model";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {UsersService} from "../../service/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css']
})
export class LdapListComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource: MatTableDataSource<UserLdap> = new MatTableDataSource<UserLdap>([]);

  //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | null;
  unactiveSelected = false;

  constructor(private userService: UsersService, private router: Router) {
  }

  ngOnInit() {
    //this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: UserLdap, filter) => this.filterPredicate(data, filter);
    this.getUsers();
  }

  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter.toLowerCase());
  }


  applyFilter($event: KeyboardEvent): void {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        if (this.unactiveSelected) {
          this.dataSource.data = users.filter(user =>
            user.active === false
          );
        } else {
          this.dataSource.data = users
        }
      });
  }

  unactiveChanged($event: MatSlideToggleChange): void {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(login: string): void {
    this.router.navigate(['users/', login]).then((e) => {
      if (!e) {
        console.error('Navigation has failed !');
      }
    });
  }

  addUser(){
    this.router.navigate(['/users/add']).then((e)=> {
      if (!e){
        console.log('Navicagion has failed !')
      }
    })
  }
}
