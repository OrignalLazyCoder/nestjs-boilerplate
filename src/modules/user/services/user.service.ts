import {
  Injectable,
  Logger,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserEntity } from '../user.entity';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { plainToClass, classToPlain } from 'class-transformer';
import { InjectQueue } from '@nestjs/bull';
import { BullQueueName, BullWorkerName } from 'src/common/bull/bull.enum';
import { Queue } from 'bull';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
    @InjectQueue(BullQueueName.BULL_QUEUE) private bullQueue: Queue
  ) {}

  async getUsers({page, limit}): Promise<UserDto[]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    try {
      const users = await queryBuilder
                          .leftJoinAndSelect("user.tasks", "tasks")
                          .skip(limit * (page-1))
                          .take(limit)
                          .getMany();

      return plainToClass(UserDto, users);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: number, user: UserEntity): Promise<UserDto> {
    const found : UserEntity = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return plainToClass(UserDto, found);
  }

  async deleteUser(id: number, user: UserEntity): Promise<any> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return Promise.resolve({
      result: result,
      status: 'succes'
    });
  }


  async createUser(createUserDto: CreateUserDto, user: UserEntity): Promise<UserDto> {
    return this.userRepository.createUser(createUserDto, user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto, user: UserEntity): Promise<UserDto> {
    
    const found = await this.userRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    try {
      this.userRepository.merge(found, updateUserDto);
      const result = await this.userRepository.save(found);
      // const result = await this.userRepository.update({id: id}, updateUserDto);
      return plainToClass(UserDto, result);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async addToQueue() {
    this.bullQueue.add(BullWorkerName.BULL_QUEUE, {
      foo: 'bar'
    })
  }

}
