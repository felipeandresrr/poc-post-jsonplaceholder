import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    //console.log('Interceptor Req:', req);
    const now = Date.now();
    //console.log('Before...', now);

    return next
      .handle()
      .pipe(
        tap((data) => {
          // console.log(`After... ${Date.now() - now}ms`);
          // console.log('data', data);
          
        }),
      );
  }
}
