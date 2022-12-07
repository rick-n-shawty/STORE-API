const data = require('./products.json')
const Product = require('./models/product')
const populate = async () =>{
    try{
        await Product.deleteMany()
        await Product.create(data)
        console.log('SUCCESS')
        process.exit(0)
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}
module.exports = populate