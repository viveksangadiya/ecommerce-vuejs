<template>
    <div class="form">
        <label for="name">Product name : </label>
        <input type="text" name="name" id="product-name" placeholder="product name" v-model="title">
        <!-- <label for="short">Short description : </label>
        <input type="text" name="short" id="short-des" placeholder="short line about the product"> -->
        <label for="short">Description : </label>
        <textarea id="des" placeholder="detail description" v-model="description"></textarea>

        <!-- product image -->
        <div class="product-info">
            <div class="product-image">
                <p class="text">product image</p>
            </div>
            <div class="upload-image-sec">
                <!-- upload inputs -->
                <p class="text"><img src="img/camera.png" alt="">upload image</p>
                <div class="upload-catalouge">
                    <input type="file" class="fileupload" id="first-file-upload-btn" hidden
                        @change="updateImage(0, $event)">
                    <label for="first-file-upload-btn" class="upload-image"></label>
                </div>
            </div>
            <div class="select-sizes">
                <p class="text">size available</p>
                <div class="sizes">
                    <input type="checkbox" class="size-checkbox" id="xs" value="xs" v-model="size">
                    <input type="checkbox" class="size-checkbox" id="s" value="s" v-model="size">
                    <input type="checkbox" class="size-checkbox" id="m" value="m" v-model="size">
                    <input type="checkbox" class="size-checkbox" id="l" value="l" v-model="size">
                    <input type="checkbox" class="size-checkbox" id="xl" value="xl" v-model="size">
                    <input type="checkbox" class="size-checkbox" id="xxl" value="xxl" v-model="size">
                    <input type="checkbox" class="size-checkbox" id="xxxl" value="xxxl" v-model="size">
                </div>
            </div>
        </div>

        <div class="product-price">
            <input type="number" id="actual-price" placeholder="actual price" v-model="price">
            <!-- <input type="number" id="discount" placeholder="discount percentage"> -->
            <!-- <input type="number" id="sell-price" placeholder="selling price"> -->
        </div>

        <input type="number" id="stock" min="20" placeholder="item in stocks (minimum 20)" v-model="stocks">

        <textarea id="tags" @input="updateCategories"
            placeholder="Enter categories here, for example - Men, Jeans, Blue Jeans, Rough jeans (you sholud add men or women at start)"
            v-model="categoriesInput"></textarea>

        <input type="checkbox" class="checkbox" id="tac" checked>
        <label for="tac">clothing take 30% from your total sell</label>

        <div class="buttons">
            <button class="btn" id="add-btn" @click="addProduct">add product</button>
            <button class="btn" id="save-btn">save draft</button>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
    name: "ProductAddPage",
    methods: {
        clearFormData() {
            // Reset form data to initial state
            this.formData = {
                title: "",
                description: "",
                image: [],
                size: [],
                price: null,
                stocks: null,
                categories: [],
                categoriesInput: ""
            };
        },
        updateCategories() {
            this.categories = this.categoriesInput.split(',').map(category => category.trim());
        },
        updateImage(index, event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    this.image.splice(index, 1, reader.result);
                };
                reader.readAsDataURL(file);
            }
        },
        async addProduct() {
            // var formValue={
            //     title:this.title,
            //     description:this.description,
            //     image:this.image,
            //     size:this.size,
            //     price:this.price,
            //     stock:this.stocks,
            //     categories:this.categories
            // };
            var formValue = {
                title: this.title,
                desc: this.description, // Assuming `description` corresponds to `desc` in the schema
                img: this.image, // Assuming `image` corresponds to `img` in the schema
                price: this.price,
                currency: "INR",
                quantity: this.stocks, // Assuming `stocks` corresponds to `quantity` in the schema
                category: this.categories,
                size: this.size,
                // Assuming there's no direct mapping for `inStock` in your form, you may set it as needed
                inStock: true // Example: Assuming all new products are in stock by default
            };
            console.log(localStorage.getItem('token'))
            await axios.post("http://localhost:8000/api/products/", formValue, {
                headers: {
                    "Content-Type": "application/json",
                    "token": "Bearer " + localStorage.getItem('token')
                }
            }).then((res) => {
                console.log(res);
                this.clearFormData();
            })
        }
    },
    computed: {
        ...mapState(["product"]),
        categoriesInput: {
            get() {
                return this.categories.join(', ');
            },
            set(value) {
                this.categories = value.split(',').map(category => category.trim());
            }
        }
    },
    created() {

    },
    mounted() {
        console.log("edit product", this.product);
        const currentURL = window.location.href;
        console.log(currentURL)
        // Check if the URL contains the isEdit parameter
        const isEditNo = currentURL.includes("isEdit=0");
        if (isEditNo) {

            this.clearFormData();
        } else {
            this.title = this.product.title;
            this.description = this.product.desc;
            this.size = this.product.size;
            this.price = this.product.price;
            this.stocks = this.product.quantity;
            this.categoriesInput = this.product.category;
        }

    },
    data() {
        return {
            title: "",
            description: "",
            image: [],
            size: [],
            price: null,
            stocks: null,
            categories: [],
            categoriesInput: "",
        }
    }
}
</script>
<style>
html {
    font-size: 100% !important;
    font-weight: 500;
}

input,
textarea {
    font-weight: 300;
    margin-bottom: 13px !important;
}

input:not(input[type="checkbox"]) {
    width: 100%;
}

textarea {
    width: 100%;
    height: 270px;
    resize: none;
    padding: 10px 20px;
}

::placeholder {
    font-size: 16px;
}

.product-info {
    width: 100%;
    height: 500px;
    display: grid;
    grid-template-columns: .75fr 1.25fr;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 20px;
    margin-bottom: 20px;
}

.product-image {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    background-size: cover;
    border-radius: 10px;
    grid-row: span 2;
    text-shadow: 0 0 10px #fff;
}

.text {
    text-transform: capitalize;
    color: #383838;
    font-size: 20px;
    font-weight: 500;
}

.upload-image-sec,
.select-sizes {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
}

.text img {
    height: 20px;
    margin-right: 10px;
}

.upload-catalouge {
    width: 100%;
    margin: 20px 0;
    display: grid;
    grid-template-columns: repeat(4, 100px);
    grid-gap: 10px;
}

.upload-image {
    width: 100%;
    height: 100px;
    background: #f5f5f5;
    cursor: pointer;
    background-size: cover;
}

.upload-image:hover {
    background: rgba(0, 0, 0, 0.2);
    background-size: cover;
}


.sizes {
    margin-top: 30px;
}

.size-checkbox {
    -webkit-appearance: none;
    width: 100px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #383838;
    cursor: pointer;
    margin-bottom: 10px;
    margin-right: 10px;
    position: relative;
    color: #383838;
}

.size-checkbox::after {
    content: attr(value);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    text-transform: uppercase;
}

.size-checkbox:checked {
    background: #383838;
    color: #fff;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.product-price {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
}

.product-price input {
    margin: 0;
}

.buttons {
    margin: 20px 0 50px;
}

.btn {
    padding: 10px 30px;
    text-transform: capitalize;
    color: #fff;
    background: #383838;
    border-radius: 5px;
    border: none;
    outline: none;
    margin-right: 10px;
    cursor: pointer;
}

.form {
    overflow-y: auto;
}

#save-btn {
    background: #a9a9a9;
}
</style>