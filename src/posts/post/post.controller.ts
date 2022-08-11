import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostDto, UpdatePostDto } from '../../dtos/post.dto';
import { PostService } from './post.service';

@ApiTags('posts')
@Controller('post')
export class PostController {
  constructor(private postService: PostService) { }

  @Get()
  @ApiOperation({ summary: 'List of post' })
  getPost(): Promise<PostDto[]> {
    return this.postService.findAll();
  }

  @Get(':postId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('postId', ParseIntPipe) postId: number): Promise<PostDto>  {
    return this.postService.findOne(postId);
  }

  @Post() 
  create(@Body() payload: PostDto): Promise<PostDto> {
    return this.postService.create(payload);
  }


  @Put(':postId')
  update(@Param('postId') id: string, @Body() payload: UpdatePostDto): Promise<PostDto> {
    return this.postService.update(+id, payload);
  }

  @Patch(':postId')
  updatePatch(@Param('postId') id: string, @Body() payload: UpdatePostDto): Promise<PostDto> {
    return this.postService.updatePatch(+id, payload);
  }

  @Delete(':postId')
  delete(@Param('postId') id: string): Promise<boolean> {
    return this.postService.remove(+id);
  }

}
