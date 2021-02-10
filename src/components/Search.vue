<template>
<div>
  <div class="min-w-screen min-h-screen h-auto bg-blue-100 flex flex-wrap items-center p-5 lg:p-20 overflow-hidden relative">
      <div class="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-10 text-gray-800 relative md:flex items-center text-center md:text-left">
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
      <div class="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-10 text-gray-800 relative md:flex items-center text-center md:text-left mt-5">
          <div class="w-full md:w-1/3 place-self-start">
            <input type="search" name="serch" v-model="search" placeholder="Search" class="bg-white w-4/5 h-10 px-5 pr-10 border rounded-full text-sm focus:outline-none">
            <button type="submit" class="right-0 top-0 mt-3 -ml-8 p-1">
              <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="512px" height="512px">
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"/>
              </svg>
            </button>
            <div class="mt-5">
              <label for="priceRange" class="font-bold">Price Filter</label>
              <span class="ml-2 mr-2 font-bold">&lt;</span><span v-text="filteredLabel"></span>
              <input id="priceRange" type="range" name="range" min="1" max="400" step="1" v-model="value" class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-5 w-4/5">
            </div>
          </div>
          <div class="w-full md:w-2/3 flex flex-wrap">
            <div class="md:w-1/3 mt-4">
              <p class="ml-5"><span class="font-bold">Total Nights: </span> {{days}}</p>
            </div>
            <div class="md:w-2/3">
              <button @click="sortName" type="button" name="button" class="mx-16 bg-gray-100 hover:bg-gray-200 border hover:border-gray-400 text-black font-bold py-2 px-6 rounded-md">Sort by Name</button>
              <button @click="sortPrice" type="button" name="button" class="bg-gray-100 hover:bg-gray-200 border hover:border-gray-400 text-black font-bold py-2 px-6 rounded-md">Sort by Price</button>
            </div>
            <div v-for="hotel in filteredSearch" v-bind:key="hotel.id" class="border shadow-lg p-8 mt-5 rounded-xl w-1/2">
              <p><span class="font-bold">Name: </span>{{hotel.name}}</p>
              <p><span class="font-bold">Price: </span>{{multiplyPrice(hotel)}}</p>
              <p><span class="font-bold">City: </span>{{hotel.city}}</p>
            </div>
          </div>
      </div>
      <div class="w-64 md:w-96 h-96 md:h-2/5 bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
      <div class="w-96 h-2/5 bg-blue-200 bg-opacity-50 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
  </div>
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
      hotels : undefined,
      filteredhotels : new Array(),
      days : 0,
      search : '',
      value : 400
    }
  },
  components: {
    Datepickera,
    Datepickerb
  },
  methods: {
    onClick: function() {
      let self = this;
      self.days = Math.ceil(Math.abs(self.pickedb - self.pickeda) / (1000 * 60 * 60 * 24));

      axios({
          url: 'https://run.mocky.io/v3/90e1d920-afca-4101-8a97-9097310d7e8a',
          method: 'GET'
      })
      .then((res) =>{
        self.hotels = res.data;
        this.filteredHotels();
      })
    },
    filteredHotels: function() {
      this.filteredhotels.length = 0;
      return this.hotels.filter(hotel => {
        let available_date = new Date(hotel.available_on);
        if(available_date > this.pickeda && available_date < this.pickedb){
          this.filteredhotels.push(hotel);
        }
      })
    },
    multiplyPrice: function(hotel){
       return hotel.price * this.days;
    },
    sortName: function() {
      this.filteredhotels.sort((a, b) => {return a.name.localeCompare(b.name)});
    },
    sortPrice: function() {
      this.filteredhotels.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
  },
  computed: {
    filteredSearch() {
      return this.filteredhotels.filter(hotel => {
        return hotel.name.toLowerCase().includes(this.search.toLowerCase()) && hotel.price < this.value;
      })
    },
    filteredLabel() {
      return this.value * this.days
    }
  }
}
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
      width: 15px;
      -webkit-appearance: none;
      appearance: none;
      height: 15px;
      cursor: ew-resize;
      background: #FFF;
      box-shadow: -405px 0 0 400px #605E5C;
      border-radius: 50%;
    }
</style>
