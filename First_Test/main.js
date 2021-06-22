// Practicing with Vue.js -- Logan Murray June 2021

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <a :href="ex_link" target="_blank"><img :src="product_image"/></a>
            </div>
            <div class="product-info">
                <h2>{{ title }}</h2>
                <p v-if="stock > 10">In Stock</p>
                <p v-else-if="stock <= 10 && stock > 0">Almost sold out!</p>
                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>
                <span class="green" v-if="onSale">On SALE!</span>

                <ul>
                    <li v-for="item in features">{{ item }}</li>
                </ul>

                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    class="color-box">
                    <p @click="updateProduct(index)" 
                    class="choices" 
                    :style="{ backgroundColor: variant.variantHex }">
                    {{ variant.variantName }}
                        <span>
                            {{"- " + variant.variantColor}}
                        </span>
                    </p>
                </div>

                <div class="buttons">
                    <button v-on:click="addToCart"
                    :disabled="!InStock"
                    :class="{ disabledButton: !InStock }">Add to Cart</button>
                    <button v-on:click="removeFromCart">Remove From Cart</button>
                </div>

                <div class="cart">
                    <p>Cart ( {{ cart }} )</p>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
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
            
        }
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
        },
        shipping() {
            if(this.premium) {
                return "Free"
            } else {
                return 2.99
            }
        }

    }
})


var app = new Vue ({
    el: '#app',
    data: {
        premium: true
    }
})