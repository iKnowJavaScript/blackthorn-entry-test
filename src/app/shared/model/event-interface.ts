export enum TimeTypeEnum {
  MINUTE = 'MINUTE',
  HOUR = 'HOUR',
  DAY = 'DAY',
}

export enum CheckoutStep {
  SELECTION = "SELECTION",
  VALIDATION = "VALIDATION",
  INFORMATION = "INFORMATION",
}

export enum EventEnum {
  BOOKING = 'BOOKING',
  DONATION = 'DONATION',
  SALES = 'SALES',
}

export interface IEvent {
  id: string,
  name: string;
  currency: string;
  tickets: ITicket[];
}

export interface ITicket {
  id: string,
  title: string;
  type: EventEnum;
  description: string;
  price?: number;
  options?: number[];
  timeTillEnd?: { value: number; type: TimeTypeEnum };
  validation?: { available: number };
  imageUrl?: string
}

export interface ISummaryItem {
  title: string;
  price: number;
  isWaitList?:boolean,
  requestQuantity: number,
  availableQuantity: number,
  waitlistQuantity?: number,
  ticketId: string,
}