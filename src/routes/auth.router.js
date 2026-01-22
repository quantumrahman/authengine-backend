// import modules -------------------------------------->
import 'dotenv/config';
import epxress from 'express';

// express router -------------------------------------->
const router = epxress.Router();

// routes ---------------------------------------------->
router.route('/sign-up').post(signUpController);

// export module --------------------------------------->
export default router;
