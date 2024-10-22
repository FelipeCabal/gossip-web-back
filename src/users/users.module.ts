import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudAmistad } from './entities/solicitud.entity';
import { solicitudesController } from './controllers/solicitudes.controller';
import { SolicitudesAmistadService } from './services/solicitudesAmistad.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  TypeOrmModule.forFeature([SolicitudAmistad])],
  controllers: [UsersController, solicitudesController],
  providers: [UsersService, SolicitudesAmistadService],
  exports: [TypeOrmModule]
})
export class UsersModule { }
