class Restaurant {
    constructor(budget) {
        this.budgetMoney = Number(budget)
        this.menu = {}
        this.stockProducts = {}
        this.history = []
    }

    loadProducts(arr) {
        for (let line of arr) {
            let [productName, productQuantity, productTotalPrice] = line.split(' ')
            productTotalPrice = Number(productTotalPrice)
            productQuantity = Number(productQuantity)

            if (productTotalPrice <= this.budgetMoney) {
                if (productName in this.stockProducts) {
                    this.stockProducts[productName] += productQuantity
                } else {
                    this.stockProducts[productName] = productQuantity
                }
                this.budgetMoney -= productTotalPrice
                this.history.push(`Successfully loaded ${productQuantity} ${productName}`)
            } else {
                this.history.push(`There was not enough money to load ${productQuantity} ${productName}`)
            }
        }

        return this.history.join('\n')
    }

    addToMenu(meal, arr, price) {
        if (meal in this.menu) {
            return `The ${meal} is already in the our menu, try something different.`
        }

        let products = {}

        for (let line of arr) {
            let [productName, productQuantity] = line.split(' ')
            productQuantity = Number(productQuantity)
            products[productName] = productQuantity
        }

        this.menu[meal] = { products, price }

        if (Object.keys(this.menu).length == 1) {
            return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`
        } else if (Object.keys(this.menu).length == 0 || 2 <= Object.keys(this.menu).length) {
            return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`
        }

    }

    showTheMenu() {
        let result = []
        if (Object.keys(this.menu).length == 0) {
            return "Our menu is not ready yet, please come later..."
        }
        for (let meal in this.menu) {
            result.push(`${meal} - $ ${this.menu[meal].price}`)
        }

        return result.join('\n')

    }

    makeTheOrder(meal) {
        if (!(meal in this.menu)) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        }
        for (const product in this.menu[meal].products) {
            if (!(product in this.stockProducts) || this.stockProducts[product] < this.menu[meal].products[product]) {
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`
            }
        };

        for (const product in this.menu[meal].products) {
            this.stockProducts[product] -= this.menu[meal].products[product];
            
        };
        this.budgetMoney += this.menu[meal].price;
        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`;
    }
}
let kitchen = new Restaurant(1000);
kitchen.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 20 10', 'Banana 5 1']);
kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99);
console.log(kitchen.makeTheOrder('frozenYogurt'));
