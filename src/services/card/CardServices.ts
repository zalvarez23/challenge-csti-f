import { IResponseMessage } from "@/types/card/ResponseMessage";
import { ApiCardRepository } from "../../repositories/card/CardImpl";
import { ICard } from "../../types/card/Card";
import { ICardRepository } from "../../types/card/CardRepository";

export class CardServices implements ICardRepository {
  private apiCardRepository: ApiCardRepository;
  constructor() {
    this.apiCardRepository = new ApiCardRepository();
  }

  async saveCard(iCard: ICard): Promise<IResponseMessage> {
    return this.apiCardRepository.saveCard(iCard);
  }

  async getCard(token: string): Promise<ICard> {
    return this.apiCardRepository.getCard(token);
  }

  async getAllCard(): Promise<ICard[]> {
    return this.apiCardRepository.getAllCard();
  }
}
