class buys {
  constructor(idBuy, productsList, total) {
    this.idBuy = idBuy;
    this.products = productsList;
    this.total = total;
  }

  get idBuy() { return this}
  set idBuy(idBuy){this.idBuy = idBuy}

  get productsList() { return this.productsList}
  set products(productsList) { this.productsList = productsList}

  get total() { return this.total}
  set total(total) { this.total = total}
}
