import { Directive, ElementRef, Input, OnInit, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appCitaUrgente]',
  standalone: false
})
export class CitaUrgenteDirective implements OnInit {
  @Input('appCitaUrgente') esUrgente: boolean | string = false;
  @Input() fechaHora?: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.aplicarEstilosBase();
    this.evaluarUrgencia();
  }

  private aplicarEstilosBase(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.25s ease-in-out');
  }

  private evaluarUrgencia(): void {
    const esUrgencia = this.esUrgente === true || this.esUrgente === 'Urgencia Médica' || this.esUrgente === 'URGENCIA';

    if (esUrgencia) {
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #dc3545');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgba(220, 53, 69, 0.04)');
    } else if (this.fechaHora && this.esCitaHoy(this.fechaHora)) {
      this.renderer.setStyle(this.el.nativeElement, 'border-left', '5px solid #0d6efd');
      this.renderer.setStyle(this.el.nativeElement, 'background-color', 'rgba(13, 110, 253, 0.03)');
    }
  }

  private esCitaHoy(fechaStr: string): boolean {
    const f = new Date(fechaStr);
    const hoy = new Date();
    return (
      f.getFullYear() === hoy.getFullYear() &&
      f.getMonth() === hoy.getMonth() &&
      f.getDate() === hoy.getDate()
    );
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(-3px)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '0 0.5rem 1rem rgba(0, 0, 0, 0.12)');
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateY(0)');
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'none');
  }
}
