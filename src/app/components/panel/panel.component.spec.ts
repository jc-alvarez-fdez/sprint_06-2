import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent]
    })
    .compileComponents();

    beforeEach(() => {
      fixture = TestBed.createComponent(PanelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    // Verifica la emisión de los eventos
    it('should emit paginesCanvi event when canviarPagines is called', () => {
      spyOn(component.paginesCanvi, 'emit');
      component.canviarPagines(1);
      expect(component.paginesCanvi.emit).toHaveBeenCalledWith(2); // Verifica si el evento fue emitido correctamente
    });

    it('should emit idiomesCanvi event when canviarIdiomes is called', () => {
      spyOn(component.idiomesCanvi, 'emit');
      component.canviarIdiomes(1);
      expect(component.idiomesCanvi.emit).toHaveBeenCalledWith(2); // Verifica si el evento fue emitido correctamente
    });

    it('should calculate totalPpto and emit totalPressupostCanvi event when calcularTotalPpto is called', () => {
      spyOn(component.totalPressupostCanvi, 'emit');
      spyOn(component, 'calcularTotalPpto').and.callThrough();
      component.paginesPreu = 2;
      component.idiomesPreu = 2;
      component.calcularTotalPpto();
      expect(component.totalPressupostCanvi.emit).toHaveBeenCalled(); // Verifica si el evento fue emitido
    });
  });
});
