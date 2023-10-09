class product {
    constructor(id, name, description, price, image){
        this.id = id;
        this.name=name;
        this.description = description;
        this.price = price;
        this.image = image;
    }

    get id(){return this.id;}
    set id(id){this.id=id;}

    get name(){return this.name;}
    set name(name){this.name=name;}
    
    get description(){return this.description;}
    set description(description){this.description=description}
    
    get price(){return this.price}
    set price(price){this.price=price}

    get image(){return this.image}
    set image(image){this.image=image}
}