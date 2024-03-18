import { format } from 'date-fns';
import getData from './apiService';
import { searchButton, colorChange } from './data';

export function formatDate(dates, propName) {
  return dates.map((date) => {
    const newDate = new Date(date[propName]);
    return format(newDate, 'EEEE, dd MMM');
  });
}

export function findProp(array, propName, childProp) {
  return array.map((el) => {
    const propValue = el[propName];
    if (propValue?.[childProp] !== undefined) {
      return propValue?.[childProp];
    }
    return propValue;
  });
}

export function getNextHours(currentTime, numHours) {
  const [currentHour] = currentTime.split(':').map(Number);
  let hourIncrement = 1; // Разница в часах между элементами массива
  const nextHours = [];

  for (let i = 0; i < numHours; i++) {
    let nextHourValue = currentHour + hourIncrement;
    if (nextHourValue >= 24) {
      nextHourValue -= 24; // Переход на следующий день
    }
    const nextHour = (nextHourValue < 10 ? '0' : '') + nextHourValue;
    nextHours.push(`${nextHour}:00`);
    hourIncrement++;
  }

  return nextHours;
}

export async function handleButtonSearch() {
  try {
    searchButton.disabled = true;
    await getData();
    searchButton.disabled = false;
  } catch (error) {
    searchButton.disabled = true;
    console.error(error);
  }
}

export function hadleColorChange() {
  document.body.classList.toggle('black');
  colorChange.textContent =
    colorChange.textContent === 'Dark mode' ? 'White mode' : 'Dark mode';
}
