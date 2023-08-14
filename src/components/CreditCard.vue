<template>
  <div class="credit-card-form">
    <div class="credit-card">
      <div class="email">
        <label for="email">Correo electrónico</label>
        <input
          type="text"
          id="email"
          v-model="email"
          placeholder="•••• @gmail.com"
        />
      </div>
      <div class="card-number">
        <label for="card_number">Número de Tarjeta</label>
        <input
          type="number"
          id="card_number"
          v-model="card_number"
          placeholder="•••• •••• •••• ••••"
        />
      </div>
      <div class="expiry-date">
        <label>Fecha de Vencimiento</label>
        <div class="expiry-inputs">
          <input type="number" v-model="expiration_month" placeholder="MM" />
          <input type="number" v-model="expiration_year" placeholder="YYYY" />
        </div>
      </div>

      <div class="cvv">
        <label for="cvv">CVV</label>
        <input type="number" id="cvv" v-model="cvv" placeholder="CVV" />
      </div>
      <div>
        <button class="process-button" @click="handlerProcessCard">
          Procesar
        </button>
        <label :class="{ 'label-success': !isError, 'label-failure': isError }">
          {{ messageResponse }}
        </label>
      </div>
    </div>
    <div class="credit-card">
      <div class="search">
        <label for="search">Token Generado</label>
        <input
          type="text"
          id="search"
          v-model="token"
          placeholder="Bearer ••••••••••••"
        />
        <button class="process-button" @click="handlerSearch">Buscar</button>
        <div v-if="cardResponse && !messageTokenResponse">
          <label> Email : {{ cardResponse.email }} </label> <br />
          <label> Card Number : {{ cardResponse.card_number }} </label><br />
          <label> Exp. Year : {{ cardResponse.expiration_year }} </label><br />
          <label> Exp. Month : {{ cardResponse.expiration_month }} </label>
          <br />
        </div>
        <label class="label-failure">
          {{ messageTokenResponse }}
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { ICard } from "@/types/card/Card";

@Options({
  props: {
    messageResponse: String,
    messageTokenResponse: String,
    isError: Boolean,
    cardResponse: String,
  },
  data() {
    return {
      email: "kevinsalazar30@gmail.com",
      card_number: 4111111111111111,
      cvv: 333,
      expiration_year: "2024",
      expiration_month: "09",
      token: "",
    };
  },
  methods: {
    async handlerProcessCard() {
      const bodyRequest = {
        email: this.email,
        card_number: this.card_number,
        cvv: this.cvv,
        expiration_year: this.expiration_year,
        expiration_month: this.expiration_month,
      } as ICard;
      this.$emit("data-from-credit-card", bodyRequest);
    },
    async handlerSearch() {
      this.$emit("data-from-credit-card-token", this.token);
    },
  },
})
export default class CreditCard extends Vue {
  messageResponse!: string;
  messageTokenResponse!: string;
  isError!: boolean;
  cardResponse!: ICard;
}
</script>
<style src="./CreditCardStyles.css" scoped></style>
