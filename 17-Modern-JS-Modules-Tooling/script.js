// import module
import myName, {addToCart,price as amt,tq} from  "./shoppingCart.js";

console.log('import module')

addToCart('laptop',2)

console.log(amt);
console.log(tq)
myName('krish')

//IFEE function runs once only.
const myOrder = (function(){

  const shippingCost=10;
  const cart = [];

  const addToCart1 = function(product,qty){
    cart.push({product,qty})
    console.log('Item added to cart')
  }

  const order = function(){
    console.log(`you have order ${cart.length} items`)
  }
  return {
    addToCart1,
    cart,
    order
  }

})()
myOrder.addToCart1('pizza',2)
console.log(myOrder.cart)



/********** below code working in Nodejs only */
//export
// export.addToCart = function(product,qty){
//   cart.push({product,qty})
//   console.log('Item added to cart')
// }
// import 

//import { addToCart } =require('./shoppingCart.js');