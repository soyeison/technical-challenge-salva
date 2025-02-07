FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install --omit=dev

# Copiar el resto del código de la aplicación
COPY . ./

# Exponer el puerto en el que corre la API
EXPOSE 3002

# Comando para correr la API (asumiendo que el archivo de entrada está en /dist/index.js)
CMD ["node", "dist/index.js"]