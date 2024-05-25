# frontend/Dockerfile

# Etapa de construcción
FROM node:20 AS build-stage

# Crear el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine AS production-stage

# Copiar los archivos de configuración de Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Eliminar el contenido del directorio por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos estáticos generados en la etapa de construcción
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
