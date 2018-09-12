import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { takeWhile } from 'rxjs/operators';
import { ErrorService } from '../../../core/services/error.service';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  configs = {
    isLogin: true,
    actionText: 'SignIn',
    buttonActionText: 'Create account',
    isLoading: false
  };
  private nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  private alive = true;

  @HostBinding('class.app-login-spinner') private applySpinnerClass = true;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private errorService: ErrorService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);

    this.configs.isLoading = true;

    const operation: Observable<{ id: string, token: string }> =
      this.configs.isLogin ? this.authService.signinUser(this.loginForm.value)
        : this.authService.signupUser(this.loginForm.value);

    operation
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(res => {
        console.log('Redirecting...', res);
        const redirect = this.authService.redirectUrl || '/dashboard';
        this.authService.redirectUrl = null;
        this.configs.isLoading = false;
      }, err => {
        const error = this.errorService.getErrorMessage(err);
        console.log(error);
        this.configs.isLoading = false;
        this.snackBar.open(error, 'Done', {
          duration: 5000,
          verticalPosition: 'top'
        });
      },
        () => console.log('Observable completed!'));
  }

  changeAction(): void {
    this.configs.isLogin = !this.configs.isLogin;
    this.configs.actionText = !this.configs.isLogin ? 'SignUp' : 'SignIn';
    this.configs.buttonActionText = !this.configs.isLogin ? 'Already have acconunt' : 'Create account';
    !this.configs.isLogin ? this.loginForm.addControl('name', this.nameControl) : this.loginForm.removeControl('name');
  }

  get email(): FormControl { return <FormControl>this.loginForm.get('email'); }

  get name(): FormControl { return <FormControl>this.loginForm.get('name'); }

  get password(): FormControl { return <FormControl>this.loginForm.get('password'); }

  ngOnDestroy() { this.alive = false; }

  onKeepSigned(): void { this.authService.toggleKeepSigned(); }
}
