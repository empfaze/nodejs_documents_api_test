import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import {
  HTTPError,
  ILoggerService,
  INVERSIFY_TYPES,
  ITemplatesController,
} from '../../types';
import { BaseController } from '../BaseController';
import { TemplatesService } from '../../services';
import { ValidationMiddleware } from '../../middlewares';
import { TemplateDto } from '../../dto';

export class TemplatesController
  extends BaseController
  implements ITemplatesController
{
  constructor(
    @inject(INVERSIFY_TYPES.LoggerService) loggerService: ILoggerService,
    @inject(INVERSIFY_TYPES.TemplatesService)
    private templatesService: TemplatesService,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        handler: this.read,
        middlewares: [],
      },
      {
        path: '/',
        method: 'post',
        handler: this.create,
        middlewares: [new ValidationMiddleware(TemplateDto)],
      },
    ]);
  }

  async create({ body }: Request, res: Response, next: NextFunction) {
    const result = await this.templatesService.create(body);

    if (!result) {
      return next(
        new HTTPError(
          422,
          'Template with such name already exists',
          'Template creation',
        ),
      );
    }

    this.sendResponse(res, 200, result);
  }

  async read(req: Request, res: Response, next: NextFunction) {
    const result = await this.templatesService.read();

    this.sendResponse(res, 200, result);
  }
}