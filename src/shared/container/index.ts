import { container } from 'tsyringe';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/Repositories/AppointmentsRepository';
import IAppointmentsRepository from '@modules/appointments/infra/repositories/IAppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
