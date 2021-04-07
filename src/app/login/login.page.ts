import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  signIn: FormGroup;
  submitError: string;
  validationMessages = {
    careProviderEmail: [
      {type: 'required', message: 'Care provider id is required.'},
      {type: 'pattern', message: 'Enter a valid care provider id.'}
    ],
    password: [
      {type: 'required', message: 'Password is required.'},
      {type: 'minlength', message: 'Password must be at least 6 characters long.'}
    ],
  };

  constructor(private router: Router, private toastController: ToastController) {
    this.signIn = new FormGroup({
      careProviderEmail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
  }

  async signInWithId() {
    if (this.signIn.controls.careProviderEmail.status === 'INVALID'
    || this.signIn.controls.password.status === 'INVALID') {
      const toast = await this.toastController.create({
        message: 'Invalid credentials. Try again',
        duration: 2000
      });
      toast.present();
      return;
    }
    this.router.navigate(['/home']);
  }

}
