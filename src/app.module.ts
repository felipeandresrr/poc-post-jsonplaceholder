import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'

import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './posts/post/post.module';
import { InterceptorService } from './utils/interceptor/interceptor.service';
import { MiddlewareService } from './utils/middleware/middleware.service';
import { MyLogger } from './utils/my-logger/my-logger.service';

@Module({
  imports: [HttpModule, PostModule],
  controllers: [AppController],
  providers: [AppService, MiddlewareService,
    {
      provide: APP_INTERCEPTOR,
      useClass: InterceptorService,
    },
    MyLogger,],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(MiddlewareService)
    .forRoutes({ path: '*', method: RequestMethod.ALL })
  
  }
}
