# Utilisez une image Node.js officielle comme image de base
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le fichier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez le reste des fichiers de l'application dans le conteneur
COPY . .

# Exposez le port sur lequel votre application s'exécute
EXPOSE 3000

# Définissez la commande pour exécuter votre application
CMD [ "node", "app.js" ]