
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class PersonalValidacions {


  static nombreValido(control: AbstractControl): ValidationErrors | null {
    const regex = new RegExp(/^[a-zA-Záéíóúñ ]+$/);
    if (regex.test(control.value)) {
      return null;
    }
    else {
      return {nombreValido: true}
    }

  }

  static  telefonoValido(control: AbstractControl): ValidationErrors | null {
    const regexTel = /^[0-9]{9}$/;
    if (regexTel.test(control.value)) {
      return null;
    }
    else {
      return {telefonoValido: true}
    }
  
  }

  static  emailValido(control: AbstractControl): ValidationErrors | null {
    const regexMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regexMail.test(control.value)) {
      return null;
    }
    else {
      return {emailValido: true}
    }
  
    }

  static totalValido(control: AbstractControl): ValidationErrors | null {

    if ((control.value) !== 0) {
      return null;
    }
    else {
      return {totalValido: true}
    }
  }


}
