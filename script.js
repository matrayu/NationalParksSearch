'use strict';

const searchURL = 'https://developer.nps.gov/api/v1/parks';
const parksApi = 'gDz5lLLWu7hY98JWSKkGvavTYAjeRj0SLI8uX7JL'
const googleGeoApi = 'AIzaSyCQIlfCNs73wljmt2yBoHkM_YuMZOXA34g'

function watchForm() {
    console.log('watchForm ran');
    $('form').submit(event => {
        event.preventDefault();
        let state = $("#js-state").val();
        let numResults = $("#js-maxResults").val();
        getParks(state, numResults)
    })
}

function getParks(state, limit=10) {
    console.log('getParks ran');
    const params = {
        api_key: parksApi,
        limit,
        fields: "addresses",
        statecode: state,
    };

    const newQueryString = formartQueryParams(params)
    const url = `${searchURL}?${newQueryString}`

    console.log(url)

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => getResultsArray(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function formartQueryParams(obj) {
    console.log('formartQueryParams ran')
    const queryParms = Object.keys(obj).map(key => 
        `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])
        }`);
    return queryParms.join('&');
}

function getResultsArray(arr) {
    console.log('getResultsArray ran');
    $(".parks").empty();
    let parks = '';
    for(let i = 0; i < arr.data.length - 1; i++) {
        $('.parks').append(`
            <div class="park-results">
                <h3><a href="${arr.data[i].url}" target="_blank">${arr.data[i].fullName}</a></h3>
                <p class="park_url"><a class="park_urls" href="${arr.data[i].url}" target="_blank">${arr.data[i].url}</a></p>
                <p>${arr.data[i].description}</p>
                <p>${getAddress(arr.data[i].addresses)}</p>
            </div>`)
    };
    $('.results').removeClass('hidden')
}

function getAddress(arr) {
    console.log('getAddress ran')
    console.log(arr)
    let address = ''
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].type = "Physical") {
            address = address + `${arr[i].line1}<br>`
            if (arr[i].line2 != "") {
                console.log('blank line two');
                address = address + `${arr[i].line2}<br>${arr[i].city} ${arr[i].stateCode}<br>${arr[i].postalCode}`
            }
            else {
                console.log('not blank');
                address = address + `${arr[i].city} ${arr[i].stateCode}<br>${arr[i].postalCode}`
            };
        };
    };
    return(address);
}


$(watchForm);



