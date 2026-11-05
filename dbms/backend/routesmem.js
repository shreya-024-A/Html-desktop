 const router = require('express').Router();
let Member = require('../models/Member');

// Get all members
router.route('/').get((req, res) => {
  Member.find()
    .then(members => res.json(members))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get a specific member
router.route('/:id').get((req, res) => {
  Member.findById(req.params.id)
    .then(member => res.json(member))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new member
router.route('/add').post((req, res) => {
  const { name, email, phone, address, membershipId, membershipType } = req.body;

  const newMember = new Member({
    name,
    email,
    phone,
    address,
    membershipId,
    membershipType
  });

  newMember.save()
    .then(() => res.json('Member added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update a member
router.route('/update/:id').post((req, res) => {
  Member.findById(req.params.id)
    .then(member => {
      member.name = req.body.name;
      member.email = req.body.email;
      member.phone = req.body.phone;
      member.address = req.body.address;
      member.membershipId = req.body.membershipId;
      member.membershipType = req.body.membershipType;
      member.status = req.body.status;

      member.save()
        .then(() => res.json('Member updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete a member
router.route('/:id').delete((req, res) => {
  Member.findByIdAndDelete(req.params.id)
    .then(() => res.json('Member deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;