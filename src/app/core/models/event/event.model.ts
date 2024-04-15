export interface Event {
    uid?: string,
    userId: string,
    eventName: string,
    category: string,
    image: string,
    cost: number,
    date: string,
    starttime: string,
    endtime: string,
    location: string,
    refundPolicy: string,
    synopsis: string,
    description: string,
    attendeesAllowed: number
}