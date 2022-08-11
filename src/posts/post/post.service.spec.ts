import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/axios';

import { postArray, postObject, postObjectRespose, postObjectUpdate } from '../../../test/post.data';
import { PostService } from './post.service';
import { of } from 'rxjs';

describe('PostService', () => {
  let service: PostService;
  let httpService: HttpService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        PostService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(() => of(postObjectRespose)),
            get: jest.fn(() => of({data: postArray, status: 200, statusText: 'OK', headers: {}, config: {}})),
            put: jest.fn(() => of(postObjectUpdate)),
            patch: jest.fn(() => of(postObjectUpdate)),
            delete:  jest.fn(() => of(true)),
          },
        }
      ]
    }).compile();

    service = module.get<PostService>(PostService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getPostAll', async () => {
    const data = ['test'];

      const response = {
        data,
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl' },
        status: 200,
        statusText: 'OK',
      };

      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => of(response));
    const array1 = await service.findAll();  
    expect(array1).toBe(postArray);
  });

  it('getPost One', async () => {
    const array1 = await service.findOne(1);  
    expect(array1[0]).toBe(postArray[0]);
  });


  // it('getPostAll Error', async () => {
  //   jest.spyOn(service, 'findAll').mockImplementation(() => {
  //     return new Promise ((resolve, reject) => {
  //       reject(new Error ('Error'));
  //     })
  //   });
  //   expect(await service.findAll()).toThrowError('Error');
  // });

});
