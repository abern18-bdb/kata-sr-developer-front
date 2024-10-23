import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('loader') loaderRef!: ElementRef<HTMLBdbMlLoaderElement | any>;
  @ViewChild('toast') toastRef!: ElementRef<HTMLBdbAtToastElement | any>;

  private readonly input: string = 'bdb-at-input';
  private readonly createInputConfig = (
    id: string,
    label: string,
    placeholder: string,
    type: string,
    message: string
  ) => ({
    component: this.input,
    name: id,
    props: {
      idEl: id,
      name: id,
      label: label,
      placeholder: placeholder,
      type: type,
      status: 'ENABLED',
      required: 'true',
      message: message,
      viewMode: true,
      passwordMode: true,
    },
  });

  public leftElements = [
    this.createInputConfig(
      'userId',
      'Usuario',
      'Ingresa el usuario',
      'ALPHANUMERIC',
      'Digite el usuario'
    ),
    this.createInputConfig(
      'password',
      'Contraseña',
      'Ingresa la contraseña',
      'PASSWORD',
      'Digite contraseña'
    )
  ];

  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit($event: any) {
    this.loaderRef.nativeElement.openLoader();

    this.authService.login($event.detail[0].value, $event.detail[1].value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tasks']);
        this.loaderRef.nativeElement.closeLoader();
      },
      error: (error) => {
        this.errorMessage = error.error.error;
        this.toastRef.nativeElement.show();
        this.loaderRef.nativeElement.closeLoader();
      }
    });
  }
}
