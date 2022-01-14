import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthModule } from '../auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { BullQueue } from 'src/common/bull/bull.queue';

@Module({
    imports: [
        BullModule.registerQueue(BullQueue),
        AuthModule,
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
