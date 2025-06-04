<template>
  <header class="border-b-[1.5px] border-b-quaternary p-4 flex justify-between items-center px-6 md:px-14">
    <div class="flex items-center space-x-4 md:space-x-8">
      <div class="text-xl font-bold text-gray-800"><img src="/fetchlogo.svg" alt=""></div>
      <nav class="space-x-6 text-gray-600 hidden md:flex">
        <a href="/apis" class="hover:text-primary transition-colors duration-200 font-bold">Home</a>
        <a
          v-if="isAuthenticated"
          href="/admin/dashboard"
          class="hover:text-primary transition-colors duration-200 font-bold"
        >Dashboard</a>
        <a
          v-if="isAuthenticated"
          href="/admin/createapis"
          class="hover:text-primary transition-colors duration-200 font-bold"
        >Create Api</a>
      </nav>
    </div>

    <div class="flex items-center space-x-4">
      <!-- Botones para pantallas grandes (ocultos en móviles) -->
      <div class="hidden md:flex items-center space-x-4">
        <button
          v-if="!isAuthenticated"
          class="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          @click="goToLogin"
        >
          Log in
        </button>
        <button
          v-if="isAuthenticated"
          class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
          @click="logout"
        >
          Logout
        </button>
        <div v-if="isAuthenticated" class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
          {{ userInitial }}
        </div>
      </div>

      <!-- Menú desplegable para móviles -->
      <div class="relative md:hidden">
        <button @click="toggleMenu" class="text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <!-- Menu desplegable -->
        <div v-if="isOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <a v-if="!isAuthenticated" @click.prevent="goToLogin" href="#" class="block py-2 px-4 text-gray-700 hover:bg-gray-100">Log in</a>
          <a v-if="isAuthenticated" href="/admin/dashboard" class="block py-2 px-4 text-gray-700 hover:bg-gray-100">Dashboard</a>
          <a v-if="isAuthenticated" href="/admin/createapis" class="block py-2 px-4 text-gray-700 hover:bg-gray-100">Create Api</a>
          <a v-if="isAuthenticated" @click.prevent="logout" href="#" class="block py-2 px-4 text-red-600 hover:bg-gray-100">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';

  const isOpen = ref(false);
  const router = useRouter();
  const isAuthenticated = ref(false);
  const userInitial = ref('');

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (!token) {
      isAuthenticated.value = false;
      userInitial.value = '';
      return;
    }
    try {
      const res = await fetch('/admin-auth/auth', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      isAuthenticated.value = !!data.valid;
      if (data.valid && email) {
        userInitial.value = email.charAt(0).toUpperCase();
      } else {
        userInitial.value = '';
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      }
    } catch (e) {
      isAuthenticated.value = false;
      userInitial.value = '';
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    }
  };

  onMounted(() => {
    checkAuth();
    window.addEventListener('storage', checkAuth);
  });

  const toggleMenu = () => {
    isOpen.value = !isOpen.value;
  };

  const goToLogin = () => {
    router.push({ name: 'Login' });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    isAuthenticated.value = false;
    userInitial.value = '';
    router.push({ name: 'Login' });
  };
</script>