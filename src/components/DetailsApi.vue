<script setup>
import { defineProps, ref, onMounted } from 'vue';
import axios from 'axios';

/*import MoviePreview from './previews/MoviePreview.vue';
import StockMarketPreview from './previews/StockMarketPreview.vue';
import WeatherPreview from './previews/WeatherPreview.vue';
import SocialMediaPreview from './previews/SocialMediaPreview.vue';
import EcommercePreview from './previews/EcommercePreview.vue';
import MusicPreview from './previews/MusicPreview.vue';
import TravelPreview from './previews/TravelPreview.vue';
import FoodPreview from './previews/FoodPreview.vue';
import GamingPreview from './previews/GamingPreview.vue';
import FitnessPreview from './previews/FitnessPreview.vue';
import NewsPreview from './previews/NewsPreview.vue';
import LanguagePreview from './previews/LanguagePreview.vue';*/

const props = defineProps({
  api: {
    type: Object,
    required: false,
    default: () => ({})
  }
});

const apiResponse = ref(null);

onMounted(async () => {
  if (props.api && props.api.endpoint) {
    try {
      const res = await axios.get(props.api.endpoint);
      apiResponse.value = res.data;
    } catch (e) {
      apiResponse.value = { error: 'No se pudo obtener la respuesta del endpoint.' };
    }
  }
});

/*const previewComponent = computed(() => {
  if (!props.api) return null;
  switch (props.api.title) {
    case 'Movie Database API': return MoviePreview;
    case 'Stock Market Data API': return StockMarketPreview;
    case 'Weather Forecast API': return WeatherPreview;
    case 'Social Media Analytics API': return SocialMediaPreview;
    case 'E-commerce Product API': return EcommercePreview;
    case 'Music Streaming API': return MusicPreview;
    case 'Travel Booking API': return TravelPreview;
    case 'Food Delivery API': return FoodPreview;
    case 'Gaming Platform API': return GamingPreview;
    case 'Fitness Tracking API': return FitnessPreview;
    case 'News Aggregator API': return NewsPreview;
    case 'Language Translation API': return LanguagePreview;
    default: return null;
  }
});*/

</script>


<template>
  <div v-if="props.api" class="container mx-auto p-4">
    <h1 class="text-3xl font-bold my-4">{{ props.api.title || 'Movie Database API' }}</h1>

    <h2 class="text-xl font-semibold mt-6 mb-2">Endpoint URL</h2>
    <div class="bg-white border-2 p-4 rounded-md mb-6 w-5/12 flex items-center justify-between">
      <p class="text-blue-500 w-fit flex items-center">{{ props.api.endpoint || 'https://api.example.com/movies/{movie_id}' }}</p>
      <img class="cursor-pointer" src="/copyapi.svg" alt="">
    </div>

    <h2 class="text-xl font-semibold mt-6 mb-2">API Documentation</h2>
    <p class="text-primary">
      {{ props.api.description }}
    </p>

    <h2 class="text-xl font-semibold mt-6 mb-2 w-3/4">Live JSON Response Example</h2>
    <pre contenteditable="true" class="bg-slate-100 border-2 rounded-lg p-4 overflow-x-auto text-sm font-satobold w-3/4 transition-all duration-500 animate-fade-in">
      <code>
        {{ apiResponse ? JSON.stringify(apiResponse, null, 2) : 'Cargando respuesta de la API...' }}
      </code>
    </pre>

    <h2 class="text-xl font-semibold mt-6 mb-2">Preview of API</h2>
  </div>

  <div v-else class="container mx-auto p-4 text-center text-gray-500">
    <p>Cargando información de la API...</p>
  </div>
</template>