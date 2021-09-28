export type Session = {
  startDateTime?: Date,
  timezone?: string,
  availableSeats?: number
  totalSeats?: number
  offset?: number
  noLimit?: boolean
}

export type ClientEvent = {
  title?: string,
  description?: string,
  type?: string,
  proposerName?: string,
  sessionCount?: number,
  sessions?: Session[]
}

export type ServerEvent = {
  id: number
  title: string
  descriptionText: string | null
  descriptionHtml: string | null
  startDateTime: Date
  endDateTime: Date
  offset: number
  timezone: string
  location: string
  hash: string
  series: boolean
  limit: number
  typeId: number
  proposerEmail: string
  proposer: {
    email: string
    username: string | null
    firstName: string | null
    lastName: string | null
    block: number | null
    sendReminders: boolean | null
  }
  type: {
    id: number
    type: string
    emoji: string
  }
  RSVP: {
    eventId: number
    attendees: string[]
  }[]
}
