import {Component, OnInit} from '@angular/core';
import {LdapDetailsComponent} from "../ldap-details/ldap-details.component";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../service/users.service";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ldap-edit',
  templateUrl: '../ldap-details/ldap-details.component.html',
  styleUrls: ['../ldap-details/ldap-details.component.css']
})
export class LdapEditComponent extends LdapDetailsComponent implements OnInit {


  constructor(private userService: UsersService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute,
              fb: FormBuilder,
              router: Router) {
    super(false ,fb, router);
  }

  ngOnInit() {
    super.onInit();
    this.getUser();
  }

  validateForm(): void {
    console.log('LdapEditComponent - validateForm')
    this.processValidateRunning = true;
    this.userService.updateUser(this.getUserFromFormControl()).subscribe({
      next:(value)=> {
        this.processValidateRunning = false;
        this.errorMessage = '';
        this.snackBar.open('Utilisateur modifié !', 'X');
      },
      error : (err)=> {
        this.processValidateRunning = false;
        this.errorMessage = 'Une erreur est survenue dans la modification';
        console.error('Modification utilisateur',err );
        this.snackBar.open('Utilisateur non modifié','X');
      }
    });
  }

  private getUser():void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id === null){
      console.error("Can't retreive user id from URL");
      return;
    }

    this.userService.getUser(id).subscribe({
      next : (user)=> {
        this.user = user;
        this.copyUserToFormControl();
        console.log('LDapDetails getUser = ',user);
      },
      error:(err) => {
        this.processValidateRunning = false;
        this.errorMessage = "L'utilisateur n'existe pas !";
        console.error('Obteitnion utilisateur',err);
        this.snackBar.open('Utilisateur non trouvé !','X');
      }
    });
  }
}
