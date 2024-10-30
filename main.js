const apiKey = 'dYQPSNgtZshgacg3njoT7j18NMxjsObhdidYYZcp';
const apiUrlPlanetary = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
const apiUrlLaunches = `https://ll.thespacedevs.com/2.3.0/launches/?limit=5&offset=0`;
const apiUrlPeople = `https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json`;
const apiImages = `https://api.pexels.com/v1/search`;



const PlanetaryImage = document.querySelector('.main-header__img');
const PlanetaryDescription = document.querySelector('.main-header__description');
const PlanetaryTitle = document.querySelector('.main-header__title');
const PlanetaryCopyright = document.querySelector('.main-header__copyright');
const loadImage = document.querySelector('.load-image');
const launchesContainer = document.querySelector('.launches-container');
const peopleContainer = document.querySelector('.people-space__container');
const peopleCount = document.querySelector('.people-space__count');
const galeryContainer = document.querySelector('.galery-container')

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
                `;
            } else {
                launchesContainer.innerHTML += `
                <div class="launches-container__item">
                    <span>
                        <h6>${launch.name}</h6>
                        <p>${launch.last_updated}</p>
                    </span>
                    <span class="failure">${launch.status.abbrev}</span>
                </div>
                `;
            }
        });
    })
    .catch(error => {
        launchesContainer.innerHTML = `<p>Sorry, too many requests have been made recently. Try again later.</p>`;
        console.error(error);
    });

axios.get(apiUrlPeople)
    .then(response => {
        peopleCount.innerHTML = response.data.number;
        response.data.people.forEach(person => {
            peopleContainer.innerHTML += `
            <div class="people-space__container-item">
                <h6>${person.name}</h6>
                <p>Craft: ${person.spacecraft}</p>
            </div>
            `;
        });
    })
    .catch(error => {
        peopleContainer.innerHTML = `<p>Sorry, too many requests have been made recently. Try again later.</p>`;
        console.error(error);
    });

axios.get(apiImages, {
    params: {
        query: 'space',
        page: 1,
        per_page: 20,
    },
    headers: {
        Authorization: 'KDxNuVeQ8FXb5txH2SaEBpbq5csbQFsAwUp1cn1AAthz8Iu0iKdjWSSh',
    },
    })
    .then(response => {
        console.log(response.data.photos);
        const images = response.data.photos;
        images.forEach(image => {
            galeryContainer.innerHTML += `
            <img src="${image.src.medium}">
            `
        })
    })
    .catch(error => {
        console.error(error);
    });
    
const rockets = document.querySelectorAll('.rocket');

function launchRockets() {
    rockets.forEach((rocket) => {
        rocket.style.transition = 'transform 10s ease-in-out'; 
        rocket.style.transform = 'translate(0, -1000vh)'; 
    });
    
    
    setTimeout(() => {
        rockets.forEach((rocket) => {
            rocket.style.transition = 'none'; 
            rocket.style.transform = 'translate(0, 0)'; 
        });
        setTimeout(launchRockets, 1000); 
    }, 10000); 
}

launchRockets();

