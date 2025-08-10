<script setup>
import Header from '@/components/Header.vue';
import DetailsApi from '@/components/DetailsApi.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const apiName = route.params.apiName;

const api = ref(null);
const loading = ref(true);
const error = ref('');

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // reemplaza los espacios por guiones
    .replace(/[^\w\-]+/g, '')       // elimina todos los caracteres que no sean letras, números o guiones
    .replace(/\-\-+/g, '-')         // reemplaza múltiples guiones por uno solo
    .replace(/^-+/, '')             // Elimina los guiones al principio del texto
    .replace(/-+$/, '');            // Elimina los guiones al final del texto
};

const fetchApiByName = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    // Intentar obtener por nombre usando el slug
    const response = await fetch(`/apis-model/getbyname/${encodeURIComponent(apiName)}`);
    
    if (response.ok) {
      const data = await response.json();
      api.value = {
        id: data.id,
        title: data.name,
        description: data.description,
        category: data.category,
        image: data.preview ? `/images/${data.preview}` : '/movieimg.png',
        endpoint: data.endpoint,
        json: data.json
      };
    } else {
      // Si no se encuentra por nombre, buscar en todas las APIs
      const allResponse = await fetch('/apis-model/getall?limit=1000');
      if (allResponse.ok) {
        const allData = await allResponse.json();
        const foundApi = allData.apis.find(a => slugify(a.name) === apiName);
        
        if (foundApi) {
          api.value = {
            id: foundApi.id,
            title: foundApi.name,
            description: foundApi.description,
            category: foundApi.category,
            image: foundApi.preview ? `/images/${foundApi.preview}` : '/movieimg.png',
            endpoint: foundApi.endpoint,
            json: foundApi.json
          };
        } else {
          error.value = 'API no encontrada';
        }
      } else {
        throw new Error('Error al obtener las APIs');
      }
    }
  } catch (err) {
    error.value = err.message || 'Error al cargar la API';
    console.error('Error al obtener API:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchApiByName();
});
</script>

<template>
  <div class="min-h-screen">
    <Header />
    <main>
      <!-- Estado de carga -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span class="ml-3 text-gray-600">Cargando información de la API...</span>
      </div>

      <!-- Estado de error -->
      <div v-else-if="error" class="container mx-auto p-4 text-center">
        <div class="bg-red-50 border border-red-200 rounded-md p-6 mb-4">
          <h2 class="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p class="text-red-600">{{ error }}</p>
        </div>
        <button 
          @click="fetchApiByName" 
          class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark mr-4"
        >
          Reintentar
        </button>
        <button 
          @click="router.push('/apis')" 
          class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Volver a APIs
        </button>
      </div>

      <!-- API encontrada -->
      <div v-else-if="api">
        <DetailsApi :api="api" />
      </div>

      <!-- API no encontrada -->
      <div v-else class="container mx-auto p-4 text-center">
        <div class="bg-yellow-50 border border-yellow-200 rounded-md p-6 mb-4">
          <h2 class="text-xl font-bold text-yellow-600 mb-2">API no encontrada</h2>
          <p class="text-yellow-600">La API que buscas no existe o ha sido eliminada.</p>
        </div>
        <button 
          @click="router.push('/apis')" 
          class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Ver todas las APIs
        </button>
      </div>
    </main>
  </div>
</template>