<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <div class="flex flex-1 items-center justify-center">
      <form class="bg-white p-8 w-full max-w-sm space-y-6">
        <h2 class="text-2xl font-bold text-center text-primary mb-4">Register like Admin</h2>
        <div>
          <label class="block text-gray-700 mb-1" for="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            class="w-full px-4 py-2 rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="ejemplo@correo.com"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 mb-1" for="password">Contraseña</label>
          <input
            id="password"
            type="password"
            class="w-full px-4 py-2 rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="********"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700 mb-1" for="confirm-password">Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            class="w-full px-4 py-2 rounded-md bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="********"
            required
          />
        </div>
        <div class="text-sm text-center">
          <span>¿Do you have an account? </span>
          <a href="/login" class="text-primary font-semibold hover:underline">Log in</a>
        </div>
        <button
          type="submit"
          class="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors"
        >
          Registrarse
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
import { ref } from 'vue';

const apiName = ref('Mi API');
</script>

<style scoped>
h1 {
  color: #333;
}
</style>