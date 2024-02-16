import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { PanelComponent } from '../panel/panel.component';
import { NgIf } from '@angular/common';
import { serveis, panelServeis, client } from '../../interfaces/formularis.interface';
import { ListPptosComponent } from '../list-pptos/list-pptos.component';
import { PersonalValidacions } from '../validacions/personal-validacions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PanelComponent,
    ListPptosComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  public serveis = this.BudgetService.getServeis();
  pptoForm: FormGroup;
  nomErrors: string = "";
  telErrors: string = "";
  emailErrors: string = "";
  totPptoErrors: string = "";


  constructor(
    private fb: FormBuilder,
    private BudgetService: BudgetService
  ) {
    // Inicializar el formulario
    this.pptoForm = this.fb.group({
      seo: true,
      ads: false,
      web: false,
      numPagines: new FormControl(1),
      numIdiomes: new FormControl(1),
      totPpto: [300, [Validators.required, PersonalValidacions.totalValido]],
      nom: ['', [Validators.required, PersonalValidacions.nombreValido]],
      tel: ['', [Validators.required, PersonalValidacions.telefonoValido]],
      email: ['', [Validators.required, PersonalValidacions.emailValido]],
    });


  }

  // Calcular total del ppto
  calcularTotalPpto() {
    let totPpto: number = 0;

    if (this.pptoForm.get('seo')!.value) {
      totPpto += 300;
    }
    if (this.pptoForm.get('ads')!.value) {
      totPpto += 400;
    }
    if (this.pptoForm.get('web')!.value) {
      totPpto += this.BudgetService.calcularPreuWeb(
        this.pptoForm.get('numPagines')!.value,
        this.pptoForm.get('numIdiomes')!.value
      );
    }
    this.pptoForm.get('totPpto')!.setValue(totPpto);
  }



  onPaginesCanvi(nouPagines: number) {
    this.pptoForm.get('numPagines')!.setValue(nouPagines);
    this.calcularTotalPpto();
  }

  onIdiomesCanvi(nouIdiomes: number) {
    this.pptoForm.get('numIdiomes')!.setValue(nouIdiomes);
    this.calcularTotalPpto();
  }

  demanarPpto(event: Event) {
    event.preventDefault(); // Evita que el formulari s'enviï

    if (this.pptoForm.valid && this.pptoForm.touched) {
      const nouPressupost = this.pptoForm.getRawValue();
      console.log("Ptpo capturado: ", nouPressupost);
      this.BudgetService.guardarPpto(nouPressupost);
      this.pptoForm.reset();
      this.pptoForm.get('seo')?.reset(true);
      this.pptoForm.get('totPpto')?.reset(300);
      this.pptoForm.get('numPagines')?.reset(1);
      this.pptoForm.get('numIdiomes')?.reset(1);
    } else {
      // Mostrar un mensaje al usuario indicando que hay errores en el formulario
      console.log("Formulario no válido");
    }
  }

}



/* // Validaciones

nombreValido(control: FormControl): ValidationErrors | null {
  const regex = new RegExp(/^[a-zA-Záéíóúñ ]+$/);
  if (!regex.test(control.value)) {
    return { nombreInvalido: true };
  }
  return null;
}

  telefonoValido(control: FormControl): ValidationErrors | null {
  const regexTel = /^[0-9]{9}$/;
  if (!regexTel.test(control.value)) {
    return { telefonoInvalido: true };
  }
  return null;
}

  emailValido(control: FormControl): ValidationErrors | null {
  const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!regexMail.test(control.value)) {
    return { emailInvalido: true };
  }
  return null;
}

totalValido(control: FormControl): ValidationErrors | null {

  if ((control.value) === 0) {
    return { totalInvalido: true };
  }
  return null;
}

*/






