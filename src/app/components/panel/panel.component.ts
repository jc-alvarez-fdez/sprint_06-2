import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ModalComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})

export class PanelComponent {

  // inputs recibidos del componente padre
  @Input() paginesPreu: number = 1;
  @Input() idiomesPreu: number = 1;

  // emisores de eventos para el componente padre
  @Output() paginesCanvi = new EventEmitter<number>();
  @Output() idiomesCanvi = new EventEmitter<number>();
  @Output() totalPressupostCanvi = new EventEmitter<number>();

  constructor( private BudgetService: BudgetService){}


  canviarPagines(canvi: number) {
    if (this.paginesPreu !== undefined) {
      this.paginesPreu = Math.max(1, this.paginesPreu + canvi);
    }
    this.paginesCanvi.emit(this.paginesPreu);
      this.calcularTotalPpto();
  }

  canviarIdiomes(canvi: number) {
    if (this.idiomesPreu !== undefined) {
    this.idiomesPreu = Math.max(1, this.idiomesPreu + canvi);
    }
    this.idiomesCanvi.emit(this.idiomesPreu);
      this.calcularTotalPpto();
  }

  calcularTotalPpto() {
    const totalPpto = this.BudgetService.calcularPreuWeb(
      this.paginesPreu,
      this.idiomesPreu
    );
    this.totalPressupostCanvi.emit(totalPpto);
  }


}
