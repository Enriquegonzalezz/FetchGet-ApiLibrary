<script setup>
  import Header from '../components/header.vue';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const totalApis = ref(0);
  const recentApis = ref([]);

  const fetchTotalApis = async () => {
    try {
      const res = await fetch('/apis-model/getcount');
      const data = await res.json();
      totalApis.value = data.count || 0;
    } catch (e) {
      totalApis.value = 0;
    }
  };

  const fetchRecentApis = async () => {
    try {
      const res = await fetch('/apis-model/getfive');
      const data = await res.json();
      recentApis.value = Array.isArray(data) ? data : [];
    } catch (e) {
      recentApis.value = [];
    }
  };

  const createNewApi = () => {
    router.push({ name: 'CreateApi' });
  };

  const deleteApi = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar esta API?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/apis-model/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Error al eliminar la API');
        return;
      }
      // Actualiza la lista de APIs recientes después de eliminar
      recentApis.value = recentApis.value.filter(api => api.id !== id);
      alert('API eliminada exitosamente');
      fetchTotalApis(); // Actualiza el contador
    } catch (e) {
      alert('Error al eliminar la API: ' + (e.message || e));
    }
  };

  onMounted(() => {
    fetchTotalApis();
    fetchRecentApis();
  });
</script>

<template>
  <div class="min-h-screen">
    <Header />
    
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <!--Estadisticas-->
      <section class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg border border-2 ">
          <h2 class="text-5xl font-bold text-gray-800 mb-2">{{ totalApis }}</h2>
          <p class="text-gray-600">Total API</p>
        </div>
      </section>

      <!--Actividad reciente -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section class="lg:col-span-2 bg-white p-6 rounded-lg border border-2">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="api in recentApis" :key="api.id || api.name">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ api.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ api.category }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ api.endpoint }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ api.updated_at || api.lastUpdated || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!--Acciones rapidas -->
        <section class="bg-white p-6 rounded-lg border border-2">
          <h2 class="text-xl font-semibold text-gray-800 mb-4 ">Quick Actions</h2>
          
          <div class="space-y-4 ">
            <button 
              @click="createNewApi"
              class="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200"
            >
              Create New API
            </button>
          </div>
        </section>
      </div>

      <!-- Ejemplo de tabla de APIs -->
      <section class="bg-white p-6 rounded-lg border border-2 mt-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">API List</h2>
        
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endpoint</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="api in recentApis" :key="api.id || api.name">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ api.name }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ api.category }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ api.endpoint }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    @click="deleteApi(api.id)"
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>