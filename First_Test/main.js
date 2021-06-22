var app = new Vue ({
    el: '#app',
    data: {
        brand: 'Ollivanders',
        product: 'Magic Wand',
        selectedVariant: 0,
        cart: 0,
        details: ["11 inches", "Holly","Phoenix Feather Core"],
        variants: [
            {
                variantId: 1231,
                variantName: "Harry's Wand",
                variantHex: "#795548",
                variantColor: "Dark Brown & Grey",
                variantDetails: ["11 inches", "Holly","Phoenix Feather Core"],
                variantImage: "assets/harrys_wand.jpg",
                variantInventory: 14,
                variantOnSale: false,
                variantLink: "https://harrypottershop.co.uk/collections/wands/products/harry-potters-wand"
            },
            {
                variantId: 1232,
                variantName: "Hermione's Wand",
                variantHex: "#957a58",
                variantColor: "Light Brown",
                variantDetails: ["10.75 inches", "Vine Wood","Dragon Heartstring Core"],
                variantImage: "assets/hermione_wand.webp",
                variantInventory: 9,
                variantOnSale: true,
                variantLink: "https://harrypottershop.co.uk/collections/wands/products/hermione-grangers-wand"
            }
        ]
        
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeFromCart() {
            if(this.cart === 0){
                alert("The Cart is empty.")
            } else {
                this.cart -= 1
            }
            
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        } 
    },
    computed: {
        title() {
            return this.brand +' '+ this.variants[this.selectedVariant].variantName
        },
        product_image() {
            return this.variants[this.selectedVariant].variantImage
        },
        InStock() {
            return this.variants[this.selectedVariant].variantInventory > 0
        },
        stock() {
            return this.variants[this.selectedVariant].variantInventory
        },
        features() {
            return this.variants[this.selectedVariant].variantDetails
        },
        buttonColor() {
            return this.variants[this.selectedVariant].variantHex
        },
        ex_link() {
            return this.variants[this.selectedVariant].variantLink
        },
        onSale() {
            return this.variants[this.selectedVariant].variantOnSale
        }

    }
})