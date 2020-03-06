<template>
    <div>
        <v-row>
            <v-col class="d-flex" cols="12" sm="4" md="4">
                <v-select
                        :items="items"
                        label="Select Provider"
                        prepend-inner-icon="home"
                        v-model="form.serviceProvider"
                        outlined>
                </v-select>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <v-text-field
                        label="Enter City, State"
                        prepend-inner-icon="place"
                        v-model="form.location"
                        outlined>
                </v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <v-text-field
                        label="Enter Unit Size(Beds)"
                        prepend-inner-icon="single_bed"
                        v-model="form.bedCount"
                        outlined>
                </v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" sm="4" md="4">
                <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                v-model="startDate"
                                label="Enter Start Date"
                                prepend-inner-icon="event"
                                readonly
                                outlined
                                v-on="on">
                        </v-text-field>
                    </template>
                    <v-date-picker v-model="startDate"
                                   color="green lighten-1"
                                   @input="menu1 = false">
                    </v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="12" sm="4" md="4">
                <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                v-model="endDate"
                                label="Enter End Date"
                                prepend-inner-icon="event"
                                readonly
                                outlined
                                v-on="on">
                        </v-text-field>
                    </template>
                    <v-date-picker v-model="endDate"
                                   color="green lighten-1"
                                   @input="menu2 = false">
                    </v-date-picker>
                </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
                    <v-btn class="ma-2" depressed small color="primary" large v-bind:block="btnLarge" @click="onFilter" :outlined="true">
                    SEARCH
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {isUndefinedOrNullOrEmpty} from "../utils/inspect";
    
    export default {
        data: () => ({
            items: ['Airbnb', 'Zillow'],
            menu1: false,
            menu2: false,
            btnLarge: true,
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            form: {
                serviceProvider: '',
                bedCount: 1,
                fileSelf: null,
                location: '',
            }
        }),
        methods: {
            resetForm() {
                this.form = {

                serviceProvider: '',
                  bedCount: 1,
                  fileSelf: null,
                  location: '',
                };

                this.startDate =  new Date().toISOString().substr(0, 10)
                this.endDate = new Date().toISOString().substr(0, 10)
            },
            isValidData(data) {
                return data &&
                    !isUndefinedOrNullOrEmpty(data.serviceProvider) &&
                    !isUndefinedOrNullOrEmpty(data.location) &&
                    !isUndefinedOrNullOrEmpty(data.bedCount);
            },
            onFilter() {
                if (this.isValidData(this.form)) {
                    this.$emit(
                        'search',
                        {
                            serviceProvider: this.form.serviceProvider,
                            bedCount: this.form.bedCount,
                            location: this.form.location,
                            createdDate: Date.now(),
                            startDate: this.startDate,
                            endDate: this.endDate,
                        }
                    );
                }
            }
        }
    };
</script>
