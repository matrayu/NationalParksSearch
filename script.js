'use strict';

const url = 'https://developer.nps.gov/api/v1/parks?';
const api = 'api_key=gDz5lLLWu7hY98JWSKkGvavTYAjeRj0SLI8uX7JL'

function watchForm() {
    console.log('watchForm ran');
    $('form').submit(event => {
        event.preventDefault();
        let state = getState();
        let numResults = getMaxNumber();
        getParks(url, api, state, numResults)
    })
}

function getState() {
    console.log('getState has run');
    return $("#js-state").val();
}

function getMaxNumber() {
    console.log('getMaxNumber has run');
    return $("#js-maxResults").val();
}

function getParks(url, api, state, limit) {
    console.log('getParks ran');
    let queryString = `${url}statecode=${state}&limit=${limit}&${api}`
    fetch(queryString)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(responseJson))
        .catch(err => {
            $('.#js-error-message').text(`Something went wrong: ${err.message}`);
        });
};


$(watchForm);



