# استخدام نسخة Node خفيفة جداً
FROM node:18-alpine

# تثبيت Python فقط كإضافة أساسية
RUN apk add --no-cache python3 py3-pip git

# إنشاء مجلد العمل
WORKDIR /app

# جلب كود Piston المصدري (النسخة المصغرة)
RUN git clone --depth 1 https://github.com/engineer-man/piston.git .

# تثبيت المكتبات اللازمة لتشغيل السيرفر فقط
RUN npm install --only=production

# إعداد المنفذ
EXPOSE 2000

# تشغيل السيرفر
CMD ["node", "src/index.js"]
