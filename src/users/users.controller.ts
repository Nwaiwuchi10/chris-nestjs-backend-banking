// import { Body, Controller, Post } from '@nestjs/common';
// import { UsersService } from './users.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly userService: UsersService) {}

//   @Post()
//   async createUser(
//     @Body('phoneNumber') phoneNumber: string,
//     @Body('password') password: string,
//   ) {
//     const result = await this.userService.create(phoneNumber, password);
//     return result;
//   }
// }
