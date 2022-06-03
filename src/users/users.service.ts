import { HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose'
import { CreateUserDto } from './dto/create-user.dto';

import { map } from 'rxjs/operators'
import { User } from './types/user';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private userModel: Model<User & Document>,
    private httpService: HttpService
    ) {}


   getUsersFromUrl():  Observable<AxiosResponse<any>> {

    const saveRecords = async (data: any) => {
      data.forEach(record => {
        const { type, site_admin  } = record
        return this.createUser({ type, site_admin })
      })
    }

    return this.httpService.get('https://api.github.com/users')
      .pipe(map((resp) => {
        saveRecords(resp.data)
        return resp.data
      }))
    }

  async getUserById(id: string): Promise<User> {
    const found = await this.userModel.findOne({ _id: id });
    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return found;
  }

  async deleteUser(id: string): Promise<void> {
    const found = await this.userModel.findById(id)
    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    await this.userModel.deleteOne({ _id: id})
  }

  async getUsers(): Promise<User[]> {
    const users = this.userModel.find({})
    return users;
    
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({...createUserDto})
    await newUser.save()

    return newUser;
  }

  async updateUser(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true })
    return updatedUser;
  }
}
