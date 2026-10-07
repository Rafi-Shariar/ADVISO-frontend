export interface ScheduleParams {
  searchTerm?: string;
  date?: string;
}

export interface Schedules {
  scheduleId: string;
  mentorId: string;
  date: string;
  startTime: string;
  endTime: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  mentor: Mentor;
  slots: Slot[];
}

export interface Mentor {
  mentorId: string;
  user: User;
}

export interface User {
  name: string;
  email: string;
  profileURL: string;
}

export interface Slot {
  slotId: string;
  scheduleId: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSchedulePayload {
  date: string;
  startTime: string;
  endTime: string;
}

export interface DeleteSchedulePayload {
  scheduleId: string;
}
