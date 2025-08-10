<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import Apicard from '@/components/Apicard.vue';

// Estado de la aplicación
const apis = ref([]);
const loading = ref(false);
const error = ref('');
const uniqueCategories = ref(['All Categories']);
const selectedCategory = ref('All Categories');
const showDropdown = ref(false);
const searchText = ref('');
const currentPage = ref(1);
const totalPages = ref(1);
const totalCount = ref(0);
const apisPerPage = 10;

// Función para obtener APIs del backend
const fetchApis = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: apisPerPage.toString()
    });

    if (selectedCategory.value !== 'All Categories') {
      params.append('category', selectedCategory.value);
    }

    if (searchText.value.trim()) {
      params.append('search', searchText.value.trim());
    }

    const response = await fetch(`/apis-model/getall?${params}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al obtener las APIs');
    }

    // Transformar los datos para que coincidan con el formato esperado del frontend
    apis.value = data.apis.map(api => ({
      id: api.id,
      title: api.name,
      description: api.description,
      category: api.category,
      image: api.preview ? `/images/${api.preview}` : '/movieimg.png', // Imagen por defecto
      endpoint: api.endpoint,
      json: api.json
    }));

    totalPages.value = data.pagination.totalPages;
    totalCount.value = data.pagination.totalCount;

    // Actualizar categorías únicas
    await fetchCategories();

  } catch (err) {
    error.value = err.message;
    console.error('Error al obtener APIs:', err);
  } finally {
    loading.value = false;
  }
};

// Función para obtener categorías únicas
const fetchCategories = async () => {
  try {
    const response = await fetch('/apis-model/getall?limit=1000'); // Obtener todas para extraer categorías
    const data = await response.json();
    
    if (response.ok) {
      const categories = [...new Set(data.apis.map(api => api.category))];
      uniqueCategories.value = ['All Categories', ...categories];
    }
  } catch (err) {
    console.error('Error al obtener categorías:', err);
  }
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Resetear a la página 1 cuando cambian los filtros
watch([searchText, selectedCategory], () => {
  currentPage.value = 1;
  fetchApis();
});

// Obtener APIs cuando cambia la página
watch(currentPage, () => {
  fetchApis();
});

const handleCategorySelect = (category) => {
  selectedCategory.value = category;
  showDropdown.value = false;
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchApis();
});
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

    <!-- Estado de carga -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <span class="ml-3 text-gray-600">Cargando APIs...</span>
    </div>

    <!-- Estado de error -->
    <div v-else-if="error" class="text-center py-12">
      <div class="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
        <p class="text-red-600">{{ error }}</p>
      </div>
      <button 
        @click="fetchApis" 
        class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
      >
        Reintentar
      </button>
    </div>

    <!-- APIs -->
    <div v-else-if="apis.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-3">
      <Apicard v-for="api in apis" :key="api.id" :api="api" />
    </div>

    <!-- Sin resultados -->
    <div v-else class="text-center py-12">
      <p class="text-gray-600 text-lg mb-4">No se encontraron APIs</p>
      <p class="text-gray-500">Intenta con otros filtros de búsqueda</p>
    </div>

    <!-- Paginación -->
    <div v-if="!loading && !error && totalPages > 1" class="flex justify-center mt-12 space-x-4">
      <button 
        class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" 
        :disabled="currentPage === 1" 
        @click="goToPage(currentPage - 1)"
      >
        &lt;
      </button>
      <button
        v-for="page in Math.min(totalPages, 10)"
        :key="page"
        class="px-4 py-2 border rounded-md"
        :class="{ 'bg-primary text-white': currentPage === page, 'text-gray-600 hover:bg-gray-100': currentPage !== page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button 
        class="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed" 
        :disabled="currentPage === totalPages" 
        @click="goToPage(currentPage + 1)"
      >
        &gt;
      </button>
    </div>

    <!-- Información de resultados -->
    <div v-if="!loading && !error && apis.length > 0" class="text-center mt-4 text-gray-600">
      Mostrando {{ (currentPage - 1) * apisPerPage + 1 }} - {{ Math.min(currentPage * apisPerPage, totalCount) }} de {{ totalCount }} APIs
    </div>
  </section>
</template>

<style scoped>
/* No se necesitan estilos adicionales si todo se maneja con Tailwind */
</style>