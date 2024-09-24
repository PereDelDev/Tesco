import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})


export class SliderComponent implements OnInit {

  images = [
    { src: '../../../assets/img/tesco-bldg.jpg', alt: 'Image 1', link: 'https:example.com/1' },
    { src: '../../../assets/img/6409a74f-34e7-44f8-9a37-75d8795f1791.jpg', alt: 'Image 2', link: 'https:example.com/2' },
    { src: '../../../assets/img/dbdff020-60fc-40fe-bb6c-81f7dd86c905.jpg', alt: 'Image 3', link: 'https:example.com/3' },
    { src: '../../../assets/img/3fe5f42d-ab68-4c8c-8977-b25abf9dd303.jpg', alt: 'Image 4', link: 'https:example.com/4' },
    { src: '../../../assets/img/tesco-bldg.jpg', alt: 'Image 1', link: 'https:example.com/1' },
    { src: '../../../assets/img/6409a74f-34e7-44f8-9a37-75d8795f1791.jpg', alt: 'Image 2', link: 'https:example.com/2' },
    { src: '../../../assets/img/dbdff020-60fc-40fe-bb6c-81f7dd86c905.jpg', alt: 'Image 3', link: 'https:example.com/3' },
    { src: '../../../assets/img/3fe5f42d-ab68-4c8c-8977-b25abf9dd303.jpg', alt: 'Image 4', link: 'https:example.com/4' },
    { src: '../../../assets/img/tesco-bldg.jpg', alt: 'Image 1', link: 'https:example.com/1' },
    { src: '../../../assets/img/6409a74f-34e7-44f8-9a37-75d8795f1791.jpg', alt: 'Image 2', link: 'https:example.com/2' },
    { src: '../../../assets/img/dbdff020-60fc-40fe-bb6c-81f7dd86c905.jpg', alt: 'Image 3', link: 'https:example.com/3' },
    { src: '../../../assets/img/3fe5f42d-ab68-4c8c-8977-b25abf9dd303.jpg', alt: 'Image 4', link: 'https:example.com/4' },
    { src: '../../../assets/img/tesco-bldg.jpg', alt: 'Image 1', link: 'https:example.com/1' },
    { src: '../../../assets/img/6409a74f-34e7-44f8-9a37-75d8795f1791.jpg', alt: 'Image 2', link: 'https:example.com/2' },
    { src: '../../../assets/img/dbdff020-60fc-40fe-bb6c-81f7dd86c905.jpg', alt: 'Image 3', link: 'https:example.com/3' },
    { src: '../../../assets/img/3fe5f42d-ab68-4c8c-8977-b25abf9dd303.jpg', alt: 'Image 4', link: 'https:example.com/4' },



  ]
  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef<HTMLDivElement>; // Usamos el nuevo { static: false }

  private isDragging = false;
  private startPosition = 0;
  private currentTranslate = 0;
  private prevTranslate = 0;
  private animationID: number | undefined;
  private index = 0;

  ngOnInit() {
    // Iniciamos el loop del carrusel
    this.loop();
  }

  ngAfterViewInit() {
    this.carouselTrack.nativeElement.addEventListener('dragstart', (e) => e.preventDefault());
  }

  onDragStart(event: MouseEvent) {
    this.isDragging = true;
    this.startPosition = event.pageX - this.carouselTrack.nativeElement.offsetLeft;
    this.prevTranslate = this.currentTranslate;
    // Ensure no text selection while dragging
    document.body.style.userSelect = 'none';

    // Listen globally for mouse movements and mouseup events
    document.addEventListener('mousemove', this.onDrag);
    document.addEventListener('mouseup', this.onDragEnd);

    this.animationID = requestAnimationFrame(this.animate);

  }

  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    const currentPosition = event.pageX - this.carouselTrack.nativeElement.offsetLeft;
    const distanceMoved = currentPosition - this.startPosition;
    this.currentTranslate = this.prevTranslate + distanceMoved;

  }

  onDragEnd() {
    this.isDragging = false;
    cancelAnimationFrame(this.animationID!);
    // Re-enable text selection
    document.body.style.userSelect = '';

    // Remove global listeners
    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.onDragEnd);

    this.setPositionByIndex();
    console.log('funciona')

  }


  animate = () => {
    this.carouselTrack.nativeElement.style.transform = `translateX(${this.currentTranslate}px)`;
    if (this.isDragging) {
      requestAnimationFrame(this.animate);  // Keep calling animate with correct context
    }
  }

  setPositionByIndex() {
    const width = this.carouselTrack.nativeElement.offsetWidth / this.images.length;
    this.index = this.currentTranslate < this.prevTranslate ? this.index + 1 : this.index - 1;
    this.index = Math.max(0, Math.min(this.index, this.images.length - 1)); // Evita que se salga de los límites
    this.currentTranslate = this.index * -width;
    this.carouselTrack.nativeElement.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  loop() {
    setInterval(() => {
      this.index = (this.index + 1) % this.images.length;
      this.setPositionByIndex();

      console.log(this.index)
    }, 3000); // Cambia cada 3 segundos


  }

}


