<script setup>
import Header from '@/components/Header.vue';
import DetailsApi from '@/components/DetailsApi.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const apiName = route.params.apiName;

const api = ref(null);


const apis = ref([
  {
    id: 1,
    title: 'Movie Database API',
    description: 'Access comprehensive movie data including ratings, reviews, and cast information.',
    category: 'Movies',
    image: '/movieimg.png',
    endpoint: 'https://example.com/movies',
    response: { movies: [{ title: 'Movie 1' }, { title: 'Movie 2' }] }
  },
  {
    id: 2,
    title: 'Stock Market Data API',
    description: 'Real-time stock market data and financial news for informed investment decisions.',
    category: 'Finance',
    image: '/apimarket.png',
    endpoint: 'https://example.com/stocks',
    response: { stocks: [{ symbol: 'AAPL', price: 150 }, { symbol: 'GOOG', price: 2500 }] }
  },
  {
    id: 3,
    title: 'Weather Forecast API',
    description: 'Get accurate weather forecasts and historical data for any location.',
    category: 'Weather',
    image: '/Apiweather.png',
    endpoint: 'https://example.com/weather',
    response: { weather: { city: 'London', temp: 18, condition: 'Cloudy' } }
  },
  {
    id: 4,
    title: 'Social Media Analytics API',
    description: 'Analyze social media trends, user engagement, and brand mentions.',
    category: 'Social Media',
    image: '/ApiSocialmedia.png',
    endpoint: 'https://example.com/socialmedia',
    response: { analytics: { followers: 1200, likes: 340, shares: 56 } }
  },
  {
    id: 5,
    title: 'E-commerce Product API',
    description: 'Manage product catalogs, inventory, and customer orders for your e-commerce platform.',
    category: 'E-commerce',
    image: '/ApiEcomerce.png',
    endpoint: 'https://example.com/ecommerce',
    response: { products: [{ name: 'T-shirt', price: 20 }, { name: 'Shoes', price: 50 }] }
  },
  {
    id: 6,
    title: 'Music Streaming API',
    description: 'Integrate music streaming services with millions of songs and playlists.',
    category: 'Music',
    image: '/ApiStreaming.png',
    endpoint: 'https://example.com/music',
    response: { songs: [{ title: 'Song 1', artist: 'Artist A' }, { title: 'Song 2', artist: 'Artist B' }] }
  },
  {
    id: 7,
    title: 'Travel Booking API',
    description: 'Book flights, hotels, and rental cars with ease using our travel API.',
    category: 'Travel',
    image: '/ApiTrave.png',
    endpoint: 'https://example.com/travel',
    response: { bookings: [{ type: 'flight', status: 'confirmed' }, { type: 'hotel', status: 'pending' }] }
  },
  {
    id: 8,
    title: 'Food Delivery API',
    description: 'Connect to popular food delivery services and manage orders seamlessly.',
    category: 'Food',
    image: '/Apifood.png',
    endpoint: 'https://example.com/food',
    response: { orders: [{ restaurant: 'Pizza Place', status: 'delivered' }] }
  },
  {
    id: 9,
    title: 'Gaming Platform API',
    description: 'Enhance your gaming platform with user profiles, leaderboards, and in-game purchases.',
    category: 'Gaming',
    image: '/Apigaming.png',
    endpoint: 'https://example.com/gaming',
    response: { leaderboard: [{ user: 'Player1', score: 1000 }] }
  },
  {
    id: 10,
    title: 'Fitness Tracking API',
    description: 'Track user fitness activities, health metrics, and workout routines.',
    category: 'Fitness',
    image: '/ApiFitness.png',
    endpoint: 'https://example.com/fitness',
    response: { activities: [{ type: 'run', distance: 5 }, { type: 'bike', distance: 20 }] }
  },
  {
    id: 11,
    title: 'News Aggregator API',
    description: 'Stay up-to-date with the latest news from various sources and topics.',
    category: 'News',
    image: '/Apiagregator.png',
    endpoint: 'https://example.com/news',
    response: { news: [{ headline: 'Breaking News', date: '2024-01-01' }] }
  },
  {
    id: 12,
    title: 'Language Translation API',
    description: 'Translate text between multiple languages with high accuracy and speed.',
    category: 'Tools',
    image: '/Apilenguage.png',
    endpoint: 'https://example.com/translate',
    response: { translation: { from: 'en', to: 'es', text: 'Hola Mundo' } }
  }
]);
const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // reemplaza los espacios por guiones
    .replace(/[^\w\-]+/g, '')       // elimina todos los caracteres que no sean letras, números o guiones
    .replace(/\-\-+/g, '-')         // reemplaza múltiples guiones por uno solo
    .replace(/^-+/, '')             // Elimina los guiones al principio del texto
    .replace(/-+$/, '');            // Elimina los guiones al final del texto
};

onMounted(() => {
  api.value = apis.value.find(api => slugify(api.title) === apiName);
});
</script>

<template>
  <div class="min-h-screen ">
    <Header />
    <main >
      <DetailsApi :api="api" />
      <div v-if="!api" class="text-center text-red-500 mt-8">API no encontrada.</div>
    </main>
  </div>
</template>