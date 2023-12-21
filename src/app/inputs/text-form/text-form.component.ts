import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'text-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './text-form.component.html',
  styleUrl: './text-form.component.scss'
})
export class TextFormComponent  {

 @Input() name: string | undefined
 @Input() formControlName: string = ''
 @Input() mt: number = 2
 @Input() mb: number = 2 
 @Input() formGroup: any   // Adicione essa linha
/**
 *
 */
constructor(private el: ElementRef, private renderer: Renderer2) {}

ngOnInit() {
  // Garanta que o FormControl seja adicionado ao FormGroup
  if (this.formGroup && this.formControlName) {
    const control = new FormControl();
    this.formGroup.addControl(this.formControlName, control);
  }
}

ngAfterViewInit() {
  // Marque o componente como inicializado após a visualização ter sido inicializada
  this.renderer.addClass(this.el.nativeElement, 'initialized');
}
}
