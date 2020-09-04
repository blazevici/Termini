"use strict";

import '../src/index.scss';
//import '@fortawesome/fontawesome-free/js/js.all';

$(document).ready(() => {

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function getDays() {
        let month = $("#time-months option:selected").val();
        let year = $("#time-years option:selected").val();
        let days = daysInMonth(month, year);

        let dropdownDays = document.getElementById("time-days");
        clearOptions(dropdownDays);

        appendOptions(dropdownDays, 1, days);
    }

    function appendOptions(selectElement, start, end) {
        for (let i = start; i <= end; i++) {
            let option = document.createElement("OPTION");
            option.innerHTML = i;
            option.value = i;
            selectElement.appendChild(option);
        }
    }

    function clearOptions(selectElement) {
        let length = selectElement.options.length;
        for (let i = length - 1; i >= 0; i--) {
            selectElement.options[i] = null;
        }
    }

    function addAppointment(target) {
        let appointmentHTML = '<li><div class="appointment-container"><span id="closeIcon"><i class="fas fa-times fa-2x"></i></span><h1>Termin #1</h1><div class="time-container"><div class="time-item"><h4>Godina</h4><select id="time-years"></select></div><div class="time-item"><h4>Mjesec</h4><select id="time-months"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div><div class="time-item"><h4>Dan</h4><select id="time-days"></select><span id="colon">:</span></div><div class="time-item" style="margin-left: -3px;"><h4>Početak</h4><select id="time-start"></select></div><div class="time-item"><h4>Završetak</h4><select id="time-end"></select></div></div></li>';

        target.before(appointmentHTML);
    }

    function removeAppointment(target) {
        target.remove();
        $("#appointments li:empty").remove();
    }

    $("#time-months").on('change', () => {
        getDays();
    });

    $("#time-years").on('change', () => {
        getDays();
    });

    $("#addMore").on('click', (event) => {
        let target = $(event.target).parent().parent();
        //console.log(target);

        addAppointment(target);
    });

    $(document).on('click', '#closeIcon', () => {
        let target = $(event.target).parent().parent();
        console.log(target);

        removeAppointment(target);
    });



    let dropdownYears = document.getElementById("time-years");
    let currentYear = (new Date()).getFullYear();

    appendOptions(dropdownYears, 2000, currentYear);

});








