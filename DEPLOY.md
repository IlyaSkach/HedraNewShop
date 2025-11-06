# Деплой на Netlify

## Вариант 1: Через Git (рекомендуется)

### 1. Создайте Git репозиторий

```bash
cd /Users/ilas/projects/hedra-shop-react
git init
git add .
git commit -m "Initial commit"
```

### 2. Загрузите на GitHub

```bash
# Создайте репозиторий на github.com
git remote add origin https://github.com/ваш-username/hedra-shop.git
git push -u origin main
```

### 3. Подключите к Netlify

1. Зайдите на [netlify.com](https://netlify.com)
2. Войдите через GitHub
3. Нажмите "New site from Git"
4. Выберите ваш репозиторий
5. Настройки:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Нажмите "Deploy site"

**Готово!** Netlify автоматически развернет сайт.

---

## Вариант 2: Через Netlify CLI

### 1. Установите Netlify CLI

```bash
npm install -g netlify-cli
```

### 2. Войдите в аккаунт

```bash
netlify login
```

### 3. Инициализируйте проект

```bash
cd /Users/ilas/projects/hedra-shop-react
netlify init
```

### 4. Разверните

```bash
netlify deploy --prod
```

---

## Вариант 3: Ручная загрузка

### 1. Создайте сборку

```bash
cd /Users/ilas/projects/hedra-shop-react
npm run build
```

### 2. Загрузите на Netlify

1. Зайдите на [netlify.com](https://netlify.com)
2. Перетащите папку `build/` в окно браузера
3. Готово!

---

## После деплоя

### Получите домен

Netlify даст вам домен типа: `your-site-name.netlify.app`

### Настройте свой домен (опционально)

1. В Netlify: Settings → Domain management
2. Добавьте свой домен
3. Настройте DNS

---

## Автоматические обновления

При использовании Git - каждый push автоматически обновляет сайт!

```bash
git add .
git commit -m "Update"
git push
```

Netlify автоматически пересоберет и обновит сайт.

---

## Готово! ✅

Ваш сайт будет доступен по адресу: `https://ваш-сайт.netlify.app`
