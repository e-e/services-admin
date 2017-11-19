var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const auth = require('../../lib/auth');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Service = require('./Service');

router.post('/test', function(req, res) {
  console.log('JSON', req.body);
  res.send('');
});
// CREATES A NEW SERVICE
router.post('/', auth, function(req, res) {
  console.log('REQ.BODY: ', req.body);
  Service.create(
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      bestTimeToCall: req.body.bestTimeToCall,
      address_1: req.body.address_1,
      address_2: req.body.address_2,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country,
      description: req.body.description,
      services: req.body.services,
      hours: req.body.hours,
      availableTo: req.body.availableTo
    },
    function(err, service) {
      if (err)
        return res
          .status(500)
          .send(
            'There was a problem adding the information to the database.' + err
          );
      res.status(200).send(service);
    }
  );
});

// RETURNS ALL THE SERVICES IN THE DATABASE
router.get('/', auth, function(req, res) {
  Service.find({}, function(err, services) {
    if (err)
      return res.status(500).send('There was a problem finding the services.');
    res.status(200).send(services);
  });
});

// GETS A SINGLE SERVICE FROM THE DATABASE
router.get('/:id', auth, function(req, res) {
  Service.findById(req.params.id, function(err, service) {
    if (err)
      return res.status(500).send('There was a problem finding the service.');
    if (!service) return res.status(404).send('No service found.');
    res.status(200).send(service);
  });
});

// DELETES A SERVICE FROM THE DATABASE
router.delete('/:id', auth, function(req, res) {
  Service.findByIdAndRemove(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send('There was a problem deleting the user.');
    res.status(200).send('Service: ' + user.name + ' was deleted.');
  });
});

// UPDATES A SINGLE SERVICE IN THE DATABASE
router.put('/:id', auth, function(req, res) {
  Service.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    service
  ) {
    if (err)
      return res.status(500).send('There was a problem updating the service.');
    res.status(200).send(service);
  });
});

module.exports = router;
