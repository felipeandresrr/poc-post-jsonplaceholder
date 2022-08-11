import {Injectable, Logger } from '@nestjs/common';
import { PostDto, UpdatePostDto } from '../../dtos/post.dto';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios'
import { MyLogger } from '../../utils/my-logger/my-logger.service';

@Injectable()
export class PostService {
  private readonly urlPost = 'https://jsonplaceholder.typicode.com/posts';
  private readonly logger = new MyLogger();

  constructor(private httpService : HttpService) {}

  async findAll(): Promise<PostDto[]> {
    return new Promise(async(resolve, reject) => {

      try {
        const postArray: PostDto[] = await this.httpService.get<PostDto[]>(this.urlPost).pipe(
          map(res => res.data)
        ).toPromise();
        //this.logger.log(postArray)
        resolve(postArray);
      } catch (error){
        reject(error)
      }

    });
   

  }

  findOne(id: number): Promise<PostDto> {
    return new Promise(async(resolve, reject) => {

      try {
        const post: PostDto = await this.httpService.get<PostDto>(`${this.urlPost}/${id}`).pipe(
          map(res => res.data)
        ).toPromise();

        resolve(post);
      } catch (error){
        reject(error)
      }

    });
  }

  create(data: PostDto): Promise<PostDto> {
    return new Promise(async(resolve, reject) => {
      try {
        const post: PostDto = await this.httpService.post<PostDto>(`${this.urlPost}`, data).pipe(
          map(res => res.data)
        ).toPromise();

        resolve(post);
      } catch (error){
        reject(error)
      }
    });
  }

  update(id: number, changes: UpdatePostDto): Promise<PostDto> {
    return new Promise(async(resolve, reject) => {
      try {
        const post: PostDto = await this.httpService.put<PostDto>(`${this.urlPost}/${id}`, { body: changes }).pipe(
          map(res => res.data)
        ).toPromise();

        resolve(post);
      } catch (error){
        reject(error)
      }
    });
  }

  updatePatch(id: number, changes: UpdatePostDto): Promise<PostDto> {
    return new Promise(async(resolve, reject) => {
      try {
        const post: PostDto = await this.httpService.patch<PostDto>(`${this.urlPost}/${id}`, { body: changes }).pipe(
          map(res => res.data)
        ).toPromise();

        resolve(post);
      } catch (error){
        reject(error)
      }
    });
  }

  remove(id: number): Promise<boolean> {
    return new Promise(async(resolve, reject) => {
      try {
      await this.httpService.delete<PostDto>(`${this.urlPost}/${id}`).pipe(
          map(res => res.data)
        ).toPromise();

        resolve(true);
      } catch (error){
        reject(false)
      }
    });
  }
}
