import image1 from './weather/1.png';
import image2 from './weather/2.svg';
import image3 from './weather/3.svg';
import image4 from './weather/4.svg';
import image5 from './weather/5.svg';
import image6 from './weather/6.svg';
import image7 from './weather/7.svg';
import image8 from './weather/8.svg';
import image9 from './weather/9.svg';
import image10 from './weather/10.svg';
import image11 from './weather/11.svg';
import image12 from './weather/12.svg';
import image13 from './weather/13.svg';
import image14 from './weather/14.svg';
import image15 from './weather/15.svg';
import image16 from './weather/16.svg';
import image17 from './weather/17.svg';
import image18 from './weather/18.svg';
import image19 from './weather/19.svg';
import image20 from './weather/20.svg';
import image21 from './weather/21.svg';
import image23 from './weather/23.svg';
import image24 from './weather/24.svg';
import image25 from './weather/25.svg';
import image26 from './weather/26.svg';
import image27 from './weather/27.svg';
import image28 from './weather/28.svg';
import image29 from './weather/29.svg';
import image30 from './weather/30.svg';
import image31 from './weather/31.svg';
import image32 from './weather/32.svg';
import image33 from './weather/33.svg';
import image34 from './weather/34.svg';
import image35 from './weather/35.svg';
import image36 from './weather/36.svg';

export default function selectImage(conditions, time) {
  let currentImage = '';
  const validTime = time >= '22:00' || time < '06:00';
  switch (conditions) {
    case 'Sunny':
      currentImage += image2;
      break;

    case 'Mostly sunny':
      currentImage += image3;
      break;

    case 'Partly sunny':
      currentImage += image4;
      break;

    case 'Mostly cloudy':
      if (validTime) {
        currentImage += image29;
      } else {
        currentImage += image5;
      }
      break;

    case 'Cloudy':
      if (validTime) {
        currentImage += image30;
      } else {
        currentImage += image6;
      }
      break;

    case 'Overcast':
      currentImage += image7;
      break;

    case 'Overcast with low clouds':
      if (validTime) {
        currentImage += image31;
      } else {
        currentImage += image8;
      }
      break;

    case 'Fog':
      currentImage += image9;
      break;

    case 'Light rain':
      currentImage += image10;
      break;

    case 'Rain':
      currentImage += image11;
      break;

    case 'Possible rain':
      currentImage += image12;
      break;

    case 'Rain shower':
      if (validTime) {
        currentImage += image32;
      } else {
        currentImage += image13;
      }
      break;

    case 'Thunderstorm':
      currentImage += image14;
      break;

    case 'Local thunderstorms':
      if (validTime) {
        currentImage += image33;
      } else {
        currentImage += image15;
      }
      break;

    case 'Light snow':
      currentImage += image16;
      break;

    case 'Snow':
      currentImage += image17;
      break;

    case 'Possible snow':
      currentImage += image18;
      break;

    case 'Snow shower':
      if (validTime) {
        currentImage += image34;
      } else {
        currentImage += image19;
      }
      break;

    case 'Rain and snow':
      if (validTime) {
        currentImage += image35;
      } else {
        currentImage += image20;
      }
      break;

    case 'Possible rain and snow':
      currentImage += image21;
      break;

    case 'Freezing rain':
      currentImage += image23;
      break;

    case 'Possible freezing rain':
      if (validTime) {
        currentImage += image36;
      } else {
        currentImage += image24;
      }
      break;

    case 'Hail':
      currentImage += image25;
      break;

    case 'Clear':
      currentImage += image26;
      break;

    case 'Mostly clear':
      currentImage += image27;
      break;

    case 'Partly clear':
      currentImage += image28;
      break;

    default:
      currentImage += image1;
  }

  return currentImage;
}
