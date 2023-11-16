import 'jest-preset-angular/setup-jest';

// Importa zone.js/testing antes de realizar cualquier configuración con TestBed
import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Primero, resetea el entorno de prueba existente en caso de que exista uno
getTestBed().resetTestEnvironment();

// Luego, inicializa el entorno de prueba para pruebas en el navegador
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
  {
    teardown: { destroyAfterEach: false },
  }
);
