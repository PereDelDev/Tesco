import { Component } from '@angular/core';
import { SliderComponent } from '../Components/slider/slider.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SliderComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
