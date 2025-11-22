import { ShoppingCartItem } from "./ShoppingCartItem";

export class ShoppingCart {
    clearCart() {
      this.itemsProduct = [];
      this.total = 0;
    }
    itemsProduct: Array<ShoppingCartItem>;
    total: number;

    constructor(){
        this.itemsProduct = new Array()
        this.total = 0
    }

    public addItem(shoppingCartItem: ShoppingCartItem){
        let elem : ShoppingCartItem | undefined = this.itemsProduct.find(
                x => x.itemProduct.productID ==
                 shoppingCartItem.itemProduct.productID)
        
        if(elem == undefined){
            this.itemsProduct.push(shoppingCartItem)
        } else {
            elem.addProduct(shoppingCartItem)
        }
    }

    public removeItem(shoppingCartItem: ShoppingCartItem){
        let elem : ShoppingCartItem | undefined = this.itemsProduct.find(x => x.itemProduct.productID == shoppingCartItem.itemProduct.productID)
        if(elem != undefined){
            elem.subtractProduct(shoppingCartItem)
            if(elem.quantity == 0){
                this.itemsProduct.splice(this.itemsProduct.indexOf(shoppingCartItem), 1)
            }
        }
    }

    public getItems(){
        for(var index in this.itemsProduct){ 
            console.log("\n\n"  + this.itemsProduct[index].displayProduct() +"\n"); 
        }
    }
}