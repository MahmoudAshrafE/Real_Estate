import mongoose from 'mongoose';

//connect to db 
export const connectDatabase = () => {
    mongoose.connect(process.env.DB_KEY, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`);
    }).catch(err => {
        console.log(err);
    })
}
