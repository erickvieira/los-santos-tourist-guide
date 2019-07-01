import { style, animate, transition, trigger, keyframes } from '@angular/animations';

export const easyInOutVer = trigger('easyInOutVer', [
  transition(':enter', [
    animate(
      '800ms ease-in',
      keyframes([
        style({
          maxHeight: 0,
          color: 'transparent',
        }),
        style({
          maxHeight: '100vh',
          color: 'white',
        }),
      ]),
    ),
  ]),
  transition(':leave', [
    animate(
      '500ms ease-out',
      keyframes([
        style({
          maxHeight: '100vh',
          color: 'white',
        }),
        style({
          maxHeight: 0,
          color: 'transparent',
        }),
      ]),
    ),
  ]),
]);
