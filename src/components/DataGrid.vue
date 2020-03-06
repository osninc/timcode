<template>
    <v-row align="center" justify="center">
        <v-col cols="12">
            <div style="height: calc(100% - 25px);">
                <div class="search-input">
                    <v-text-field
                            placeholder="Quick filter..."
                            v-on:input="onQuickFilterChanged()" id="quickFilter"
                            prepend-inner-icon="mdi-magnify"
                            outlined>
                    </v-text-field>
                </div>
                <ag-grid-vue
                        style="width: 100%; height: 300px;"
                        class="ag-theme-balham"
                        :gridOptions="gridOptions"
                        @grid-ready="onGridReady"
                        :columnDefs="columnDefs"
                        :defaultColDef="defaultColDef"
                        :headerHeight="headerHeight"
                        :sideBar="sideBar"
                        :rowData="records"
                        :floatingFilter="true"
                        :modules="modules"
                        @cellClicked="cellClicked"
                        rowSelection="multiple">
                </ag-grid-vue>
            </div>
        </v-col>
    </v-row>
</template>

<script>
    import {AgGridVue} from '@ag-grid-community/vue'
    import { AllModules } from "@ag-grid-enterprise/all-modules"
    import "@ag-grid-enterprise/column-tool-panel"
    import {openPage} from '../services/analytic.service'

    export default {
        name: 'DataGrid',
        props: {
            records: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                gridOptions: null,
                gridApi: null,
                columnApi: null,
                defaultColDef: null,
                pivotGroupHeaderHeight: null,
                pivotHeaderHeight: null,
                groupHeaderHeight: null,
                headerHeight: null,
                modules: AllModules,
                columnDefs: []
            }
        },
        components: {
            AgGridVue
        },
        beforeMount() {
            this.gridOptions = {};
            this.columnDefs = [];
            this.defaultColDef = {
                resizable: true,
                width: 100,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: true,
                filter: true,
                sortable: true,
            };
            this.groupHeaderHeight = 75;
                this.pivotGroupHeaderHeight = 50;
            this.pivotHeaderHeight = 100;
            this.sideBar = {
                toolPanels: [
                    "filters",
                    {
                        id: "columns",
                        labelDefault: "Columns",
                        labelKey: "columns",
                        iconKey: "columns",
                        toolPanel: "agColumnsToolPanel",
                        toolPanelParams: { suppressSyncLayoutWithGrid: true }
                    }
                ]
            }
        },
        mounted() {
            this.gridApi = this.gridOptions.api;
            this.gridColumnApi = this.gridOptions.columnApi;
        },
        methods: {
            onQuickFilterChanged() {
                this.gridApi.setQuickFilter(document.getElementById('quickFilter').value);
            },
            onGridReady(params) {

            },
            setColumnDefinition(columns) {
                this.gridApi.setColumnDefs(columns);
            },

            cellClicked(evt) {
              if(evt.colDef.colId === 'id' && evt.data.id) {
                  openPage(evt.data.href)
              }
            }
        },
    }
</script>

<style scoped>
    .search-input {
        width: 200px;
        margin-bottom: 10px;
    }
</style>
