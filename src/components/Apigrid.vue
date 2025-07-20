<script setup>
import { ref, computed, watch } from 'vue';
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

// Obtener categorías únicas de las APIs
const uniqueCategories = computed(() => {
  const cats = apis.value.map(api => api.category);
  return ['All Categories', ...Array.from(new Set(cats))];
});
const selectedCategory = ref('All Categories');
const showDropdown = ref(false);

const searchText = ref('');

const filteredApis = computed(() => {
  return apis.value.filter(api => {
    const matchesSearch = api.title.toLowerCase().includes(searchText.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'All Categories' || api.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const apisPerPage = 10;
const currentPage = ref(1);

const totalPages = computed(() => {
  return Math.ceil(filteredApis.value.length / apisPerPage);
});

const paginatedApis = computed(() => {
  const start = (currentPage.value - 1) * apisPerPage;
  const end = start + apisPerPage;
  return filteredApis.value.slice(start, end);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Resetear a la página 1 cuando cambian los filtros
watch([searchText, selectedCategory], () => {
  currentPage.value = 1;
});

const handleCategorySelect = (category) => {
  selectedCategory.value = category;
  showDropdown.value = false;
};
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
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
         <input type="text" placeholder="Search APIs..." class = "bg-secondary w-full focus:outline-none " v-model="searchText" />
 

    </div>

    <div class="relative mb-4 w-60">
      <button
        class="px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-between w-full focus:outline-none focus:ring-2 focus:ring-primary"
        @click="toggleDropdown"
      >
        {{ selectedCategory }}
        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div v-if="showDropdown" class="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg"
        style="max-height: 220px; overflow-y: auto;"
      >
        <ul>
          <li v-for="category in uniqueCategories" :key="category">
            <button
              class="w-full text-left px-4 py-2 hover:bg-gray-100 focus:outline-none"
              :class="{ 'font-bold text-primary': selectedCategory === category }"
              @click="handleCategorySelect(category)"
            >
              {{ category }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3">
      <Apicard v-for="api in paginatedApis" :key="api.id" :api="api" />
    </div>

    <div class="flex justify-center mt-12 space-x-4">
      <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
        &lt;
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        class="px-4 py-2 border rounded-md"
        :class="{ 'bg-primary text-white': currentPage === page, 'text-gray-600 hover:bg-gray-100': currentPage !== page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
        &gt;
      </button>
    </div>
  </section>
</template>

<style scoped>
/* No se necesitan estilos adicionales si todo se maneja con Tailwind */
</style>