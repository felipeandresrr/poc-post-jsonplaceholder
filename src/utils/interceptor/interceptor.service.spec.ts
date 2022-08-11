// import { Test, TestingModule } from '@nestjs/testing';
// import { InterceptorService } from './interceptor.service';

// const executionContext = {
//   switchToHttp: jest.fn().mockReturnThis(),
//   getRequest: jest.fn().mockReturnThis()
// };

// const callHandler = {
//   handle: jest.fn()
// };
// describe('InterceptorService', () => {
//   let service: InterceptorService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [InterceptorService],
//     }).compile();

//     service = module.get<InterceptorService>(InterceptorService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('#intercept', () => {
//     it('t1', async () => {
//       (executionContext.switchToHttp().getRequest as jest.Mock<any, any>).mockReturnValueOnce({
//         body: { data: 'mocked data' }
//       });
//       callHandler.handle.mockResolvedValueOnce('next handle');
//       const actualValue = await service.intercept(this.executionContext, callHandler);
//       expect(actualValue).toBe('next handle');
//       expect(executionContext.switchToHttp().getRequest().body).toEqual({
//         data: 'mocked data',
//         addedAttribute: 'example'
//       });
//       expect(callHandler.handle).toBeCalledTimes(1);
//     });
//   });
// });
