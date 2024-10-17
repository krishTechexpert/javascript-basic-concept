// export module
console.log('export module')

const shippingCost=10;
const cart = [];

export const addToCart = function(product,qty){
  cart.push({product,qty})
  console.log('Item added to cart')
}

const price=2000;
const totalQty=10;

export default function showName(name){
  console.log(name)
}


export {price,totalQty as tq}