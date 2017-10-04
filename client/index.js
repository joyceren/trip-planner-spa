'use strict'

const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoicmVqb3ljZSIsImEiOiJjajhicmViNWIwMHp4Mndtczc0c2RsYjhkIn0.vSyKy09QQZzQzJGtAuKRfg";

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

const marker = buildMarker("activities", [-74.009, 40.705]);
marker.addTo(map);

let choices, option;

fetch('/api/attractions')
  .then(res => res.json())
  .then((attractionsObj) => {
    for(let key in attractionsObj){
      choices = document.getElementById(`${key}-choices`)
      attractionsObj[key].forEach( e => {
        option = document.createElement('option');
        option.text = e.name;
        choices.add(option);
      })
    }
  })
  .catch(console.error)


Array.from(document.getElementsByClassName('options-btn')).forEach( (e) => {

  let parent = document.getElementById(`${e.id.slice(0, -4)}-list`),
      child,
      text;

  e.addEventListener('click', () => {
    text = e.previousSibling.previousSibling.value;

    // text.onClick(() => {
    //   text.classList.add('checked');
    // })

    child = document.createElement('li')
    child.append(text);
    parent.appendChild(child);

  })
})
