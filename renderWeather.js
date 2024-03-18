import { format } from 'date-fns';
import wind from './image/wind.png';
import cloud from './image/cloud.png';
import { formatDate, findProp, getNextHours } from './utils';
import selectImage from './weather-pic';
import { displayWeather } from './data';

export default async function render(weatherData, timeData) {
  const city = timeData?.geo.location;
  // eslint-disable-next-line no-unsafe-optional-chaining
  const modiCity = city?.charAt(0).toUpperCase() + city?.slice(1).toLowerCase();
  const time = timeData?.time_24?.substring(0, 5);
  const date = format(timeData?.date_time_txt, 'EEEE, MMMM dd');
  const mytime = format(timeData?.date_time_txt, 'HH:mm');
  const temp = Math.floor(weatherData?.current?.temperature);
  const min = Math.floor(weatherData?.daily?.data[0]?.all_day?.temperature_min);
  const max = Math.floor(weatherData?.daily?.data[0]?.all_day?.temperature_max);
  const windCurrent = weatherData?.current?.wind?.speed;
  const cloudCover = weatherData?.current?.cloud_cover;
  const weatherTitle = weatherData?.current?.summary;
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { morning, evening } = weatherData?.daily?.data[0];

  const dailyForecast = weatherData?.daily?.data;
  const hourlyForecast = weatherData?.hourly?.data;
  const intervalTimes = getNextHours(mytime, 5);
  const matchedData = intervalTimes.map((hour) => {
    const apiEntry = hourlyForecast?.find(
      (entry) => format(entry?.date, 'HH:mm') === hour,
    );
    return apiEntry
      ? {
          time: hour,
          temperature: Math.round(apiEntry?.temperature),
          windSpeed: apiEntry?.wind?.speed,
          weather: selectImage(apiEntry?.summary),
        }
      : null;
  });
  const dailyDates = formatDate(dailyForecast, 'day');
  const dailyTemp = findProp(dailyForecast, 'all_day', 'temperature')?.map(
    (num) => Math.round(num),
  );

  const successfulHTML = `<main class="weather__display main">
      <section class="main__city city">
        <h1 class="city__title">${modiCity}</h1>
        <span class="city__time">${time}</span>
        <span class="city__date">${date}</span>
      </section>
      <section class="main__all-info info">
          <div class="info__wrapper-parameters">
              <span class="info__temp">${temp}°C</span>
              <span class="info__difference">From ${min}°C to ${max}°C</span>
              <span class="info__sunrise">Sunrise <span class="info__am">${morning === null ? '04:37 AM' : morning?.substring(0, 5)}</span></span>
              <span class="info__sunset">Sunset <span class="info__am">${evening === null ? '20:06 AM' : evening?.substring(0, 5)}</span></span>
          </div>
          <div class="info__wrapper-weather-disp">
              <img class="info__disp" src="${selectImage(weatherData?.current?.summary, mytime)}" alt="${weatherTitle}">
              <span class="info__title">${weatherTitle}</span>
          </div>
          <div class="info__wrapper-indicators indicators">
              <div class="indicators__wrapper">
                  <img class="indicators__cloud-pic" width="50px" src="${cloud}" alt="cloud cover">
                  <span class="indicators__percent-hum">${cloudCover}%</span>
                  <span class="indicators__name">Cloud cover</span>
              </div>
              <div class="indicators__wrapper">
                  <img class="indicators__wind-pic" width="40px" src="${wind}" alt="wind speed">
                  <span class="indicators__percent-hum">${windCurrent} km/h</span>
                  <span class="indicators__name">W/Speed</span>
              </div>
          </div>
      </section>
      <section class="main__weekly weekly">
      <h2 class="weekly__title">5 Days ForeCast:</h2>
      <div class="weekly__group-weath">
        ${dailyForecast
          ?.slice(0, 5)
          .map((day, index) => {
            const modiDay = day.weather.toLowerCase().split('_').join(' ');
            const modiWeather =
              modiDay.charAt(0).toUpperCase() + modiDay.slice(1);
            return `
              <div class="weekly__wrapper-group">
                <img class="weekly__weather" src="${selectImage(modiWeather)}" alt="${day?.weather}">
                <span class="weekly__temp">${dailyTemp[index]}°C</span>
                <span class="weekly__data">${dailyDates[index]}</span>
              </div>
            `;
          })
          .join('')}
      </div>
    </section>
      <section class="main__hours hours">
          <h2 class="hours__title">Hourly Forecast:</h2>
          <div class="hours__group-hourly">
            ${matchedData
              .map(
                (data) => `
              <div class="hours__wrapper-data">
                <h3 class="hours__time">${data?.time}</h3>
                <img class="hours__pic" src="${data?.weather}" alt="">
                <span class="hours__temp">${data?.temperature}°C</span>
                <span class="hours__wind-speed">${data?.windSpeed} km/h</span>
              </div>
            `,
              )
              .join('')}
          </div>
      </section>
    </main>`;

  displayWeather.innerHTML = successfulHTML;
}
