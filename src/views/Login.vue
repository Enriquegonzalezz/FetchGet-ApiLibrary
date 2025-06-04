<template>
  <div class="min-h-screen flex flex-col ">
    <Header />
    <div class="flex flex-1 items-center justify-center">
      <form class="bg-white p-8  w-full max-w-sm space-y-6" @submit.prevent="handleLogin">
        <h2 class="text-2xl font-bold text-center text-primary mb-4">Log in</h2>
        <div v-if="error" class="bg-red-100 text-red-700 p-2 rounded mb-2 text-center">
          {{ error }}
        </div>
        <div>
          <label class="block text-gray-700  mb-1" for="email">email</label>
          <input
            id="email"
            name="email"
            v-model="email"
            type="email"
            class="w-full px-4 py-2  rounded-md  bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 mb-1" for="password">Password</label>
          <input
            id="password"
            name="password"
            v-model="password"
            type="password"
            class="w-full px-4 py-2  rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="********"
            required
          />
        </div>
        
        <button
          type="submit"
          class="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template> 
<script setup>
  import Header from '@/components/Header.vue';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  const email = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  const token = localStorage.getItem('token');
  console.log('Token:', token);

  const handleLogin = async () => {
    error.value = '';
    try {
      const res = await fetch('/admin-auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ email: email.value, password: password.value })
      });
      const data = await res.json();
      if (!res.ok) {
        error.value = data.error?.error || data.error || data;
        return;
      }
      console.log('Login successful:', data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email.value);
      router.push('/admin/dashboard');
    } catch (e) {
      error.value = 'Error de red o del servidor';
    }
  };
</script>