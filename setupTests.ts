import '@testing-library/jest-dom';

//Fix for "ReferenceError: TextDecoder is not defined" error
import { TextEncoder, TextDecoder } from 'util';
interface CustomGlobal {
  TextEncoder: typeof TextEncoder;
  TextDecoder: typeof TextDecoder;
}
(global as CustomGlobal).TextEncoder = TextEncoder;
(global as CustomGlobal).TextDecoder = TextDecoder;

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
