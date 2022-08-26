import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddleware from '@middlewares/auth.middleware';
import { CreateMemberDto, GetMemberDto } from '@dtos/member.dto';
import MemberController from '@controllers/member.controller';

class MemberRoute implements Routes {
  public path = '/members';
  public router = Router();
  public controller = new MemberController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.route(`${this.path}`).get(validationMiddleware(GetMemberDto, 'query'), authMiddleware, this.controller.getMembers);
    // .post(validationMiddleware(CreateUserDto, 'body'), this.userController.createUser);

    this.router.route(`${this.path}/:id`).get(authMiddleware, this.controller.getMemberById);
    // .put(validationMiddleware(CreateUserDto, 'body', true), this.controller.updateUser)
    // .delete(this.controller.deleteUser);
  }
}

export default MemberRoute;
