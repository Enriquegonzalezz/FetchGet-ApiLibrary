<script setup>
  import Header from '../components/header.vue';
  import { ref } from 'vue';

  const fileInputRef = ref(null);

  const apiData = ref({
    name: '',
    description: '',
    category: '',
    endpoint: '',
    json: '',
    preview: '',
    previewFile: null
  });

  const errors = ref({
    name: false,
    description: false,
    category: false,
    endpoint: false,
    json: false,
    preview: false
  });

  const error = ref('');
  const success = ref('');

  const submitForm = async () => {
    error.value = '';
    success.value = '';

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
        },
        body: formData
      });
      const data = await res.json();
      if (!res.ok) {
        error.value = data.error || 'Error al registrar la API';
        return;
      }
      success.value = '¡API creada exitosamente!';
      apiData.value = {
        name: '',
        description: '',
        category: '',
        endpoint: '',
        json: '',
        preview: '',
        previewFile: null
      };
      // Limpiar el input de archivo
      if (fileInputRef.value) {
        fileInputRef.value.value = '';
      }
    } catch (e) {
      error.value = 'Error al crear la API: ' + (e.message || e);
      console.error('Error al crear la API:', e);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        error.value = 'El archivo debe ser una imagen.';
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        error.value = 'La imagen no debe superar los 2MB.';
        return;
      }
      apiData.value.preview = file.name;
      apiData.value.previewFile = file;
      error.value = '';
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
                <option value="Weather">Weather</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Social Media">Social Media</option>
                <option value="Movies">Movies</option>
                <option value="Finance">Finance</option>
                <option value="Music">Music</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Gaming">Gaming</option>
                <option value="Fitness">Fitness</option>
                <option value="News">News</option>
                <option value="Tools">Tools</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Sports">Sports</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Real Estate">Real Estate</option>
                <option value="Automotive">Automotive</option>
                <option value="Fashion">Fashion</option>
                <option value="Beauty">Beauty</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Pets">Pets</option>
                <option value="Books">Books</option>
                <option value="Art">Art</option>
                <option value="Photography">Photography</option>
                <option value="Events">Events</option>
                <option value="Government">Government</option>
                <option value="Non-Profit">Non-Profit</option>
                <option value="Other">Other</option>
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
                ref="fileInputRef"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
              <p v-if="errors.preview" class="text-red-500 text-sm mt-1">El preview es requerido</p>
            </div>
          </div>

          <div v-if="error" class="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">
            {{ error }}
          </div>
          <div v-if="success" class="bg-green-100 text-green-700 p-2 rounded mb-2 text-center">
            {{ success }}
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