FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm install

# Copiar el resto del código de la aplicación
COPY . ./

# Generar el build de la aplicacion
RUN npm run build

# Comando para correr la API (asumiendo que el archivo de entrada está en /dist/index.js)
CMD ["node", "dist/index.js"]