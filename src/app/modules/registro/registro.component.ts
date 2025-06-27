import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RegistroService } from '../../core/services/registro.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-registro',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {

  form!: FormGroup;
  bonos = [
    {
      id: 1,
      titulo: 'BONO DEPORTES',
      descripcion: 'S/10 apuesta gratis para deportes',
      value: 'BONO DEPORTES',
      monto: 10.00,
      img: '/img4.jpg'
    },
    {
      id: 2,
      titulo: 'BONO CASINO',
      descripcion: 'Obtén tus 100 giros gratis y gana.',
      value: 'BONO CASINO',
      monto: 50.00,
      img: '/img3.png'
    },
    {
      id: 3,
      titulo: 'BONO CASINO EN VIVO',
      descripcion: 'S/10 para ruleta, fútbol Studio y más',
      value: 'BONO CASINO EN VIVO',
      monto: 10.00,
      img: '/img8.png'
    },
    {
      id: 4,
      titulo: 'SIN BONO',
      descripcion: 'Escríbenos si cambias de opinión',
      value: 'SIN BONO',
      monto: 0.00,
      img: '/img9.jpg'
    }
  ];

  bonoSeleccionado: any = null;
  errorMsg: string | null = null;


  tokenGenerado: string | null = null;
  tokenCopiado: boolean = false;

  constructor(
    private readonly registroService: RegistroService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initForm();
  }

ngOnInit(): void {
  this.registroService.getToken().subscribe((response: any) => {

    this.tokenGenerado = response.token;
    this.form.patchValue({ token: this.tokenGenerado });
  });
}

  minAgeValidator(minAge: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age >= minAge ? null : { minAge: { requiredAge: minAge, actualAge: age } };
    };
  }

  initForm() {
    this.form = this.fb.group({
      tipo_documento: ['', Validators.required],
      numero_documento: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      fecha_nacimiento: ['', [Validators.required, this.minAgeValidator(18)]],
      lugar_residencia: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      genero: ['', Validators.required],
      bono_bienvenida: [{ value: '', disabled: false }, Validators.required],
      token: ['', Validators.required],
    });
  }

  seleccionarBono(bono: any) {
    this.bonoSeleccionado = bono;
    this.form.patchValue({ bono_bienvenida: bono.monto });
  }

  cambiarBono() {
    this.bonoSeleccionado = null;
    this.form.patchValue({ bono_bienvenida: '' });
  }

  onSubmit() {
    this.errorMsg = null;
    if (this.form.valid) {
      this.registroService.register(this.form.value)
        .subscribe({
          next: (res) => {
            this.router.navigate(['/']);
          },
          error: (err) => {
            if (err.status === 400 && err.error?.message) {
              this.errorMsg = Array.isArray(err.error.message) ? err.error.message[0] : err.error.message;
            } else {
              this.errorMsg = 'Ocurrió un error inesperado. Intenta nuevamente.';
            }
          }
        });
    } else {
      this.errorMsg = 'Por favor completa todos los campos obligatorios.';
    }
  }

  copiarToken() {
    if (this.tokenGenerado) {
      navigator.clipboard.writeText(this.tokenGenerado);
      this.tokenCopiado = true;
      setTimeout(() => this.tokenCopiado = false, 2000);
    }
  }
}
