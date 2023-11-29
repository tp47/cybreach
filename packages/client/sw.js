const CACHE_NAME = 'my-site-cache-v1'

const URLS = ['/', '/src/main.tsx']

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(URLS)
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  )
})

this.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.map((name) => caches.delete(name)))
    })
  )
})

this.addEventListener('fetch', (event) => {
  if (!(event.request.url.indexOf('http') === 0)) return
  event.respondWith(
    // Пытаемся найти ответ на такой запрос в кеше
    caches.match(event.request).then((response) => {
      if (response) {
        return response
      }

      const fetchRequest = event.request.clone()
      // В противном случае делаем запрос на сервер
      return (
        fetch(fetchRequest)
          // Можно задавать дополнительные параметры запроса, если ответ вернулся некорректный.
          .then((response) => {
            // Если что-то пошло не так, выдаём в основной поток результат, но не кладём его в кеш
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            const responseToCache = response.clone()
            // Получаем доступ к кешу по CACHE_NAME
            caches.open(CACHE_NAME).then((cache) => {
              // Записываем в кеш ответ, используя в качестве ключа запрос
              cache.put(event.request, responseToCache)
            })
            // Отдаём в основной поток ответ
            return response
          })
      )
    })
  )
})
