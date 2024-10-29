const apiKey = 'dYQPSNgtZshgacg3njoT7j18NMxjsObhdidYYZcp';
const apiUrlPlanetary = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
const apiUrlLaunches = `https://ll.thespacedevs.com/2.3.0/launches/?limit=5&offset=0`;
const apiUrlPeople = `http://api.open-notify.org/astros.json`;

const PlanetaryImage = document.querySelector('.main-header__img');
const PlanetaryDescription = document.querySelector('.main-header__description');
const PlanetaryTitle = document.querySelector('.main-header__title');
const PlanetaryCopyright = document.querySelector('.main-header__copyright');
const loadImage = document.querySelector('.load-image');
const launchesContainer = document.querySelector('.launches-container');
const peopleContainer = document.querySelector('.people-space__container');
const peopleCount = document.querySelector('.people-space__count')


axios.get(apiUrlPlanetary)
    .then(response => {
        const mediaType = response.data.media_type;

        loadImage.addEventListener('click', () => {
            if (mediaType === 'image') {
                PlanetaryImage.innerHTML = `<img class="main-header__picture-day__img" src="${response.data.hdurl}" alt="picture of the day"></img>`;
            } else {
                PlanetaryImage.innerHTML = `<video src="${response.data.hdurl}" controls></video>`;
            }        
        });

        PlanetaryDescription.innerHTML = response.data.explanation;
        PlanetaryTitle.innerHTML = "<span>Image of the day: </span>" + response.data.title;

        if(response.data.copyright) PlanetaryCopyright.innerHTML = "© " + response.data.copyright;
    })
    .catch(error => {
        console.error(error);
    });

axios.get(apiUrlLaunches)
    .then(response => {
        const latestLaunches = response.data.results;
        latestLaunches.forEach(launch => {
            if (launch.status.abbrev == "Success") {
                launchesContainer.innerHTML += `
                <div class="launches-container__item">
                    <span>
                        <h6>${launch.name}</h6>
                        <p>${launch.last_updated}</p>
                    </span>
                    <span class="success">${launch.status.abbrev}</span>
                </div>
                `
            } else {
                launchesContainer.innerHTML += `
                <div class="launches-container__item">
                    <span>
                        <h6>${launch.name}</h6>
                        <p>${launch.last_updated}</p>
                    </span>
                    <span class="failure">${launch.status.abbrev}</span>
                </div>
                `
            }

        });
    })
    .catch(error => {
        console.error(error);
    });

axios.get(apiUrlPeople)
    .then(response => {
        counter = response.data.people.length;
        peopleCount.innerHTML = counter
        response.data.people.forEach(person => {
            peopleContainer.innerHTML += `
            <div class="people-space__container-item">
                <h6>${person.name}</h6>
                <p>Craft: ${person.craft}</p>
            </div>
            `
        });
    })
    .catch(error => {
        console.error(error);
    });