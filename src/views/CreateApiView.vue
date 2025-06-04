<script setup>
  import Header from '../components/header.vue';
  import { ref } from 'vue';

  const apiData = ref({
    name: '',
    description: '',
    category: '',
    endpoint: '',
    json: '',
    preview: ''
  });

  const errors = ref({
    name: false,
    description: false,
    category: false,
    endpoint: false,
    json: false,
    preview: false
  });

  const submitForm = async () => {

    const formData = new FormData();
    formData.append('name', apiData.value.name);
    formData.append('description', apiData.value.description);
    formData.append('category', apiData.value.category);
    formData.append('endpoint', apiData.value.endpoint);
    formData.append('json', apiData.value.json);
    if (apiData.value.previewFile) {
      formData.append('preview', apiData.value.previewFile);
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/apis-model/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // No pongas 'Content-Type', fetch lo pone solo para FormData
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Error al registrar la API');
        return;
      }
      alert('API creada exitosamente!');
      apiData.value = {
        name: '',
        description: '',
        category: '',
        endpoint: '',
        json: '',
        preview: '',
        previewFile: null
      };
    } catch (e) {
      console.error('Error al crear la API:', e);
    }
  };

  // Cambia tu handleFileUpload:
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('El archivo debe ser una imagen.');
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen no debe superar los 2MB.');
        return;
      }
      apiData.value.preview = file.name;
      apiData.value.previewFile = file;
    }
  };
</script>

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
                name="name"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-red-500': errors.name }"
              >
              <p v-if="errors.name" class="text-red-500 text-sm mt-1">El nombre es requerido</p>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Description</label>
              <textarea 
                v-model="apiData.description"
                rows="3"
                name="description"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-red-500': errors.description }"
              ></textarea>
              <p v-if="errors.description" class="text-red-500 text-sm mt-1">La descripción es requerida</p>
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Category</label>
              <select 
                v-model="apiData.category"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-red-500': errors.category }"
                name="category"
              >
                <option value="">Select a category</option>
                <option value="weather">Weather</option>
                <option value="ecommerce">E-commerce</option>
                <option value="social">Social Media</option>
                <option value="movies">Movies</option>
              </select>
              <p v-if="errors.category" class="text-red-500 text-sm mt-1">La categoría es requerida</p>
            </div>
          </div>

          <div class="mb-6 border-t pt-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-semibold text-gray-800">Endpoint</h2>
            </div>
            <input 
              type="text" 
              name="endpoint"
              v-model="apiData.endpoint"
              placeholder="Endpoint URL"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary mb-2"
              :class="{ 'border-red-500': errors.endpoint }"
            >
            <p v-if="errors.endpoint" class="text-red-500 text-sm mt-1">El endpoint es requerido</p>
          </div>

          <div class="mb-6 border-t pt-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">JSON Schema</h2>
            <div>
              <label class="block text-gray-700 font-medium mb-2">JSON</label>
              <textarea 
                name="json"
                v-model="apiData.json"
                rows="5"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                :class="{ 'border-red-500': errors.json }"
              ></textarea>
              <p v-if="errors.json" class="text-red-500 text-sm mt-1">El JSON es requerido</p>
            </div>
          </div>

          <div class="mb-6 border-t pt-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Visual Preview</h2>
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-2">Upload Visual Preview</label>
              <input 
                name="preview"
                type="file" 
                @change="handleFileUpload"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
              <p v-if="errors.preview" class="text-red-500 text-sm mt-1">El preview es requerido</p>
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