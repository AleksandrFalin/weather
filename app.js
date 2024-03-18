import { searchButton, colorChange } from './data';
import { handleButtonSearch, hadleColorChange } from './utils';

colorChange.addEventListener('click', hadleColorChange);
searchButton.addEventListener('click', handleButtonSearch);
