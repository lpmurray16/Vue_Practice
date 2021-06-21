var app = new Vue ({
    el: '#app',
    data: {
        brand: 'Ollivanders',
        product: 'Magic Wand',
        product_image: 'assets/harrys_wand.jpg',
        inventory: 0,
        InStock: true,
        onSale: true,
        cart: 0,
        ex_link: '#',
        details: ["11 inches", "Holly","Phoenix Feather Core"],
        variants: [
            {
                variantId: 1231,
                variantName: "Harry's Wand",
                variantHex: "#795548",
                variantColor: "Dark Brown & Grey",
                variantDetails: ["11 inches", "Holly","Phoenix Feather Core"],
                variantImage: "assets/harrys_wand.jpg",
                variantInventory: 19,
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
        updateProduct(variantName, variantLink, variantImage, variantDetails, variantInvenotry) {
            this.product = variantName
            this.product_image = variantImage
            this.details = variantDetails
            this.inventory = variantInvenotry  
            if(variantInvenotry > 0){
                this.InStock = true
            } else {
                this.InStock = false
            }
            this.ex_link = variantLink
        } 
    },
    computed: {
        title() {
            return this.brand +' '+ this.product
        }
    }
})