/// <reference path="jquery-1.8.3.js" />
$(document).ready(function () {
    $('#myVideo').on('play', function () {
        $('#message').html($('#myVideo')[0].currentSrc);
    });
});


$(document).ready(function () {
    $('#btnSnapshot').on('click', drawVideoFrame);
});

function drawVideoFrame() {
    var canvas = document.getElementById('myCanvas');
    var video = document.getElementById('myVideo');
    canvas.getContext('2d').drawImage(video, 0, 0, 360, 240);
}


$(document).ready(function () {
    $('#btnLocation').on('click', getLocation);
});

function getLocation() {
    if (supportsGeolocation()) {
        watchId = navigator.geolocation.getCurrentPosition(showPosition
            , showError);
    }
    else {
        showMessage("Geolocation is not supported by this browser.");
    }
}

function supportsGeolocation() {
    return 'geolocation' in navigator;
}

function showMessage(message) {
    $('#message').html(message);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showMessge("User denied Geolocation access request.");
            break;
        case error.POSITION_UNAVAILABLE:
            showMessage("Location information unavailable.");
            break;
        case error.TIMEOUT:
            showMessage("Get user location request timed out.");
            break;
        case error.UNKNOWN_ERROR:
            showMessage("An unknown error occurred.");
            break;
    }
}


function showPosition(position) {
    var mapcanvas = document.getElementById('map');
    var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var options = {
        zoom: 13,
        center: coords,
        mapTypeControl: false,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(mapcanvas, options);
    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: "You are here!"
    });
}

