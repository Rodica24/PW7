const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSetup = require('./swagger');

dotenv.config();

const app = express();
app.use(express.json());

// Configurarea și conectarea la baza de date MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Include rutele pentru autentificare și filme
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');

// Utilizarea rutelor în aplicație
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

// Integrarea Swagger UI
swaggerSetup(app);

// Definirea portului și pornirea serverului
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
