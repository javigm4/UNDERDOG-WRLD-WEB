import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const esAdmin = localStorage.getItem('esAdmin'); //obtenemos el esAdmin de localstorage

  if (esAdmin === 'true') {
    return true;
  } else {
    alert('NO ERES UN ADMINISTRADOR, SAL DE AQUI, PAYASO');
    return false;
  }
};
