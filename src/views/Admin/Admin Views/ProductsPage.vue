<template>
    <div class="productTable">
        <!-- <div class="noData" v-if="!getProducts">
          <h1>Loading</h1>
      </div> -->
        <Button label="Add Product" aria-label="Filter" class="addProductButton" @click="addProductRoute" />
        <table>
            <thead>
                <tr style="background-color: gray;">
                    <th class="photo pt" style="color: #fff;">Photo</th>
                    <th class="name" style="color: #fff;">Name</th>
                    <th class="category" style="color: #fff;">Category</th>
                    <th class="price" style="color: #fff;">Price</th>
                    <th class="view" style="color: #fff;">Rate</th>
                    <th class="rate" style="color: #fff;">Count</th>
                    <th class="updated" style="color: #fff;">Latest_update</th>
                    <th class="control btns" style="color: #fff;">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="index">
                    <td class="photo"><img :src="product.img" alt=""></td>
                    <td class="name">{{ product.title }}</td>
                    <td class="category">
                        <div class="chip" v-for="(category, catIndex) in product.category" :key="catIndex">
                            {{ category }}
                        </div>
                    </td>
                    <td class="price p">{{ product.price }}</td>
                    <td class="view vc">{{ product.rate }}</td>
                    <td class="count re">{{ product.count }}</td>
                    <td class="updated">{{ product.latest_update }}</td>
                    <td class="control btns">
                        <Button icon="pi pi-pencil" aria-label="Filter" @click="editProduct(product)" />
                        <Button icon="pi pi-trash" aria-label="Filter" />
                        <Button icon="pi pi-eye" aria-label="Filter" />
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- <div class="noData" v-else>
          <h1>There is no product here.</h1>
      </div> -->
        <div class="paginator">
            <Paginator :maxVisibleButton="maxVisibleButton"></Paginator>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    name: "ProductsPage",
    components: {

    },
    data() {
        return {
            total: 0,
        };
    },
    methods: {
        ...mapActions(["set_product"]),
        addProductRoute() {
            this.$router.push({ path: "/admin/addproduct", query: { isEdit: 0 } });
        },
        editProduct(product) {
            this.set_product(product);
            this.$router.push("/admin/addproduct");
        }
    },
    computed: {
        ...mapState(["products"]),
    },
    mounted() {

    },
    created() {

    }
};
</script>

<style scoped>
.addProductButton {
    color: white !important;
    font-size: 1.5rem !important;
    padding: 15px 30px !important;
    border-radius: 10px !important;
    margin: 15px;
}

.chip {
    display: inline-block;
    background-color: #4fb9af;
    color: #fff;
    padding: 4px 8px;
    margin-right: 5px;
    border-radius: 16px;
    font-size: 0.8rem;
}

.productTable {
    width: 100%;
    height: 90%;
    position: relative;
    font-size: 2rem;
}

.productTable .paginator {
    width: 100%;
    position: absolute;
    bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table tr {
    width: 100%;
    border: 1px solid black;
}

/* table tbody tr:nth-child(even){
        background: #b3e0dc;
    } */
/* table tbody tr:hover{
        background: #cad2d1;
    } */
table thead tr th {
    padding: 14px 7px;
}

table tr td {
    padding: 10px 7px;
}

.photo {
    width: 5%;
    height: 75px;
    text-align: center;
}

.pt {
    height: 50px
}

.photo img {
    max-height: 100%;
}

.name {
    width: 25%;
    text-align: center;
}

.category {
    width: 14%;
    text-align: center;
}

.price {
    width: 13%;
}

.p {
    text-align: center;
}

.view {
    width: 8%;
}

.vc {
    text-align: center;
}

.count {
    width: 5%;
}

.re {
    text-align: center;
}

.control {
    width: 10%;
    text-align: center;
}

.control button {
    width: 22px;
    height: 22px;
    line-height: 22px;
    border-radius: 50%;
    margin-right: 6px;
    border: 1px solid #4fb9af;
    background: #fff;
    color: teal;
    transition: 0.5s;
}

.control button:hover {
    transform: scale(1.3);
}

.updated {
    width: 20%;
    text-align: end;
}

.noData {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.noData h1 {
    color: teal;
}

/* make it responsive */
@media (max-width: 991px) {

    .view,
    .count,
    .category {
        display: none;
    }

    .photo {
        width: 20%;
    }

    .name {
        width: 20%;
    }

    .category {
        width: 20%;
    }

    .price {
        width: 20%;
    }
}

@media (max-width : 768px) {
    .photo {
        width: 25%;
        font-size: 0.8rem;
    }

    .name {
        width: 25%;
        font-size: 0.8rem;
    }

    .category {
        width: 25%;
        font-size: 0.8rem;
    }

    .price {
        width: 10%;
        font-size: 0.8rem;
    }

    .updated {
        width: 15%;
        font-size: 0.8rem;
    }

    table tr th {
        padding: 10px 7px;
    }

    table tr td {
        padding: 8px 6px;
    }
}

@media (max-width : 650px) {

    .price,
    .updated {
        display: none;
    }

    .photo {
        width: 35%;
    }

    .name {
        width: 35%;
        text-align: center;
    }

    .control {
        width: 30%;
        font-size: 0.6rem;
        text-align: center;
    }

    table tr th {
        padding: 8px 5px;
    }

    table tr td {
        padding: 6px 4px;
    }
}

@media (max-width: 485px) {
    .noData h1 {
        font-size: 1.5rem;
    }
}
</style>