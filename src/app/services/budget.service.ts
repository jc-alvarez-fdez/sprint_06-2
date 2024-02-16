import { Injectable, OnInit } from '@angular/core';
import { serveis, panelServeis, client, pptoDemanat } from '../interfaces/formularis.interface'
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  // Creo un Subject para emitir los cambios en el array
  private pptosDemanatsSubject: Subject<pptoDemanat[]> = new Subject<pptoDemanat[]>();
  pptosDemanats$ = this.pptosDemanatsSubject.asObservable(); // Declaro un observable

  constructor() { }

  public serveis: serveis[] = [
    {
      id: 'Seo',
      describe: "Estratègia SEO personalitzada",
      seleccio: false,
      preu: 300
    },
    {
      id: 'Ads',
      describe: "Gestió de campanya Ads y i de xarxes socials",
      seleccio: false,
      preu: 400
    },
    {
      id: 'Web',
      describe: "Programació d'una Web responsive completa",
      seleccio: false,
      preu: 500
    }
  ];


  public panelServeis: panelServeis[] = [
    {
      afegir: 'pagines',
      num: 1
    },
    {
      afegir: 'idiomes',
      num: 1
    }
  ]

  public clientPpto: client = {
    nom: '',
    tel: 0,
    email: ''
    }



  getServeis(){
    return this.serveis;
  }

  calcularPreuWeb(pagines: number, idiomes: number) {
    const preuAfegir: number = 30;
    const preuBase: number = 530;

    let preuWeb = preuBase;

    if (pagines > 1) {
      preuWeb += (pagines - 1) * preuAfegir;
    }
    if (idiomes > 1) {
      preuWeb += (idiomes - 1) * preuAfegir;
    }

    return preuWeb;
  }


  guardarPpto(nouPressupost: pptoDemanat) {
    let pptosDemanats: pptoDemanat[] = [];

    // Obtener pptos guardados en local storage
    const pptosGuardats = localStorage.getItem('pptosDemanats');
    console.log("Datos almacenados en local storage:", pptosGuardats);

    if (pptosGuardats) {
      // Eliminar las comillas dobles adicionales si están presentes
      const datosSinComillas = pptosGuardats.replace(/^"|"$/g, '');
      try {
        pptosDemanats = JSON.parse(datosSinComillas);
      } catch (error) {
        console.error("Error al analizar los datos del local storage:", error);
      }
   }

   // Añadir fecha y hora al objeto de presupuesto
   const dataPpto = new Date();
   nouPressupost.data = dataPpto;

    // Añadir presupuesto al array
    pptosDemanats.push(nouPressupost);
    console.log("Nuevo ppto:", nouPressupost);

    // Guardar array actualizado en local storage
    localStorage.setItem('pptosDemanats', JSON.stringify(pptosDemanats));
    console.log("Pptos guardados:", pptosDemanats);

    // Después de guardar, emite el nuevo array a través del Subject
    this.pptosDemanatsSubject.next(pptosDemanats);
  }


  getPptosDemanats() {
    const pptosGuardats = localStorage.getItem('pptosDemanats');
    if (pptosGuardats) {
      try {
        return JSON.parse(pptosGuardats);
      } catch (error) {
        console.error("Error al analizar los datos del local storage:", error);
      }
    }
    return [];
  }








}
