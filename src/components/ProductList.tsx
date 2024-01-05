import React, { useState, useEffect } from 'react'

const ProductList = ({ category }: { category: string}) => {

    const [products, setProducts] = useState<string[]>([]);

    useEffect(() => {
        //calback function
        console.log('fetching products in ', category);
        setProducts(['clothing', 'household'])

    }, [category]) //the empty array tells it to execute only once (twice for dev in strict mode)

  return (
    <div>ProductList</div>
  )
}

export default ProductList;

//UseEffect
// useEffect(() => {
//     //calback function
//     console.log('fetching products in ', category);
//     setProducts(['clothing', 'household'])

// }, [category]) //the empty array tells it to execute only once (twice for dev in strict mode)
//no second argument = rerun everytime it rerenders
//empty array = render only once, the first time
//variable in the array = rerun whenever that variable is updated