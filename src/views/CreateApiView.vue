<template>
  <div class="min-h-screen ">
    <Header />
    
    <main class="container mx-auto px-4 py-8 max-w-4xl">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Create API</h1>
      
      <div class="bg-white rounded-lg ">
        <form @submit.prevent="submitForm">
          <div class="mb-6">
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Name</label>
              <input 
                type="text" 
                v-model="apiData.name"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-red-500': errors.name }"
              >
              <p v-if="errors.name" class="text-red-500 text-sm mt-1">Error</p>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Description</label>
              <textarea 
                v-model="apiData.description"
                rows="3"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Category</label>
              <select 
                v-model="apiData.category"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a category</option>
                <option value="weather">Weather</option>
                <option value="ecommerce">E-commerce</option>
                <option value="social">Social Media</option>
                <option value="movies">Movies</option>
              </select>
            </div>
          </div>

          <div class="mb-6 border-t pt-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">URLs</h2>
            
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Basic URL</label>
              <input 
                type="text" 
                v-model="apiData.basicUrl"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-red-500': errors.basicUrl }"
              >
              <p v-if="errors.basicUrl" class="text-red-500 text-sm mt-1">Error</p>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Next URL</label>
              <input 
                type="text" 
                v-model="apiData.nextUrl"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
            </div>
          </div>

          <div class="mb-6 border-t pt-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-800">Endpoints</h2>
              <button 
                type="button" 
                @click="addEndpoint"
                class="text-primary hover:text-blue-700 font-medium"
              >
                Add request
              </button>
            </div>
            
            <div v-for="(endpoint, index) in apiData.endpoints" :key="index" class="mb-4 p-4 border rounded-md">
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-medium">Endpoint {{ index + 1 }}</h3>
                <button 
                  type="button" 
                  @click="removeEndpoint(index)"
                  class="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <input 
                type="text" 
                v-model="endpoint.url"
                placeholder="Endpoint URL"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
                :class="{ 'border-red-500': endpointErrors[index]?.url }"
              >
              <p v-if="endpointErrors[index]?.url" class="text-red-500 text-sm mt-1">Error</p>
            </div>
          </div>

          <div class="mb-6 border-t pt-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Authentication</h2>
            
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">API Key</label>
              <select 
                v-model="apiData.authType"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="none">None</option>
                <option value="api_key">API Key</option>
                <option value="oauth">OAuth</option>
              </select>
            </div>
            
            <div v-if="apiData.authType === 'api_key'" class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Status</label>
              <select 
                v-model="apiData.apiKeyStatus"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="none">None</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div class="mb-6 border-t pt-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">JSON Schema</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-gray-700 font-medium mb-2">Request Schema</label>
                <textarea 
                  v-model="apiData.requestSchema"
                  rows="5"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              
            </div>
          </div>

          <div class="mb-6 border-t pt-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Visual Preview</h2>
            
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Upload Visual Preview</label>
              <input 
                type="file" 
                @change="handleFileUpload"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
              <p class="text-gray-500 text-sm mt-2">Change of type or browser should not be reproduced except for the original logging</p>
            </div>
          </div>

          <div class="flex justify-end border-t pt-6">
            <button
              type="submit"
              class="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors duration-200"
            >
              Create API
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import Header from '../components/header.vue';
import { ref } from 'vue';

const apiData = ref({
  name: '',
  description: '',
  category: '',
  basicUrl: '',
  nextUrl: '',
  endpoints: [{ url: '' }],
  authType: 'none',
  apiKeyStatus: 'none',
  requestSchema: '',
  responseSchema: '',
  visualPreview: null
});

const errors = ref({
  name: false,
  basicUrl: false
});

const endpointErrors = ref([]);

const addEndpoint = () => {
  apiData.value.endpoints.push({ url: '' });
  endpointErrors.value.push({ url: false });
};

const removeEndpoint = (index) => {
  apiData.value.endpoints.splice(index, 1);
  endpointErrors.value.splice(index, 1);
};

const handleFileUpload = (event) => {
  apiData.value.visualPreview = event.target.files[0];
};

const submitForm = () => {
  // Validación simple
  errors.value.name = apiData.value.name.trim() === '';
  errors.value.basicUrl = apiData.value.basicUrl.trim() === '';
  
  // Validación endpoints
  endpointErrors.value = apiData.value.endpoints.map(endpoint => ({
    url: endpoint.url.trim() === ''
  }));
  
  // Si no hay errores, enviar el formulario
  if (!errors.value.name && !errors.value.basicUrl && 
      !endpointErrors.value.some(e => e.url)) {
    console.log('API Data:', apiData.value);
    // Aquí iría la lógica para enviar los datos al servidor
    alert('API created successfully!');
  }
};
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>