import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { createUserDTO } from './dto/create-user.DTO';
import { updatedUserDTO } from './dto/update-user.DTO';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(dto: createUserDTO): Promise<UserDocument> {
    try {
      const created = new this.UserModel(dto);
      return await created.save();
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException('CPF já cadastrado');
      throw error;
    }
  }
  async findAll(): Promise<UserDocument[]> {
    return this.UserModel.find().lean().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    const doc = await this.UserModel.findById(id).exec();
    if (!doc) throw new NotFoundException('Aluno não encontrado');
    return doc;
  }

  async update(id: string, dto: updatedUserDTO): Promise<UserDocument> {
    const updated = await this.UserModel.findByIdAndUpdate(id, dto, {
      new: true,
    }).exec();
    if (!updated) throw new NotFoundException('Aluno não encontrado');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const res = await this.UserModel.findByIdAndDelete(id).exec();
    if (!res) throw new NotFoundException('Aluno não encontrado');
  }

  async addDocumentRef(id: string, key: string, fileInfo: any) {
    const user = await this.UserModel.findById(id).exec;
    if (!user) throw new NotFoundException('Aluno não encontrado');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    user.documents = user.documents || {};
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    user.documents[key] = fileInfo;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    await user.save();
    return user;
  }
}
