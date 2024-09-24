import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faEnvelope, faLocationDot, faLocationPin, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  faLocationDot = faLocationDot
  faPhone = faPhone
  faPrint = faPrint
  faEnvelope = faEnvelope
}
