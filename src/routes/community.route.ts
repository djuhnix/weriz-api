import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import CommunityController from '@controllers/community.controller';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateCommunityDto, GetCommunityDto, JoinCommunityDto } from '@dtos/community.dto';
import authMiddleware from '@middlewares/auth.middleware';

class CommunityRoute implements Routes {
  public path = '/community';
  public router = Router();
  public controller = new CommunityController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      /**
       * @swagger
       * /community:
       *   get:
       *     summary: Get communities
       *     description: Retrieve a list of communities in the database
       *     tags: ["Community"]
       *   post:
       *     summary: Create a community
       *     description: Send community data to create a new one in the database
       *     tags: ["Community"]
       */
      .route(`${this.path}`)
      .get(authMiddleware, validationMiddleware(GetCommunityDto, 'query'), this.controller.getCommunities)
      .post(authMiddleware, validationMiddleware(CreateCommunityDto, 'body'), this.controller.createCommunity);

    this.router
      .route(`${this.path}/join/:code`)
      .patch(authMiddleware, validationMiddleware(JoinCommunityDto, 'params'), this.controller.joinCommunity);

    this.router
      .route(`${this.path}/:id`)
      .get(authMiddleware, this.controller.getCommunityById)
      .patch(authMiddleware, validationMiddleware(CreateCommunityDto, 'body'), this.controller.updateCommunity);
  }
}

export default CommunityRoute;
