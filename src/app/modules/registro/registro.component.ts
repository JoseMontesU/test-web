import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RegistroService } from '../../core/services/registro.service';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { error } from 'console';

@Component({
  selector: 'app-registro',
  imports: [RouterModule,MatButtonModule, MatDividerModule, MatIconModule,
    FormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, ReactiveFormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {

  form!: FormGroup;
  
  constructor(
    private readonly registroService: RegistroService,
    private fb: FormBuilder,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.registroService.getToken()
    .subscribe(reponse => {
      console.log('Token received:', reponse);
    });
  }

  initForm() {
    this.form = this.fb.group({
      tipo_documento: [''],
      numero_documento: [''],
      nombre: [''],
      apellido: [''],
      fecha_nacimiento: [''],
      lugar_residencia: [''],
      telefono: [''],
      correo: [''],
      password: [''],
      genero: [''],
      bono_bienvenida: [''],
      token: [''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.registroService.register(this.form.value)
        .subscribe();
    } else {
      console.log('Form is invalid');
    }
  }

}
