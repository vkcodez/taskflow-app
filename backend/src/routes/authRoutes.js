<<<<<<< HEAD
const router = require('express').Router();
const { register, login, getMe, registerValidation, loginValidation } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);

=======
const router = require('express').Router();
const { register, login, getMe, registerValidation, loginValidation } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/me', protect, getMe);

>>>>>>> c373036557a179238c89ebf5cfe37286a14e9aad
module.exports = router;