import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css'
})
export class AdminLogin {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required]
  });

  erro = '';
  carregando = false;

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.erro = '';

    const { usuario, senha } = this.form.value;

    // Simula delay de chamada de API
    setTimeout(() => {
      if (this.auth.login(usuario!, senha!)) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.erro = 'Usuário ou senha inválidos.';
        this.carregando = false;
      }
    }, 600);
  }
}
