import { ShoppingCartItem } from "./ShoppingCartItem";

export class ShoppingCart {
    itemsProduct: Array<ShoppingCartItem>;
    total: number;

    constructor() {
        this.itemsProduct = [];
        this.total = 0;
    }

    public clearCart() {
        this.itemsProduct = [];
        this.total = 0;
    }

    public addItem(shoppingCartItem: ShoppingCartItem) {
        let elem: ShoppingCartItem | undefined = this.itemsProduct.find(
            x => x.itemProduct.productID == shoppingCartItem.itemProduct.productID
        );

        if (elem == undefined) {
            this.itemsProduct.push(shoppingCartItem);
        } else {
            elem.addProduct(shoppingCartItem);
        }
    }

    public removeItem(shoppingCartItem: ShoppingCartItem) {
        let elem: ShoppingCartItem | undefined = this.itemsProduct.find(
            x => x.itemProduct.productID == shoppingCartItem.itemProduct.productID
        );
        if (elem != undefined) {
            elem.subtractProduct(shoppingCartItem);
            if (elem.quantity <= 0) {
                const index = this.itemsProduct.indexOf(elem);
                if (index > -1) {
                    this.itemsProduct.splice(index, 1);
                }
            }
        }
    }
}
