import { isEqual } from 'date-fns';
import Appointment from '../Models/Appointment';

interface CreateAppointmentDto {
  provider: string;
  date: Date;
}

export default class AppointmentsRespository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public all(): Appointment[] {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
    );
    return findAppointment || null;
  }

  public create({ provider, date }: CreateAppointmentDto): Appointment {
    const appointment = new Appointment({ provider, date });
    this.appointments.push(appointment);
    return appointment;
  }
}
