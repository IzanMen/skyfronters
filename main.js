const apiKey = 'dYQPSNgtZshgacg3njoT7j18NMxjsObhdidYYZcp';
const apiUrlPlanetary = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
const apiUrlSpaceX = `https://api.spacexdata.com/v5/launches/latest`;

const PlanetaryImage = document.querySelector('.main-header__picture-day');
const PlanetaryDescription = document.querySelector('.main-header__description');
const PlanetaryTItle = document.querySelector('.main-header__title');
const PlanetaryCopyright = document.querySelector('.main-header__copyright');

axios.get(apiUrlPlanetary)
    .then(response => {
        const mediaType = response.data.media_type;

        if (mediaType === 'image') {
            PlanetaryImage.innerHTML = `<img class="main-header__picture-day__img" src="${response.data.hdurl}" alt="picture of the day"></img>`;
        } else {
            PlanetaryImage.innerHTML = `<video src="${response.data.hdurl}" controls></video>`;
        }

        PlanetaryDescription.innerHTML = response.data.explanation;
        PlanetaryTItle.innerHTML = "<span>Image of the day: </span>" + response.data.title;
        PlanetaryCopyright.innerHTML = "© " + response.data.copyright;
    })
    .catch(error => {
        console.error('Error al obtener la imagen del día:', error);
    });

axios.get(apiUrlSpaceX)
    .then(response => {
        console.log(response.data);
        const launches = document.querySelector('.main-spacex__launches');
        response.data.forEach(item => {
            launches.innerHTML += `
            <div class="main-spacex__launches-item">
                <h4>${item.name}</h4>
            </div>
            `;
        });
    })
    .catch(error => {
        console.error(error);
    });