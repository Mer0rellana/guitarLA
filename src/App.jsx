import { useEffect, useState } from "react"
import { Guitar } from "./components/Guitar"
import { Header } from "./components/Header"
import { db } from "./data/db.js"

function App() {

  const initalCart = () =>{
    const localCart = localStorage.getItem('cart')
    return localCart ? JSON.parse(localCart) : []
  }

  const [data] = useState(db)
  const [cart, setCart] = useState(initalCart)

  const MAX_ITEM = 5
  const MIN_ITEM = 1

  useEffect(() =>{
      localStorage.setItem('cart', JSON.stringify(cart))
  },[cart])

  function addToCart(item){

    const itemExists = cart.findIndex(guitar => guitar.id === item.id)

    if(itemExists >= 0){
      if(cart[itemExists].quantity >= MAX_ITEM) return
      const updatedCart = [...cart]
      updatedCart[itemExists].quantity++
      setCart(updatedCart)
    }else{
      item.quantity = 1
      setCart(prev =>[...prev, item])
    }

  } 

  function removeFromCart(id){
    setCart(prev => prev.filter(guitar => guitar.id !== id))
  }

  function increaseQuantity(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEM){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id){
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEM){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }



  return (
    <div>
      <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      setCart={setCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((op)=>(
              <Guitar 
              key={op.id} 
              name={op.name} 
              description={op.description} 
              img={op.image} 
              setCart={setCart}
              price={op.price} 
              id={op.id} 
              cart={cart}
              addToCart={addToCart}
              />
            ))
          }
        </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>

    </div>
  )
}

export default App
