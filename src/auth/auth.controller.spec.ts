import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from 'src/dto/user.dto';
import AuthController from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            createUser: jest.fn(),
            authorizeUser: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signUp', () => {
    it('should register a user and return a success message', async () => {
      const userDto: UserDto = {
        email: 'test@example.com',
        password: 'password',
        // Добавьте остальные поля, если они есть в UserDto
      };

      await expect(authController.signUp(userDto)).resolves.toEqual({
        message: 'Пользователь успешно зарегистрировался',
        status: '201',
      });

      expect(authService.createUser).toHaveBeenCalledWith(userDto);
    });
  });

  describe('signIn', () => {
    it('should authorize a user and return a success message', async () => {
      const userDto: UserDto = {
        email: 'test@example.com',
        password: 'password',
        // Добавьте остальные поля, если они есть в UserDto
      };

      await authController.signIn(userDto);

      expect(authService.authorizeUser).toHaveBeenCalledWith(userDto);
      expect(authController.signIn(userDto)).resolves.toEqual({
        message: 'Пользователь успешно авторизировался',
      });
    });
  });
});
