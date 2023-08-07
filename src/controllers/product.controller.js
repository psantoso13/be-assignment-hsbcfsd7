const productData = require("../product_data/MOCK_DATA.json");     

// const allProducts = (req, res, next) => {
//   res.send({data: productData})
// }

const allProducts = (req, res) => {
  res.send({
    message: 'Data product retrieved',
    status: 'Ok',
    data: productData})
}

const productById = (req, res) => {

const params = req.params.productId     
const intParams = parseInt(params)    
// console.log(typeof intParams)

if (intParams > 100 || intParams < 1) {
  return res.send({
    message: 'Data product not found',
    status: 'Error',
    data: null
  })
  } else {
    res.send({
      message: 'Data product retrieved',
      status: 'Ok',
      data: productData[intParams - 1]
    })
  }
}

module.exports = {allProducts, productById}