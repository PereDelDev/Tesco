import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot, faPhone, faPrint } from '@fortawesome/free-solid-svg-icons';
import { SliderComponent } from '../Components/slider/slider.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, SliderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  faLocationDot = faLocationDot
  faPrint = faPrint
  faPhone = faPhone
}
