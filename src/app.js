const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const indexRoutes = require('./routes/index');
const cors = require('cors')

//configuraciones
app.set('port', process.env.PORT || 3000 );
mongoose.connect('mongodb+srv://root:toor@cluster0.odztp.mongodb.net/Cluster0?retryWrites=true&w=majority')
.then(db => console.log('Connected'))
.catch(err => console.log(err));

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(cors())
//rutas
app.use('/', indexRoutes);

//inicializacion del server
app.listen(app.get('port'), ()=>{
    console.log('Server started');
});