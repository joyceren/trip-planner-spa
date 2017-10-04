'use strict';

const express = require('express'),
      router = express.Router();

const { Place, Hotel, Restaurant, Activity } = require("./models");

let allAttractions = {};

router.get('/attractions', (req, res, next) => {
  Promise.all([
    Hotel.findAll({ include: [{ all: true }] }),
    Restaurant.findAll({ include: [{ all: true }] }),
    Activity.findAll({ include: [{ all: true }] }),
  ])
    .then(allOfThem => {
      const names = ['hotels', 'restaurants', 'activities'];
      allOfThem.forEach((elem, index) => {
        allAttractions[names[index]] = elem;
      });
    })
    .then(() => {
      res.json(allAttractions);
    })
    .catch(next);
});

module.exports = router;