<script setup>
import { ref } from 'vue';
import Apicard from '@/components/Apicard.vue';

// Datos de ejemplo para las APIs
const apis = ref([
  {
    id: 1,
    title: 'Movie Database API',
    description: 'Access comprehensive movie data including ratings, reviews, and cast information.',
    category: 'Movies',
    image: '/movieimg.png', // URL de la imagen
  },
  {
    id: 2,
    title: 'Stock Market Data API',
    description: 'Real-time stock market data and financial news for informed investment decisions.',
    category: 'Finance',
    image: '/apimarket.png', // URL de la imagen
  },
  {
    id: 3,
    title: 'Weather Forecast API',
    description: 'Get accurate weather forecasts and historical data for any location.',
    category: 'Weather',
    image: '/Apiweather.png', // URL de la imagen
  },
  {
    id: 4,
    title: 'Social Media Analytics API',
    description: 'Analyze social media trends, user engagement, and brand mentions.',
    category: 'Social Media',
    image: '/ApiSocialmedia.png', // URL de la imagen
  },
  {
    id: 5,
    title: 'E-commerce Product API',
    description: 'Manage product catalogs, inventory, and customer orders for your e-commerce platform.',
    category: 'E-commerce',
    image: '/ApiEcomerce.png', // URL de la imagen
  },
  {
    id: 6,
    title: 'Music Streaming API',
    description: 'Integrate music streaming services with millions of songs and playlists.',
    category: 'Music',
    image: '/ApiStreaming.png', // URL de la imagen
  },
  {
    id: 7,
    title: 'Travel Booking API',
    description: 'Book flights, hotels, and rental cars with ease using our travel API.',
    category: 'Travel',
    image: '/ApiTrave.png', // URL de la imagen
  },
  {
    id: 8,
    title: 'Food Delivery API',
    description: 'Connect to popular food delivery services and manage orders seamlessly.',
    category: 'Food',
    image: '/Apifood.png', // URL de la imagen
  },
  {
    id: 9,
    title: 'Gaming Platform API',
    description: 'Enhance your gaming platform with user profiles, leaderboards, and in-game purchases.',
    category: 'Gaming',
    image: '/Apigaming.png', // URL de la imagen
  },
  {
    id: 10,
    title: 'Fitness Tracking API',
    description: 'Track user fitness activities, health metrics, and workout routines.',
    category: 'Fitness',
    image: '/ApiFitness.png', // URL de la imagen
  },
  {
    id: 11,
    title: 'News Aggregator API',
    description: 'Stay up-to-date with the latest news from various sources and topics.',
    category: 'News',
    image: '/Apiagregator.png', // URL de la imagen
  },
  {
    id: 12,
    title: 'Language Translation API',
    description: 'Translate text between multiple languages with high accuracy and speed.',
    category: 'Tools',
    image: '/Apilenguage.png', // URL de la imagen
  },
]);

const categories = ref(['All Categories', 'Movies', 'Finance', 'Weather', 'Social Media']);
const selectedCategory = ref('All Categories');

const handleCategoryClick = (category) => {
  selectedCategory.value = category;
  //aquifiltraremos las apis por categoria
};
</script>

<template>
  <section class="container mx-auto p-6 md:p-8 lg:p-10">
    <h2 class="text-3xl font-satobold text-primary mb-4">Explore APIs</h2>
    <p class="font-sans text-tertiary mb-4">
      Discover and integrate powerful APIs to enhance your applications.
    </p>

    <div class=" flex items-center gap-2 mb-4 px-4 py-2 border rounded-md w-full bg-secondary border-none" > 
        <img src="/Lupita.svg" alt="">
         <input type="text" placeholder="Search APIs..." class = "bg-secondary w-full focus:outline-none " />
 

    </div>
   
    <div class="flex flex-wrap gap-4 mb-4">
      <button
        v-for="category in categories"
        :key="category"
        :class="[
          'px-3',
            'py-1',
          'rounded-md',
          'border-none',
          'bg-secondary',
          'hover:bg-gray-100',
          'focus:outline-none',
          'focus:ring-2',
          'focus:ring-primary',
          'flex',
          'items-center',
          'justify-center',
          'gap-3',
          { 'text-black': selectedCategory === category }
        ]"
        @click="handleCategoryClick(category)"
      >
        {{ category }}
        <img src="/flecha.svg" alt="Flecha" class="w-4 h-4" />
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3">
      <Apicard v-for="api in apis" :key="api.id" :api="api" />
    </div>

    <div class="flex justify-center mt-12 space-x-4">
      <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100">
        &lt;
      </button>
      <button class="px-4 py-2 border rounded-md bg-primary text-white hidden md:inline-block">1</button>
      <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 hidden md:inline-block">2</button>
      <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 hidden md:inline-block">3</button>
      <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 hidden md:inline-block">4</button>
      <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 hidden md:inline-block">5</button>
      <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100">
        &gt;
      </button>
    </div>
  </section>
</template>

<style scoped>
/* No se necesitan estilos adicionales si todo se maneja con Tailwind */
</style>