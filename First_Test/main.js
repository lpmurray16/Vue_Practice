// Practicing with Vue.js -- Logan Murray June 2021
var eventBus = new Vue()

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>

        <h2>Leave a Review</h2>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>
            <input id="submit" type="submit" value="Submit">
        </p>

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: 5,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
            }
            
        }
    }
})



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
                <div class="wrap__name__variants--outter">
                    <div class="product_name_details">
                        <h2>{{ title }}</h2>
                        <p v-if="stock > 10">In Stock</p>
                        <p v-else-if="stock <= 10 && stock > 0">Almost sold out!</p>
                        <p v-else>Out of Stock</p>
                        <p>Shipping: {{ shipping }}</p>
                        <span class="green" v-if="onSale">On SALE!</span>

                        <ul>
                            <li v-for="item in features">{{ item }}</li>
                        </ul>
                        <div class="buttons">
                            <button v-on:click="addToCart"
                                :disabled="!InStock"
                                :class="{ disabledButton: !InStock }">Add to Cart</button>
                            <button v-on:click="removeFromCart">Remove From Cart</button>
                        </div>
                    </div>
                    <div class="wrap__variants">
                        <h2>Item Options:</h2>
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
                    </div>
                </div>
                
                <product-tabs :reviews="reviews"></product-tabs>

                

            </div>
        </div>
    `,
    data() {
        return {
            brand: 'Ollivanders',
            product: 'Magic Wand',
            selectedVariant: 0,
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
            ],
            reviews: []
            
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },

    },
    computed: {
        title() {
            return this.brand +' - '+ this.variants[this.selectedVariant].variantName
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

    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
    <div class="wrapper__tabs">
        <div class="tabs--inner">
            <span class='tab'
                :class='{ activeTab : selectedTab === tab }'
                v-for='(tab, index) in tabs' 
                :key='index' 
                @click='selectedTab = tab'>
                {{ tab }}
            </span>
        </div>

        <div class='wrap__reviews'>
            <product-review v-show='selectedTab === "Write a Review"'></product-review>

            <div class='shown-reviews' v-show='selectedTab === "Reviews"'>
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Rating: {{ review.rating + " out of 5" }}</p>
                        <p>{{'"'+ review.review + '"'}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Write a Review'],
            selectedTab: 'Reviews'
        }
    }
})


var app = new Vue ({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            if(this.cart.length === 0) {
                alert("Cart is Empty")
            } else {
                this.cart.pop(id)
            }
        }
    }
})