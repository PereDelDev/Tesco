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



  @ViewChild('carouselTrack', { static: false }) carouselTrack!: ElementRef<HTMLDivElement>;

  isDragging = false;
  private startPosition = 0;
  private currentTranslate = 0;
  private prevTranslate = 0;
  private animationID: number | undefined;
  private index = 0;
  isActive = true

  ngOnInit() {
    this.index = Math.floor(this.arrCompanies.length / 2);
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

    this.index = Math.round(this.currentTranslate / -width); // 
    this.currentTranslate = this.index * -width;
    this.carouselTrack.nativeElement.style.transition = 'transform 0.5s ease';
    this.carouselTrack.nativeElement.style.transform = `translateX(${this.currentTranslate}px)`;

    setTimeout(() => {
      this.carouselTrack.nativeElement.style.transition = '';
    }, 500);
  }


  loop() {
    setInterval(() => {
      this.index = (this.index + 1) % this.arrCompanies.length;
      this.setPositionByIndex();

      console.log(this.index)
    }, 3000)


  }

}


