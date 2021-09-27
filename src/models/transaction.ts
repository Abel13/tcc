import { User } from './user';

export abstract class Transaction {
  abstract secureId: string;

  abstract user: User;

  abstract description: string;

  abstract value: number;

  abstract date: Date;

  abstract move(value: number): Promise<void>;
}
