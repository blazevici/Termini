"use strict";

import '../src/index.scss';
import { create } from 'underscore';

const moment = require('moment');

$(document).ready( () => {

    let counter;
    let data = "prazno";
    let dropdownYears = $("#year1 #time-years");
    let dropdownDays = $("#day1 #time-days");
    let dropdownStart = $("#start1 #time-start");
    const currentYear = (new Date()).getFullYear();

    appendYears(dropdownYears, 2000, currentYear);
    getDays(1, currentYear, dropdownDays);
    getTimes(data, dropdownStart);

    async function getFile(file) {

        try {
            let path = "../json/" + file + ".json";
            let response = await fetch(path);
            let data;

            if (response.status == 404) {
                
                data = "prazno";
                return data;
            } else {

                data = response.json().then(data => ({
                    data: data
                }));

                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }


    function getTimes(data, timesDropdown) {

        let intervals = createHalfHourIntervals();
        clearOptions(timesDropdown);

        if (data == "prazno") {
            
            appendAllTimes(timesDropdown, intervals);
        } else {

            let notAvailable = data.data.data["12.02.2020"];
            appendTimes(timesDropdown, intervals, notAvailable);
        }
    }


    function getEndTimes(data, startTime, endTime) {

        let intervals = createHalfHourIntervals();
        let slicedIntervals;
        clearOptions(endTime);

        if (data == "prazno") {
        
            slicedIntervals = intervals.slice(intervals.indexOf(startTime) + 1);
            appendAllTimes(endTime, slicedIntervals);
        } else {

            let notAvailable = data.data.data["12.02.2020"];

            if (intervals.indexOf(startTime) < intervals.indexOf(notAvailable[0][0])) {
                slicedIntervals = intervals.slice(intervals.indexOf(startTime) + 1, intervals.indexOf(notAvailable[0][0]));
            } else {
                slicedIntervals = intervals.slice(intervals.indexOf(startTime) + 1);
            }

            appendTimes(endTime, slicedIntervals, notAvailable);
        }
    }


    function createHalfHourIntervals() {

        let intervals = [];
        new Array(24).fill().forEach((acc, index) => {

            intervals.push(moment({ hour: index }).format('H:mm'));
            intervals.push(moment({ hour: index, minute: 30 }).format('H:mm'));
        });

        let sortedIntervals = intervals.sort((a, b) => b.date - a.date);

        return sortedIntervals;
    }


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
            selectElement.append("<option value=" + i + ">" + i + "</option>");
        }
    }


    function appendTimes(selectElement, array, notAvailable) {

        let newArray = [];

        for (let a in notAvailable) {

            newArray.push(notAvailable[a]);
        }

        for (let i = 0; i < array.length; i++) {

            if (newArray[0].indexOf(array[i]) > -1) {
                selectElement.append("<option disabled value=" + array[i] + ">" + array[i] + " - ZAUZETO</option>");
            } else {
                selectElement.append("<option value=" + array[i] + ">" + array[i] + "</option>");
            }
            
        }
    }


    function appendAllTimes(selectElement, array) {

        for (let i = 0; i < array.length; i++) {
            selectElement.append("<option value=" + array[i] + ">" + array[i] + "</option>");
        }
    }


    function appendYears(selectElement, start, end) {

        for (let i = start; i <= end; i++) {

            if (i == currentYear) {
                selectElement.append("<option selected value=" + i + ">" + i + "</option>");
            } else {
                selectElement.append("<option value=" + i + ">" + i + "</option>");
            }
        }
    }


    function clearOptions(selectElement) {
        selectElement.empty();
    }


    function addAppointment(target) {

        counter = target.index() + 1;
        let appointmentHTML = '<li><div class="appointment-container" id="appointment' + counter + '"><span id="closeIcon"><i class="fas fa-times fa-2x pointer"></i></span><h1>Termin #<span class="number">' + counter + '</span></h1><div class="time-container"><div class="time-item" id="year' + counter + '"><h4>Godina</h4><select id="time-years"></select></div><div class="time-item" id="month' + counter + '"><h4>Mjesec</h4><select id="time-months"><option value="01">1</option><option value="02">2</option><option value="03">3</option><option value="04">4</option><option value="05">5</option><option value="06">6</option><option value="07">7</option><option value="08">8</option><option value="09">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div><div class="time-item" id="day' + counter + '"><h4 style="margin-left: -5px;">Dan</h4><select id="time-days"></select><span id="colon">:</span></div><div class="time-item" id="start' + counter + '" style="margin-left: -3px;"><h4>Početak</h4><select id="time-start"></select></div><div class="time-item" id="end' + counter + '"><h4>Završetak</h4><select id="time-end"></select></div></div></li>';

        target.before(appointmentHTML);

        let yearsDropdown = $("#year" + counter + " #time-years");
        let daysDropdown = $("#day" + counter + " #time-days");
        let startDropdown = $("#start" + counter + " #time-start");
        let data = "prazno";
        appendYears(yearsDropdown, 2000, currentYear);
        getDays(1, 2020, daysDropdown);
        getTimes(data, startDropdown);
    }


    function removeAppointment(target) {

        target.remove();

        $('#appointments').find(".appointment-container h1").each( (i, v) => {
            $(v).find(".number").html(i + 1);
        });

        $("#appointments li:empty").remove();
    }


    $("#addMore").on('click', (event) => {

        let target = $(event.target).parent();

        addAppointment(target);
    });

    $(document).on('click', '#closeIcon', () => {

        let target = $(event.target).parent().parent();

        removeAppointment(target);
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

        getDays(month, year, dropdown);
    });

    $(document).on('change', "#time-days", () => {

        let day = $(event.target).val();
        if (day < 10) {
            day = "0" + day;
        }
        let month = $(event.target).parent().prev().find("#time-months").val();
        let year = $(event.target).parent().prev().prev().find("#time-years").val();
        let start = $(event.target).parent().next().find("#time-start");
        let end = $(event.target).parent().next().next().find("#time-end");

        let jsonDate = year + "-" + month + "-" + day;

        clearOptions(end);

        getFile(jsonDate.toString()).then(data => {
            getTimes(data, start);
            getEndTimes(data, start, end);
        });
        
    });

    $(document).on('change', "#time-start", () => {

        let day = $(event.target).parent().prev().find("#time-days").val();
        if (day < 10) {
            day = "0" + day;
        }
        let month = $(event.target).parent().prev().prev().find("#time-months").val();
        let year = $(event.target).parent().prev().prev().prev().find("#time-years").val();
        let start = $(event.target).val();
        let end = $(event.target).parent().next().find("#time-end");

        let jsonDate = year + "-" + month + "-" + day;

        getFile(jsonDate.toString()).then(data => getEndTimes(data, start, end));
    });


});








