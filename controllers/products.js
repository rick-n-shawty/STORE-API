const Product = require('../models/product')
const mongoose = require('mongoose')
const getAllProductsStatic = async(req, res) =>{
    const products = await Product.find({ price: { '$gt': 80 }} ).sort('price').limit(4).skip(1)
    res.status(200).json({items: products.length, data: products})
}

const getAllProducts = async(req, res) =>{
    const {featured, name, company, sort, select, numericFilters} = req.query
    const queryObject = {}
    if(featured){
        queryObject.featured = featured === 'true' ? true : false 
    }
    if(name){
        queryObject.name = {$regex: name, $options: 'i'}
    }
    if(company){
        queryObject.company = company
    }
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '<': '$lt',
            '<=': '$lte',
            '=': '$eq'
        }
        const regEx = /\b(<|>|>=|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(",").forEach(element => {
            const [field, operator, value] = element.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        });
    }
    console.log('QUERY OBJECT',queryObject)
    let result = Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createdAt')
    }
    if(select){
        const selectionList = select.split(',').join(' ')
        result = result.select(selectionList)
    }
    console.log(await result)
    const products = await result 
    res.status(200).json({msg: 'products route', data: products})
}
module.exports = {
    getAllProducts,
    getAllProductsStatic
}
