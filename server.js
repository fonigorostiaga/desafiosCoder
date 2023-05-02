const http=require('./app')

const PORT=process.env.PORT||3000

http.listen(PORT,()=>{console.log('server up and running in port '+PORT)})