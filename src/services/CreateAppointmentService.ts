import { startOfHour } from 'date-fns';
import Appointment from '../Models/Appointment';
import AppointmentsRespository from '../Repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

export default class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRespository;

  constructor(appointmentsRepository: AppointmentsRespository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);
    const findAppointmentInTheSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInTheSameDate) {
      throw Error('This appointment is already booked.');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}
