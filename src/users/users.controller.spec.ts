import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './user.service';
import { CreateUserInputDTO } from './dtos/createUserInput.dto';
import { UpdateUserInputDTO } from './dtos/updateUserInput.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findAll: jest.fn().mockImplementation((id: number) => {
        if (id) {
          return [{
            id: 1,
            name: 'Kamil',
            email: 'kamil@kamil',
            password: '1234',
          }];
        }
        return [
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
        ];
      }),
      findById: jest.fn().mockImplementation((id: number) => ({
        id,
        name: 'Kamil',
        email: 'kamil@kamil',
        password: '1234',
      })),
      create: jest.fn().mockImplementation((createUserDto: CreateUserInputDTO) => ({
        id: 3,
        ...createUserDto,
      })),
      update: jest.fn().mockImplementation((id: number, updateUserDto: UpdateUserInputDTO) => ({
        id,
        ...updateUserDto,
      })),
      delete: jest.fn().mockImplementation((id: number) => '{ message: User deleted }'),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<UsersService>(UsersService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
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
      ];

      expect(await usersController.findAll(0)).toEqual(result);
    });
  });

  describe('findById', () => {
    it('should return a single user by id', async () => {
      const result = {
        id: 1,
        name: 'Kamil',
        email: 'kamil@kamil',
        password: '1234',
      };

      expect(await usersController.findById(1)).toEqual(result);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserInputDTO = {
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password',
      };
      const result = {
        id: 3,
        ...createUserDto,
      };

      expect(await usersController.create(createUserDto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserInputDTO = {
        name: 'Updated User',
        email: 'updateduser@example.com',
        password: 'newpassword',
      };
      const result = {
        id: 1,
        ...updateUserDto,
      };

      expect(await usersController.update(1, updateUserDto)).toEqual(result);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const result = '{ message: User deleted }';

      expect(await usersController.delete(1)).toEqual(result);
    });
  });
});
