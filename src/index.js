"use strict";

import '../src/index.scss';

$(document).ready(() => {

    let counter = 1;
    let dropdownYears = $("#year1 #time-years");
    let dropdownDays = $("#day1 #time-days");
    const currentYear = (new Date()).getFullYear();

    appendYears(dropdownYears, 2000, currentYear);
    getDays(1, currentYear, dropdownDays);

    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    function getDays(month, year, dropdown) {
        let days = daysInMonth(month, year);

        clearOptions(dropdown);
        appendOptions(dropdown, 1, days);
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
            } else {
                selectElement.append("<option value="+ i +">"+ i +"</option>");
            }
        }
    }

    function clearOptions(selectElement) {
        selectElement.empty();
    }

    function addAppointment(target) {
        counter++;
        let appointmentHTML = '<li><div class="appointment-container" id="appointment'+ counter +'"><span id="closeIcon"><i class="fas fa-times fa-2x pointer"></i></span><h1>Termin #'+ counter +'</h1><div class="time-container"><div class="time-item" id="year'+ counter +'"><h4>Godina</h4><select id="time-years"></select></div><div class="time-item" id="month'+ counter +'"><h4>Mjesec</h4><select id="time-months"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div><div class="time-item" id="day'+ counter +'"><h4 style="margin-left: -5px;">Dan</h4><select id="time-days"></select><span id="colon">:</span></div><div class="time-item" id="start'+ counter +'" style="margin-left: -3px;"><h4>Početak</h4><select id="time-start"></select></div><div class="time-item" id="end'+ counter +'"><h4>Završetak</h4><select id="time-end"></select></div></div></li>';

        target.before(appointmentHTML);

        let yearsDropdown = $("#year" + counter + " #time-years");
        let daysDropdown = $("#day" + counter + " #time-days");
        appendYears(yearsDropdown, 2000, currentYear);
        getDays(1, 2020, daysDropdown);
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
        let dropdown = $(event.target).parent().next().find("#time-days");
        let month = $(event.target).val();
        let year = $(event.target).parent().prev().find("#time-years").val();

        getDays(month, year, dropdown);
    });

    $(document).on('change', '#time-years', () => {
        let dropdown = $(event.target).parent().next().next().find("#time-days");
        let month = $(event.target).parent().next().find("#time-months").val();
        let year = $(event.target).val();

        // console.log(dropdown, month, year);

        getDays(month, year, dropdown);
    });

    $(document).on('click', '#closeIcon', () => {
        let target = $(event.target).parent().parent();

        removeAppointment(target);
    });

});








