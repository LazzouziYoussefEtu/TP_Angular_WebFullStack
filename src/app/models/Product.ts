export class Product {
    private _productTitle!: String;
    public get productTitle(): String { return this._productTitle; }
    public set productTitle(value: String) { this._productTitle = value; }

    private _productPrice!: String; 
    public get productPrice(): String { return this._productPrice; }
    public set productPrice(value: String) { this._productPrice = value; }

    private _productImage: String ="";
    public get productImage(): String { return this._productImage; }
    public set productImage(value: String) { this._productImage = value; }

    private _category: String = "";
    public get category(): String { return this._category; }
    public set category(value: String) { this._category = value; }

    private _productDescription: String = "";
    public get productDescription(): String { return this._productDescription; }
    public set productDescription(value: String) { this._productDescription = value; }

    private _description: String = "";
    public get description(): String { return this._description; }
    public set description(value: String) { this._description = value; }

    constructor(readonly productID: String){}
    
    public printProduct(): String{
        return "productID:" +this.productID +", productTitle: "+this.productTitle + ", productPrice: " + this.productPrice + ", description: " + this.productDescription
    }

    public imageUrl(): String{
        return "assets/images/" + this.productImage;
    }
}
