const CACHE_NAME = 'havale-erp-v6'; // نسخه جدید برای پاک کردن کش قدیمی
const urlsToCache = [
  './',
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;700;900&display=swap'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url => {
          // لود کردن فایل‌ها یکی یکی تا اگر یکی خطا داد، بقیه متوقف نشوند
          return cache.add(url).catch(err => console.log('Failed to cache:', url, err));
        })
      );
    })
  );
});

self.addEventListener('activate', event => {
  // پاک کردن کش‌های قدیمی (مثل v1, v2, v3, v4, v5)
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // 🟢 اگر درخواست مربوط به دیتابیس سوپابیس بود، اصلا از کش استفاده نکن تا اطلاعات آپدیت بمانند
  if (event.request.url.includes('supabase.co')) {
    return; 
  }

  // برای بقیه فایل‌ها: اول از کش بگیر، اگر نبود از اینترنت دانلود کن
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
