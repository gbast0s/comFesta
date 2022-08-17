<template>
    <nav aria-label="Page navigation" style="overflow-x:auto;">
        <ul class="pagination">
                        <li :class=" meta.current_page == 1 ? 'page-item button mobile disabled' : 'page-item button mobile'"><a class="page-link button" href="#" @click.prevent="changePage(meta.current_page != 1 ? meta.current_page - 1 : 1)"><i class="bi bi-arrow-left-short"></i></a></li>
            <li :class=" meta.current_page == 1 ? 'page-item button disabled' : 'page-item button'"><a class="page-link button" href="#" @click.prevent="changePage(meta.current_page != 1 ? meta.current_page - 1 : 1)">Anterior</a></li>
            <li class="page-item" v-show="pages[0] != 1"><a class="page-link" href="#" @click.prevent="changePage(1)">1</a></li>
            <li class="page-item disabled" v-show="pages[0] != 1"><a class="page-link reticencias" href="#">...</a></li>
            <li :class="meta.current_page == page ? 'page-item  active' : 'page-item' " v-for="(page, value) in pages" :key="value">
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{page}}</a>
            </li>
            <li class="page-item disabled" v-show="pages[pages.length - 1] != meta.last_page"><a class="page-link reticencias" href="#">...</a></li>
            <li class="page-item" v-show="pages[pages.length - 1] != meta.last_page"><a class="page-link" href="#" @click.prevent="changePage(meta.last_page)">{{meta.last_page}}</a></li>
            <li :class=" meta.current_page == meta.last_page ? 'page-item button disabled' : 'page-item button'"><a class="page-link button" href="#" @click.prevent="changePage(meta.current_page <= meta.last_page ? meta.current_page + 1 : meta.last_page)">Próxima</a></li>
            <li :class=" meta.current_page == meta.last_page ? 'page-item button mobile disabled' : 'page-item mobile button'"><a class="page-link button" href="#" @click.prevent="changePage(meta.current_page <= meta.last_page ? meta.current_page + 1 : meta.last_page)"><i class="bi bi-arrow-right-short"></i></a></li>
        </ul>
    </nav>
</template>

<script>
export default {
    data(){
        return {
            numShown: 5,
        }
    },
    props: {
        meta: {
            type: Object,
            default: null
        },
    },
    computed: {
        pages() {
           if(Object.keys(this.meta).length !== 0)
            {
                const numShown = Math.min(this.numShown, this.meta.last_page);
                let first = this.meta.current_page - Math.floor(numShown / 2);
                first = Math.max(first, 1);
                first = Math.min(first, this.meta.last_page - numShown + 1);
                return [...Array(numShown)].map((k,i) => i + first);   
           }
           return []
        }
    },
    methods: {
        changePage(page)
        {
            this.$emit('pagination', page)
        }
    }
}
</script>

<style scoped>

li.page-item.button {
    min-width: 95px;
}

nav{
    padding: 10px;
}

.page-item.active .page-link[data-v-849a166c] {
    background-color: #fc5d35 !important;
    border-color: #fc5d35 !important;
}

.page-link {
    color: #2b2c2e !important;
    text-align: center;
}

.page-link.button{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.page-link:hover {
    z-index: 2;
    /* color: #0056b3; */
    text-decoration: none;
    background-color: #fc5d3585;
    border-color: #fc5d358c;
    color: white !important;
}

.page-link.button:hover {
    color: white !important;
    font-size: 14px;
    width: 100%;
    height: 100%;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    background-color: #fc5d35;
    text-align: center;
    border: 1px solid #fc5d35;
}



.page-item.active .page-link {
    z-index: 3;
    color: #fff !important;
}

.page-link:focus {
    z-index: 3;
    box-shadow: 0 0 0 0.25rem rgb(252 93 53 / 25%);
}


.page-item.disabled .page-link {
    color: #6c757d !important;
}

a.page-link.reticencias{
    background-color: #e7e7e7;
}

.page-item.button.mobile{
    display: none;
}

.bi-arrow-left-short::before, .bi-arrow-right-short::before {
    font-weight: 700 !important;
}

@media (max-width: 497px) {
    li.page-item.button {
        min-width: 40px;
    }

    .page-link {
        position: relative;
        display: block;
        padding: 0.3rem 0.55rem;
        line-height: 1.1;
    }

    .page-item.button.mobile{
        display: block;
    }

    .page-item.button{
        display: none;
    }

    .page-link.button{
        font-size: 20px;
        padding: 2.6px;
    }
}
</style>