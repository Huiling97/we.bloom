import '@testing-library/jest-dom';

//Fix for "ReferenceError: TextDecoder is not defined" error
import { TextEncoder, TextDecoder } from 'util';
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

//Fix for "matchMedia not present, legacy browsers require a polyfill jest" error
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

//Fix for "FIREBASE FATAL ERROR: Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."
jest.mock('firebase/database', () => ({
  getDatabase: jest.fn(),
  ref: jest.fn(),
  onValue: jest.fn(),
}));
