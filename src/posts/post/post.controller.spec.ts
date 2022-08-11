import { HttpModule, HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { postArray, postObject, postObjectRespose, postObjectUpdate } from '../../../test/post.data';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PostController],
      providers: [PostService]
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getPostAll', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(() => {
      return new Promise ((resolve, reject) => {
        resolve(postArray);
      })
    });
    const array1 = await controller.getPost();    
    expect(array1).toEqual(postArray);
  });

  it('getOnePost', async () => {
    jest.spyOn(service, 'findOne').mockImplementation(() => {
      return new Promise ((resolve, reject) => {
        resolve(postObject);
      })
    });
    expect(await controller.getOne(1)).toStrictEqual(postObject);
  });

  it('create post', async () => {
    jest.spyOn(service, 'create').mockImplementation(() => {
      return new Promise ((resolve, reject) => {
        resolve(postObjectRespose);
      })
    });
    expect(await controller.create(postObject)).toHaveProperty('body');
  });

  it('update post', async () => {
    jest.spyOn(service, 'update').mockImplementation(() => {
      return new Promise ((resolve, reject) => {
        resolve(postObject);
      })
    });
    expect(await controller.update('1', postObjectUpdate)).toHaveProperty('body');
  });

  it('patch post', async () => {
    jest.spyOn(service, 'updatePatch').mockImplementation(() => {
      return new Promise ((resolve, reject) => {
        resolve(postObject);
      })
    });
    expect(await controller.updatePatch('1', postObjectUpdate)).toHaveProperty('body');
  });

  it('delete post', async () => {
    jest.spyOn(service, 'remove').mockImplementation(() => {
      return new Promise ((resolve, reject) => {
        resolve(true);
      })
    });
    expect(await controller.delete('1')).toEqual(true);
  });
});
