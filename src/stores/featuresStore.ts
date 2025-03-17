import { defineStore } from 'pinia';

export const useFeaturesStore = defineStore('features', {
  state: () => ({
    features: [
      { title: 'Швидкість', description: 'Наш сервіс працює миттєво.' },
      { title: 'Надійність', description: 'Ми гарантуємо якість.' },
      { title: 'Підтримка', description: 'Допомога 24/7.' },
      { title: 'Інновації', description: 'Ми завжди на крок попереду.' },
      { title: 'Безпека', description: 'Ваші дані під надійним захистом.' },
      { title: 'Мобільність', description: 'Працюйте з будь-якого пристрою.' },
    ],
  }),
});
