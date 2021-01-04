export interface Friend {
    id: number,
    userId: number,
    firstName: string,
    lastName: string,
    name?: string,
    pending: boolean
    wish?: boolean
}