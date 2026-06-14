const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const { createUser, getUsers,getUserById,updateUser,deleteUser } = require('../controllers/userController');

router.post('/', auth, role('admin'), createUser);
router.get('/', auth, role('admin'), getUsers);
router.get('/:id', auth,role('admin'), getUserById);
router.put('/:id', auth, role('admin'), updateUser);
router.delete('/:id', auth, role('admin'), deleteUser);
module.exports = router;
