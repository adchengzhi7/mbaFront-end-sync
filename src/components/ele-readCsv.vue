<template>
    <div class="p-5">
   <vue-csv-import
   v-slot="{file}"
    v-model="csv"
    :fields="{name: {required: false, label: 'Name'}, age: {required: true, label: 'Age'}}"
>
    <vue-csv-toggle-headers></vue-csv-toggle-headers>
    <vue-csv-errors></vue-csv-errors>
    <vue-csv-input :name="file"></vue-csv-input>
    <vue-csv-submit></vue-csv-submit>
    <vue-csv-map :auto-match="true"></vue-csv-map>
</vue-csv-import>
{{csv}}

    </div>
</template>

<script>
import {VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, VueCsvInput, VueCsvErrors, VueCsvImport} from 'vue-csv-import';
export default {
    component:{
        VueCsvToggleHeaders, VueCsvSubmit, VueCsvMap, 
        VueCsvInput, VueCsvErrors, VueCsvImport
    },
    data() {
    return {
        csv:'',

    }
},
methods: {
     
},
}
</script>