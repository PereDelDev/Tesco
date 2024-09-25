import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Company } from '../../interfaces/companies.interface';
import { COMPANIES } from '../../data/company.data';

@Component({
  selector: 'slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})


export class SliderComponent implements OnInit {

  arrCompanies: Company[] = COMPANIES



  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef<HTMLDivElement>; // Usamos el nuevo { static: false }

  isDragging = false;
  private startPosition = 0;
  private currentTranslate = 0;
  private prevTranslate = 0;
  private animationID: number | undefined;
  private index = 0;
  isActive = true

  ngOnInit() {
    // Iniciamos el loop del carrusel
    this.index = Math.floor(this.arrCompanies.length / 2); // Empieza en el centro

    this.loop();
  }

  moveLeft() {
    this.currentTranslate += 200;
    this.carouselTrack.nativeElement.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  moveRight() {
    this.currentTranslate -= 200
    this.carouselTrack.nativeElement.style.transform = `translateX(${this.currentTranslate}px)`
  }

  setInitialPosition() {
    const width = this.carouselTrack.nativeElement.offsetWidth / (this.arrCompanies.length / 10);
    this.currentTranslate = this.index * -width;
    this.carouselTrack.nativeElement.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  ngAfterViewInit() {
    this.carouselTrack.nativeElement.addEventListener('dragstart', (e) => e.preventDefault());
    this.setInitialPosition()
  }

  onDragStart(event: MouseEvent) {
    this.isDragging = true;
    this.startPosition = event.pageX - this.carouselTrack.nativeElement.offsetLeft;
    this.prevTranslate = this.currentTranslate;
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', this.onDrag);
    this.animationID = requestAnimationFrame(this.animate);
  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    const currentPosition = event.pageX - this.carouselTrack.nativeElement.offsetLeft;
    const distanceMoved = currentPosition - this.startPosition;
    this.currentTranslate = this.prevTranslate + distanceMoved;

    setTimeout(() => {
      this.isActive = true
    }, 2000);
    console.log(this.onDrag)
  }

  onDragEnd() {
    this.isDragging = false;
    cancelAnimationFrame(this.animationID!);
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', this.onDrag);
    this.setPositionByIndex();
  }


  animate = () => {
    this.carouselTrack.nativeElement.style.transform = `translateX(${this.currentTranslate}px)`;
    if (this.isDragging) {
      requestAnimationFrame(this.animate)
    }
  }

  setPositionByIndex() {
    const width = this.carouselTrack.nativeElement.offsetWidth / this.arrCompanies.length;

    // Calcular el nuevo índice basado en la distancia total movida
    this.index = Math.round(this.currentTranslate / -width); // Redondear para la imagen más cercana

    // Asegurarse de que el índice no se salga de los límites
    /*  this.index = Math.max(0, Math.min(this.index, this.arrCompanies.length - 1)); */

    // Calcular la nueva posición de "currentTranslate" basada en el índice ajustado
    this.currentTranslate = this.index * -width;

    // Aplicar la transición de forma suave
    this.carouselTrack.nativeElement.style.transition = 'transform 0.5s ease';
    this.carouselTrack.nativeElement.style.transform = `translateX(${this.currentTranslate}px)`;

    // Eliminar la transición después de la animación para permitir el arrastre sin retraso
    setTimeout(() => {
      this.carouselTrack.nativeElement.style.transition = '';
    }, 500);
  }


  loop() {
    setInterval(() => {
      this.index = (this.index + 1) % this.arrCompanies.length;
      this.setPositionByIndex();

      console.log(this.index)
    }, 3000); // Cambia cada 3 segundos


  }

}


