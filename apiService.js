import axios from 'axios';
import render from './renderWeather';
import { API_KEY, API_KEY_TIME, searchInput } from './data';

export default async function getData() {
  try {
    const [resWeather, resTime] = await Promise.all([
      axios.get(
        `https://www.meteosource.com/api/v1/free/point?place_id=${searchInput.value}&sections=all&timezone=UTC&language=en&units=metric&key=${API_KEY}`,
      ),
      axios.get(
        `https://api.ipgeolocation.io/timezone?apiKey=${API_KEY_TIME}&location=${searchInput.value}`,
      ),
    ]);

    render(resWeather.data, resTime.data);
  } catch (error) {
    console.error(error);
  }
}
