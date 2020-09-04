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

        let dropdownDays = $("#time-days");
        clearOptions(dropdownDays);

        appendOptions(dropdownDays, 1, days);
    }

    function appendOptions(selectElement, start, end) {
        for (let i = start; i <= end; i++) {
            selectElement.append("<option value="+ i +">"+ i +"</option>");
        }
    }

    function appendYears(selectElement, start, end) {
        for (let i = start; i <= end; i++) {

            if (i == currentYear) {
                selectElement.append("<option selected value="+ i +">"+ i +"</option>");
            }
            selectElement.append("<option value="+ i +">"+ i +"</option>");
        }
    }

    function clearOptions(selectElement) {
        selectElement.empty();
    }

    function addAppointment(target) {
        counter++;
        let appointmentHTML = '<li><div class="appointment-container" id="appointment'+ counter +'"><span id="closeIcon"><i class="fas fa-times fa-2x pointer"></i></span><h1>Termin #'+ counter +'</h1><div class="time-container"><div class="time-item"><h4>Godina</h4><select id="time-years"></select></div><div class="time-item"><h4>Mjesec</h4><select id="time-months"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div><div class="time-item"><h4 style="margin-left: -5px;">Dan</h4><select id="time-days"></select><span id="colon">:</span></div><div class="time-item" style="margin-left: -3px;"><h4>Početak</h4><select id="time-start"></select></div><div class="time-item"><h4>Završetak</h4><select id="time-end"></select></div></div></li>';

        target.before(appointmentHTML);

        let appointmentID = $("#appointment" + counter + " #time-years");
        appendappendYearsOptions(appointmentID, 2000, currentYear);
    }

    function removeAppointment(target) {
        target.remove();
        $("#appointments li:empty").remove();
        counter--;
    }

    $("#addMore").on('click', (event) => {
        let target = $(event.target).parent().parent();

        addAppointment(target);
    });

    $(document).on('change', '#time-months', () => {
        getDays();
    })

    $(document).on('change', '#time-years', () => {
        getDays();
    })

    $(document).on('click', '#closeIcon', () => {
        let target = $(event.target).parent().parent();

        removeAppointment(target);
    });


    let counter = 1;
    let dropdownYears = $("#time-years");
    const currentYear = (new Date()).getFullYear();

    appendYears(dropdownYears, 2000, currentYear);

});








