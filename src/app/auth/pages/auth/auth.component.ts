import { Component, inject, Signal } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RouterSignalStore } from '../../../shared/store/router.signal-store';
import { AuthSignalStore } from '../../store/auth.signal-store';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ImageModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    PasswordModule,
    FloatLabelModule,
    ReactiveFormsModule,
    Button,
    FormsModule,
    DividerModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  providers: [AuthSignalStore],
})
export class AuthComponent {
  private readonly routerSignalStore = inject(RouterSignalStore);
  private readonly authSignalStore = inject(AuthSignalStore);
  $signInIsLoading: Signal<boolean> = this.authSignalStore.signIn.isLoading;

  form = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(14),
    ]),
  });

  onClickSignUp = (): void => {
    console.log('signUp');
  };

  onClickSignIn = (): void => {
    const formData = this.form.getRawValue();
    if (formData.email && formData.password) {
      this.authSignalStore.signInRequest({
        request: { email: formData.email, password: formData.password },
      });
    }
    // this.routerSignalStore.navigate({ path: 'internal/home' });
  };
}
