const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

function component() {
    const element = document.createElement('div');

    element.innerHTML = "<p>Ovo je paragraf!</p>";

    return element;
}

$(document).appendChild(component());