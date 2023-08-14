<template>
  <div class="card-validation">
    <CreditCard
      @data-from-credit-card="handlerDataCard"
      @data-from-credit-card-token="handlerSearch"
      :messageResponse="messageResponse"
      :messageTokenResponse="messageTokenResponse"
      :isError="isError"
      :cardResponse="cardResponse"
    />
  </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CreditCard from "@/components/CreditCard.vue";
import { CardServices } from "@/services/card/CardServices";
import { ICard } from "@/types/card/Card";

@Options({
  name: "CardValidation",
  components: {
    CreditCard,
  },
  data() {
    return {
      messageResponse: "",
      messageTokenResponse: "",
      isError: false,
      cardResponse: "",
    };
  },
  methods: {
    async handlerDataCard(card: ICard) {
      const cardServices = new CardServices();
      try {
        const result = await cardServices.saveCard(card);
        this.messageResponse = `${result?.message} token : ${result.token}`;
        this.isError = false;
        //eslint-disable-next-line
      } catch (error: any) {
        //Agregamos any por que no sabemos el tipo de error q devolvera el api
        if (error?.response?.data?.message) {
          this.messageResponse = error?.response?.data?.message;
          this.isError = true;
        }
      }
    },
    async handlerSearch(token: string) {
      const cardServices = new CardServices();
      try {
        const result = await cardServices.getCard(token);
        this.cardResponse = result;
        this.messageTokenResponse = "";
        //eslint-disable-next-line
      } catch (error: any) {
        //Agregamos any por que no sabemos el tipo de error q devolvera el api
        this.messageTokenResponse = error?.response?.data?.message;
      }
    },
  },
})
export default class HomeView extends Vue {
  cardResponse!: ICard;
  messageResponse!: string;
  messageTokenResponse!: string;
  isError!: boolean;
}
</script>

<style scoped>
.card-validation {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
}
</style>
