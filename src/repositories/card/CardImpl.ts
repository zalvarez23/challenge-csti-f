import { ICard } from "@/types/card/Card";
import { ICardRepository } from "../../types/card/CardRepository";
import { ApiClient } from "../../utils/ApiClient";
import { AxiosResponse } from "axios";
import { IResponseMessage } from "@/types/card/ResponseMessage";

export class ApiCardRepository implements ICardRepository {
  private apiClient: ApiClient;
  constructor() {
    this.apiClient = ApiClient.getInstance();
  }

  async saveCard(iCard: ICard): Promise<IResponseMessage> {
    const response: AxiosResponse<IResponseMessage> = await this.apiClient
      .getHttpClient()
      .post(`${process.env.VUE_APP_API_URL}/create-token`, iCard, {
        headers: { "X-Api-Key": process.env.VUE_APP_X_API_KEY },
      });
    return response.data;
  }

  async getCard(token: string): Promise<ICard> {
    const response: AxiosResponse<ICard> = await this.apiClient
      .getHttpClient()
      .get(`${process.env.VUE_APP_API_URL}/get-card`, {
        headers: {
          "X-Api-Key": process.env.VUE_APP_X_API_KEY,
          Authorization: `${token}`,
        },
      });
    return response.data;
  }

  async getAllCard(): Promise<ICard[]> {
    const response: AxiosResponse<ICard[]> = await this.apiClient
      .getHttpClient()
      .get(`${process.env.VUE_APP_API_URL}/get-all-card`, {
        headers: {
          "X-Api-Key": process.env.VUE_APP_X_API_KEY,
        },
      });
    return response.data;
  }
}
