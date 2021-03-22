import { EventEnum, IEvent, TimeTypeEnum } from "src/app/shared/model/event-interface";

export const data: { events: IEvent[] } = {
  events: [
    {
      name: 'CU - Alumni Weekend',
      description:"An all weekend events for Central University Alumni", 
      currency: 'USD',
      id:"1",
      tickets: [
        {
          id:"1",
          title: 'Free Ticket',
          type: EventEnum.BOOKING,
          description:
            'Free ticket for anyone to make a valuable contribution towards our future online events programme. Thank you.',
          price: 0,
          timeTillEnd: {
            value: 1,
            type: TimeTypeEnum.HOUR,
          },
          validation: {
            available: 2,
          },
        },
        {
          id:"2",
          title: 'Alumni Base Ticket',
          type: EventEnum.BOOKING,
          description:
            'This livestream will broadcast via a private YouTube link that will be sent to ticket purchasers an hour prior to showtime',
          price: 95.99,
          timeTillEnd: {
            value: 5,
            type: TimeTypeEnum.DAY,
          },
          validation: {
            available: 1,
          },
        },
        {
          id:"3",
          title: 'Alumni VIP Ticket',
          type: EventEnum.BOOKING,
          description:
            'This livestream will broadcast via a private YouTube link that will be sent to ticket purchasers an hour prior to showtime',
          price: 3500,
          timeTillEnd: {
            value: 5,
            type: TimeTypeEnum.DAY,
          },
          validation: {
            available: 0,
          },
        },
        {
          id:"4",
          title: 'Donate',
          type: EventEnum.DONATION,
          description: 'Access to arts is vital. Pay what you can.',
          options: [50, 100, 200, 500],
        },
        {
          id:"5",
          title: 'Book: Good Strategy - Bad Strategy',
          type: EventEnum.SALES,
          imageUrl:"assets/svg/good-strategy.svg",
          description: 'Learn from the experts of business process management',
          price: 17.99,
          validation: {
            available: 10,
          },
        },
      ],
    },
  ],
};
