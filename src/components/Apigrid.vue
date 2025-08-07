<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import Apicard from '@/components/Apicard.vue';

// Datos de ejemplo para las APIs
const apis = ref([]);

// Obtener APIs reales del backend al montar el componente
onMounted(async () => {
  try {
    console.log('Intentando obtener APIs del backend...');
    const response = await axios.get('http://localhost:3000/apis-model/apis');
    console.log('Respuesta del backend:', response.data);
    // Adaptar los campos si es necesario
    apis.value = response.data.map(api => ({
      id: api.id,
      title: api.name, // en la BD es 'name', en el front es 'title'
      description: api.description,
      category: api.category,
      image: api.preview ? `/images/${api.preview}` : '/movieimg.png', // Ajusta la ruta según tu backend
      // otros campos si los necesitas
    }));
    console.log('APIs procesadas:', apis.value);
  } catch (error) {
    console.error('Error al obtener las APIs:', error);
    console.error('Detalles del error:', error.response?.data || error.message);
  }
});

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