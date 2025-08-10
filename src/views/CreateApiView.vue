<script setup>
  import Header from '../components/header.vue';
  import { ref } from 'vue';

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
                <option value="">Selecciona una categoría</option>
                <option value="análisis-texto">Análisis de texto</option>
                <option value="anuncios">Anuncios</option>
                <option value="arte">Arte</option>
                <option value="autenticación">Autenticación</option>
                <option value="automóviles">Automóviles</option>
                <option value="bancos">Bancos</option>
                <option value="bibliotecas">Bibliotecas</option>
                <option value="blockchain">Blockchain</option>
                <option value="calendario">Calendario</option>
                <option value="ciencia">Ciencia</option>
                <option value="clima">Clima</option>
                <option value="comercio">Comercio</option>
                <option value="comida">Comida y recetas</option>
                <option value="correo">Correo electrónico</option>
                <option value="criptomonedas">Criptomonedas</option>
                <option value="datos-abiertos">Datos abiertos</option>
                <option value="deportes">Deportes</option>
                <option value="desarrolladores">Herramientas para desarrolladores</option>
                <option value="directorio">Directorio</option>
                <option value="educación">Educación</option>
                <option value="empleos">Empleos</option>
                <option value="energía">Energía</option>
                <option value="entretenimiento">Entretenimiento</option>
                <option value="envío-mensajes">Envío de mensajes</option>
                <option value="eventos">Eventos</option>
                <option value="finanzas">Finanzas</option>
                <option value="fotografía">Fotografía</option>
                <option value="gobierno">Gobierno</option>
                <option value="hardware">Hardware</option>
                <option value="historial-clima">Clima histórico</option>
                <option value="hogar">Hogar inteligente</option>
                <option value="hosting">Hosting</option>
                <option value="imagen">Procesamiento de imágenes</option>
                <option value="inmobiliaria">Bienes raíces</option>
                <option value="internet-cosas">Internet de las cosas (IoT)</option>
                <option value="juegos">Juegos</option>
                <option value="libros">Libros</option>
                <option value="mapas">Mapas y geolocalización</option>
                <option value="marketing-afiliados">Afiliados</option>
                <option value="medicina">Medicina y salud</option>
                <option value="mensajería">Mensajería</option>
                <option value="múltiple">Múltiple</option>
                <option value="música">Música</option>
                <option value="noticias">Noticias</option>
                <option value="pagos">Pagos</option>
                <option value="podcasts">Podcasts</option>
                <option value="publicidad">Publicidad</option>
                <option value="realidad-virtual">Realidad virtual</option>
                <option value="reseñas">Reseñas</option>
                <option value="seguros">Seguros</option>
                <option value="seguridad">Seguridad</option>
                <option value="servicios-nube">Servicios en la nube</option>
                <option value="shopping">Compras</option>
                <option value="sms">SMS</option>
                <option value="social">Redes sociales</option>
                <option value="soporte">Soporte técnico</option>
                <option value="stocks">Acciones</option>
                <option value="tecnología">Tecnología</option>
                <option value="telefonía">Telefonía</option>
                <option value="traducción">Traducción</option>
                <option value="transporte">Transporte</option>
                <option value="turismo">Turismo y viajes</option>
                <option value="utilidades">Utilidades</option>
                <option value="video">Video</option>
                <option value="vigilancia">Vigilancia</option>
                <option value="voz">Voz</option>
                <option value="weather-alerts">Alertas meteorológicas</option>
                <option value="weather-forecast">Pronóstico del clima</option>
                <option value="weather-marine">Clima marino</option>
                <option value="weather-radar">Radar meteorológico</option>
                <option value="weather-satellite">Satélite meteorológico</option>
                <option value="weather-severe">Clima severo</option>
                <option value="weather-uv">Índice UV</option>
                <option value="weather-wind">Viento</option>
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