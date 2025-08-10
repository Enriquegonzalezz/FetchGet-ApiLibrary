<script setup>
import { defineProps, ref, onMounted, computed } from 'vue';
import axios from 'axios';

const props = defineProps({
  api: {
    type: Object,
    required: false,
    default: () => ({})
  }
});

const apiResponse = ref(null);
const loadingResponse = ref(false);

// Función para copiar al portapapeles
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // Aquí podrías agregar una notificación de éxito
    console.log('Copiado al portapapeles');
  } catch (err) {
    console.error('Error al copiar:', err);
  }
};

// Parsear JSON de manera segura
const parsedJsonExample = computed(() => {
  if (!props.api || !props.api.json) return null;
  try {
    return typeof props.api.json === 'string' 
      ? JSON.parse(props.api.json) 
      : props.api.json;
  } catch (e) {
    return props.api.json; // Si no se puede parsear, mostrar como string
  }
});

onMounted(async () => {
  if (props.api && props.api.endpoint) {
    loadingResponse.value = true;
    try {
      const res = await axios.get(props.api.endpoint);
      apiResponse.value = res.data;
    } catch (e) {
      apiResponse.value = { error: 'No se pudo obtener la respuesta del endpoint.' };
    } finally {
      loadingResponse.value = false;
    }
  }
});
</script>


<template>
  <div v-if="props.api" class="container mx-auto p-4">
    <!-- Header con imagen y título -->
    <div class="flex flex-col lg:flex-row gap-6 mb-8">
      <div class="flex-shrink-0">
        <img 
          :src="props.api.image || '/movieimg.png'" 
          :alt="props.api.title"
          class="w-32 h-32 lg:w-48 lg:h-48 object-cover rounded-lg shadow-lg"
          @error="$event.target.src = '/movieimg.png'"
        />
      </div>
      <div class="flex-grow">
        <h1 class="text-3xl lg:text-4xl font-bold mb-3">{{ props.api.title }}</h1>
        <div class="flex items-center gap-4 mb-4">
          <span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {{ props.api.category }}
          </span>
          <span class="text-gray-600 text-sm">ID: {{ props.api.id }}</span>
        </div>
        <p class="text-gray-700 text-lg leading-relaxed">
          {{ props.api.description }}
        </p>
      </div>
    </div>

    <!-- Endpoint URL -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-3 flex items-center">
        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm mr-2">GET</span>
        Endpoint URL
      </h2>
      <div class="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 flex items-center justify-between">
        <code class="text-blue-600 font-mono text-sm flex-grow break-all">
          {{ props.api.endpoint || 'https://api.example.com/endpoint' }}
        </code>
        <button 
          @click="copyToClipboard(props.api.endpoint)"
          class="ml-4 p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
          title="Copiar al portapapeles"
        >
          <img src="/copyapi.svg" alt="Copiar" class="w-5 h-5">
        </button>
      </div>
    </div>

    <!-- Documentación -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-3">📖 Documentación de la API</h2>
      <div class="bg-white border-2 border-gray-200 rounded-lg p-6">
        <p class="text-gray-700 leading-relaxed">
          {{ props.api.description }}
        </p>
      </div>
    </div>

    <!-- Ejemplo de respuesta JSON desde la base de datos -->
    <div class="mb-8" v-if="parsedJsonExample">
      <h2 class="text-xl font-semibold mb-3">📝 Ejemplo de Respuesta JSON</h2>
      <div class="bg-gray-900 border-2 border-gray-300 rounded-lg p-4 overflow-x-auto">
        <pre class="text-green-400 font-mono text-sm"><code>{{ JSON.stringify(parsedJsonExample, null, 2) }}</code></pre>
      </div>
    </div>

    <!-- Respuesta en vivo del endpoint -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-3">🔴 Respuesta en Vivo del Endpoint</h2>
      <div class="bg-gray-900 border-2 border-gray-300 rounded-lg p-4 overflow-x-auto">
        <div v-if="loadingResponse" class="flex items-center text-yellow-400">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-400 mr-2"></div>
          Cargando respuesta de la API...
        </div>
        <pre v-else class="text-green-400 font-mono text-sm"><code>{{ apiResponse ? JSON.stringify(apiResponse, null, 2) : 'No se pudo obtener respuesta del endpoint' }}</code></pre>
      </div>
    </div>

    <!-- Preview de la API -->
    <div class="mb-8">
      <h2 class="text-xl font-semibold mb-3">👁️ Preview de la API</h2>
      <div class="bg-white border-2 border-gray-200 rounded-lg p-6">
        <div class="flex items-center justify-center">
          <img 
            :src="props.api.image || '/movieimg.png'" 
            :alt="props.api.title"
            class="max-w-full h-auto rounded-lg shadow-md"
            @error="$event.target.src = '/movieimg.png'"
          />
        </div>
      </div>
    </div>

    <!-- Información adicional -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 class="font-semibold text-blue-800 mb-2">🔧 Información Técnica</h3>
        <ul class="text-sm text-blue-700 space-y-1">
          <li><strong>ID:</strong> {{ props.api.id }}</li>
          <li><strong>Categoría:</strong> {{ props.api.category }}</li>
          <li><strong>Método:</strong> GET</li>
          <li><strong>Formato:</strong> JSON</li>
        </ul>
      </div>
      
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 class="font-semibold text-green-800 mb-2">🚀 Cómo usar esta API</h3>
        <ol class="text-sm text-green-700 space-y-1">
          <li>1. Copia la URL del endpoint</li>
          <li>2. Realiza una petición GET</li>
          <li>3. Procesa la respuesta JSON</li>
          <li>4. Integra en tu aplicación</li>
        </ol>
      </div>
    </div>
  </div>

  <div v-else class="container mx-auto p-4 text-center text-gray-500">
    <div class="animate-pulse">
      <p>Cargando información de la API...</p>
    </div>
  </div>
</template>