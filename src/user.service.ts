import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserInputDTO } from "./dtos/createUserInput.dto";
import { UpdateUserInputDTO } from "./dtos/updateUserInput.dto";

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Kamil',
      email: 'kamil@kamil',
      password: '1234',
    },
    {
      id: 2,
      name: 'Paula',
      email: 'paula@gamil',
      password: '1234',
    },
    {
      id: 3,
      name: 'Marcio',
      email: 'marcio@gmail',
      password: '1234',
    },
  ];

  findAll(id: number) {
    if (id) {
      const user = this.users.find((user) => user.id === id);
      return [user].filter((user) => user);
    }

    return this.users;
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) return user;

    throw new NotFoundException();
  }

  create(body: CreateUserInputDTO) {
    const user = this.users.find((user) => user.email === body.email);
    if (user) {
      throw new BadRequestException("User already exists");
    }
    const lastUser = this.users[this.users.length - 1];
    const newUser = {
      id: lastUser.id + 1,
      ...body,
    };
    this.users.push(newUser);
    return newUser;
  }

  update( id: number, body: UpdateUserInputDTO) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
      this.users.map((user) => {
        if (user.id === id) {
          return { ...user, ...body };
        }
        return user;
      });
    
    return { ...user, ...body };
  }

  delete(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    this.users = this.users.filter((user) => user.id !== id);
    return '{ massage: User deleted }';
  }
}
