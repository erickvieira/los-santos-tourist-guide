export interface BusinessHours {
  day: Weekday
  opensAt: string,
  closesAt: string
}

export type Weekday = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fry' | 'sat'