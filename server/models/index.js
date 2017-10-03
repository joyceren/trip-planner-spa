const Sequelize = require('sequelize'),
      { STRING, TEXT, ENUM, ARRAY, FLOAT, INTEGER } = Sequelize;

const db = new Sequelize('postgres://localhost/5432/tripplanner');

const Place = db.define('place', {
  address:{
    type: TEXT
  },
  city: {
    type: STRING
  },
  state: {
    type: STRING
  },
  phone: {
    type: STRING
  },
  location: {
    type: ARRAY(FLOAT)
  }
});

const Hotel = db.define('hotel', {
  name: {
    type: STRING
  },
  num_stars: {
    type: FLOAT
  },
  amenities: {
    type: TEXT
  }
});

const Activity = db.define('activity', {
  name: {
    type: STRING
  },
  age_range: {
    type: STRING
  }
});

const Restaurant = db.define('restaurant', {
  name: {
    type: STRING
  },
  cuisine: {
    type: TEXT
  },
  price: {
    type: INTEGER
  }
});

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = { db, Place, Activity, Restaurant, Hotel };
