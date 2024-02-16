import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // Configuración inicial antes de ejecutar los tests
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        ReactiveFormsModule,
        BudgetService
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent); // Creamos una instancia del componente
    component = fixture.componentInstance; // Accedemos a la instancia del componente
    fixture.detectChanges(); // Detectamos cambios en el componente
  });


  // Si el componente se ha creado corractamente, debería existir
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //Compruebo que los controles del formulario se actualicen correctamente
  it('should initialize form controls', () => {
    expect(component.pptoForm.get('Seo)')).toBeTruthy();
    expect(component.pptoForm.get('Ads)')).toBeTruthy();
    expect(component.pptoForm.get('Web)')).toBeTruthy();
    expect(component.pptoForm.get('numPagines)')).toBeTruthy();
    expect(component.pptoForm.get('numIdiomes)')).toBeTruthy();
    expect(component.pptoForm.get('totPpto)')).toBeTruthy();
    expect(component.pptoForm.get('nom)')).toBeTruthy();
    expect(component.pptoForm.get('tel)')).toBeTruthy();
    expect(component.pptoForm.get('email)')).toBeTruthy();
  });

  // Compruebo el cálculo del total del presupuesto
  it('should calculate total ppto correctly', () => {
    component.pptoForm.get('seo')!.setValue(true);
    component.pptoForm.get('ads')!.setValue(true);
    component.calcularTotalPpto();
    expect(component.pptoForm.get('totPpto')!.value).toBe(700); // Verifica el total esperado
  });

});
