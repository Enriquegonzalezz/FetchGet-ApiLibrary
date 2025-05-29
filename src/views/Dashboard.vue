<script setup>
import Header from '../components/header.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const recentApis = ref([
  { name: 'Weather API', version: 'v1.2', status: 'Active', lastUpdated: '2023-09-15' },
  { name: 'E-commerce API', version: 'v2.0', status: 'Active', lastUpdated: '2023-09-10' },
  { name: 'Social Media API', version: 'v1.6', status: 'Notions', lastUpdated: '2023-07-20' },
  { name: 'Finance API', version: 'v1.0', status: 'Active', lastUpdated: '2023-09-05' },
  { name: 'Travel API', version: 'v2.1', status: 'Active', lastUpdated: '2023-09-12' },
]);

const createNewApi = () => {
  router.push({ name: 'CreateApi' });
};

const viewAllApis = () => {
  router.push({ name: 'AllApis' });
};
</script>

<template>
  <div class="min-h-screen">
    <Header />
    
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      <!--Estadisticas-->
      <section class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg border border-2 ">
          <h2 class="text-5xl font-bold text-gray-800 mb-2">12.345</h2>
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
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="api in recentApis" :key="api.name">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ api.name }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ api.version }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${api.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`">
                      {{ api.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ api.lastUpdated }}</td>
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
    </main>
  </div>
</template>
