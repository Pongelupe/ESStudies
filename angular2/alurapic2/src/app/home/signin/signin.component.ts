import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { PlataformDetectorService } from '../../core/plataform-detector/plataform-detector.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(private _formBuilder: FormBuilder,
    private _service: AuthService,
    private _router: Router,
    private _detector: PlataformDetectorService) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this._service.authenticate(userName, password)
      .subscribe(() => this._router.navigate(['user', userName]),
        err => {
          this.loginForm.reset();
          if (this._detector.isPlatformBrowser())
            this.userNameInput.nativeElement.focus();
        });
  }

}
