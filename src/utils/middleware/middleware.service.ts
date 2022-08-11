import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class MiddlewareService implements NestMiddleware {
  
  use(req: Request, res: Response, next: () => void) {

  //  console.log('NestMiddleware Req:', req);
  //  console.log('NestMiddleware Res:', res);

   next();
  }
  
}
