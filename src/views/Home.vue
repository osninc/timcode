<template>
    <v-app id="inspire">
        <v-app-bar app color="indigo" dark>
            <v-toolbar-title> SCRAPE TOOL</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-app-bar>
        <v-content>
            <div class="body-content">
                <v-card class="body-content">
                    <app-header></app-header>
                    <search-form v-on:search="onFilter" ref="searchForm"></search-form>
                </v-card>
                <v-card class="body-content" v-show="!firstSearch && !loading">
                    <data-grid :records="records || []" ref="grid" v-show="dataAvailable"></data-grid>
                    <div v-show="emptyRecords" class="grid-msg-container">
                        <p class="empty-grid-msg"> Opps no data was found</p>
                    </div>
                </v-card>

                <div class="body-content">
                    <v-progress-linear v-if="loading"
                                       indeterminate
                                       color="green">
                    </v-progress-linear>
                </div>
            </div>
        </v-content>
        <v-footer color="indigo" app>
            <span class="white--text">Dynamic-Stay&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    import Header from '../components/Header.vue';
    import SearchForm from '../components/SearchForm.vue';
    import DataGrid from '../components/DataGrid.vue';
    import {findInfoByFilter} from "../services/analytic.service";
    import {getGridColumnDefinition} from "../helpers/data-grid-helper/data.grid.helper";

    export default {
        name: 'Home',
        components: {
            'app-header': Header,
            'search-form': SearchForm,
            'data-grid': DataGrid,
        },
        data() {
            return {
                records: null,
                firstSearch: true,
                columnDefs: [],
                loading: false,
            }
        },
        methods: {
            onFilter: function (data) {
                const vm = this;
                this.firstSearch = false;
                this.loading = true;
                findInfoByFilter(data).then(records => {
                    vm.loading = false;
                    vm.$refs.grid.setColumnDefinition(getGridColumnDefinition(data.serviceProvider));
                    vm.records = records;
                    vm.$refs.searchForm.resetForm();
                });
            }
        },
        computed: {
            emptyRecords() {
                return this.records && this.records.length === 0
            },
            dataAvailable() {
                return this.records && this.records.length > 0
            }
        }
    };
</script>

<style lang="scss" scoped>
    .body-content {
        padding: 20px;
        margin-top: 10px;
    }

    .grid-msg-container {
        display: flex;
        height: calc(100% - 25px);
    }

    .empty-grid-msg {
        margin: auto;
        font-size: 22px;
        color: #ccc;
    }
</style>
