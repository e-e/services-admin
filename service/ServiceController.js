var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
var Service = require('./Service');

// CREATES A NEW USER
router.post('/', function(req, res) {
  Service.create(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    },
    function(err, user) {
      if (err)
        return res
          .status(500)
          .send('There was a problem adding the information to the database.');
      res.status(200).send(user);
    }
  );
});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function(req, res) {
  Service.find({}, function(err, services) {
    if (err)
      return res.status(500).send('There was a problem finding the services.');
    res.status(200).send(services);
  });
});

// GETS A SINGLE USER FROM THE DATABASE
router.get('/:id', function(req, res) {
  Service.findById(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');
    res.status(200).send(user);
  });
});

// DELETES A USER FROM THE DATABASE
router.delete('/:id', function(req, res) {
  Service.findByIdAndRemove(req.params.id, function(err, user) {
    if (err)
      return res.status(500).send('There was a problem deleting the user.');
    res.status(200).send('Service: ' + user.name + ' was deleted.');
  });
});

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id', function(req, res) {
  Service.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    user
  ) {
    if (err)
      return res.status(500).send('There was a problem updating the user.');
    res.status(200).send(user);
  });
});

module.exports = router;
