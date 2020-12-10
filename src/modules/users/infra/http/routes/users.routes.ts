import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersConcontroller = new UsersController();
const userAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersConcontroller.create);
usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    userAvatarController.update
);
export default usersRouter;