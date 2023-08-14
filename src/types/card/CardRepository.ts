import { ICard } from "./Card";
import { IResponseMessage } from "./ResponseMessage";

export interface ICardRepository {
  saveCard(iCard: ICard): Promise<IResponseMessage>;
  getCard(token: string): Promise<ICard>;
  getAllCard(): Promise<ICard[]>;
}
