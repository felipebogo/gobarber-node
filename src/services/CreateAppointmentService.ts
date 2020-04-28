import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../Models/Appointment';
import AppointmentsRespository from '../Repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

export default class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRespository);
    const appointmentDate = startOfHour(date);
    const findAppointmentInTheSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInTheSameDate) {
      throw new AppError('This appointment is already booked.');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}
