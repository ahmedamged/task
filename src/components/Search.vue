<template>
<div class="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
    <div class="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
        <div class="w-full md:w-2/5">
          <p class="text-lg font-medium text-gray-800 float-left align-middle pr-4 pt-2">From:</p>
          <Datepickera class="pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:shadow-outline border border-gray-200 text-gray-600 font-medium" v-model="pickeda" />
        </div>
        <div class="w-full md:w-2/5">
          <p class="text-lg font-medium text-gray-800 float-left align-middle pl-5 pr-4 pt-2">To:</p>
          <Datepickerb class="pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:shadow-outline border border-gray-200 text-gray-600 font-medium" v-model="pickedb" />
        </div>
        <div class="w-full md:w-1/5 flex">
          <button @click="onClick" type="button" name="button" class="mx-auto bg-gray-100 hover:bg-gray-200 border hover:border-gray-400 text-black font-bold py-2 px-6 rounded-md">Search</button>
        </div>
    </div>
    <div class="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
    <div class="w-96 h-full bg-blue-200 bg-opacity-50 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
</div>
</template>

<script>

import Datepickera from 'vue3-datepicker';
import Datepickerb from 'vue3-datepicker';
import { ref } from 'vue';
import axios from 'axios';

export default{
  name: 'Search',
  data(){
    return{
      pickeda : ref(new Date()),
      pickedb : ref(new Date()),
      list : undefined
    }
  },
  components: {
    Datepickera,
    Datepickerb
  },
  methods: {
    onClick: function() {
      let self = this;
      axios({
          url: 'https://run.mocky.io/v3/90e1d920-afca-4101-8a97-9097310d7e8a',
          method: 'GET'
      })
      .then((res) =>{
        self.list = res.data;
        console.log(self.list);
      })
    }
  }
}
</script>
