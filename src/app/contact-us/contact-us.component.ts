import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLocationDot, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  faLocationDot = faLocationDot
  faPhone = faPhone
  faPrint = faPrint
  faEnvelope = faEnvelope

  Formulario: FormGroup = new FormGroup({
    //id segun base de datos sin implementar
    id: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    company: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    industry: new FormControl(null, Validators.required),
    service: new FormControl(null, Validators.required),
    details: new FormControl(null, Validators.required),
    contact: new FormControl(null, Validators.required)
  })

  onSubmit() {
    //Todo: Añadir check de validadores antes de enviar el formulario
    console.log(this.Formulario.value)
  }
}
