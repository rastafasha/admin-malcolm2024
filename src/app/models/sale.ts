export class Sale{
    constructor(
    public id: number,
      public user_id: number,
      public method_payment: string,
      public currency_total: string,
      public currency_payment: string,
      public total: number,
      public price_dolar: null,
      public n_transaccion: string,
      public created_at: Date,
      public updated_at: Date,
      public deleted_at: null
    )
    {}
}