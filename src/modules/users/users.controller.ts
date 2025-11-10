import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './users.service';
import { createUserDTO } from './dto/create-user.DTO';
import { updatedUserDTO } from './dto/update-user.DTO';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: createUserDTO) {
    return this.userService.create(dto);
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: updatedUserDTO) {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post(':id/documents/key')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @Param('id') id: string,
    @Param('key') key: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Arquivo não encontrado');
    const fileInfo = {
      filename: file.fileName,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    };

    return this.userService.addDocumentRef(id, key, fileInfo);
  }
}
