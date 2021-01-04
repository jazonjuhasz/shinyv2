export interface Gift {
    id?: number,
    giftId?: number,
    name: string,
    description: string
}

export interface GiftPaginationModel {
    count: number,
    data: Gift[]
}

export interface MyGift {
    id: number,
    giftId: number,
    name: string,
    description: string
}

export interface GiftAway {
    id: number,
    userId: number,
    giftId: number
}