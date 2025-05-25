<template>
  <div class="bg-white rounded-lg overflow-hidden transition-transform duration-200 hover:scale-[1.02] border-none bg-transparent cursor-pointer" @click="goToApiDetail(api.title)">
    <img :src="api.image" :alt="api.title" class="w-full h-32 sm:h-48 object-cover">
    <div class="py-4">
      <h3 class="text-left font-semibold text-gray-800 mb-1">{{ api.title }}</h3>
      <p class="text-sm text-gray-600">{{ api.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  api: {
    type: Object,
    required: true,
    default: () => ({
      id: 1,
      title: 'Movie Database API',
      description: 'Access a comprehensive movie data including ratings, reviews, and cast information.',
      category: 'Movies',
      image: 'https://example.com/default-image.jpg'
    })
  }
});

const router = useRouter();

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const goToApiDetail = (apiTitle) => {
  router.push({ name: 'ApiDetail', params: { apiName: slugify(apiTitle) } });
};

// Clases de color de fondo dinámicas para los logos temporales
const bgColorClass = computed(() => {
  const colors = [
    'bg-teal-600',
    'bg-blue-600',
    'bg-indigo-600',
  ];
  return colors[props.api.id % colors.length];
});
</script>