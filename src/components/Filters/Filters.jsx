import React, {useState, useEffect} from "react";
import Select from 'react-select';

 export default function Filters(){

    const allRestaurantes = [
        {name: 'Sol', neighborhood: 'Palermo', price:'two', foodTypes:'type1'}
    ]


    let neighborhoodOptions = [
        { name: "all", label: "Barrios", value: "all" },
        {name: 'palermo', label: 'Palermo', value:'palermo'},
        {name: 'belgrano', label: 'Belgrano', value:'belgrano'},
        {name: 'recoleta', label: 'Recoleta', value:'Recoleta'}
      ]
    
      let priceOptions = [
        { name: "all", label: "Precios", value: "all" },
        {name: 'one', label: '$', value:'one'},
        {name: 'two', label: '$$', value:'two'},
        {name: 'three', label: '$$$', value:'three'},
        {name: 'four', label: '$$$$', value:'four'},
        {name: 'five', label: '$$$$$', value:'five'}
    
      ]
    
      let foodTypes = [
        { name: "all", label: "Tipos de comida", value: "all" },
        {name: "type1", label: "Vegana", value: "type1"},
        {name: "type2", label: "Vegetariana", value: "type2"},
        {name: "type3", label: "Italiana", value: "type3"}
      ]

      const [filteredByNeighborhood, setFilteredByNeighborhood] = useState(neighborhoodOptions[0]);
      const [filteredByPrice, setFilteredByPrice] = useState(priceOptions[0]);
      const [filteredByFoodTypes, setFilteredByFoodTypes] = useState(foodTypes[0]);


      useEffect(() => {
        displaySelectedRestaurantes();
    }, [allRestaurantes,  filteredByNeighborhood, filteredByPrice, filteredByFoodTypes])

      function displaySelectedRestaurantes(){
          let restaurantesByNeighborhood = filteredByNeighborhood.value === 'all' ?  allRestaurantes : allRestaurantes.filter(restaurante => (restaurante.neighborhood === filteredByNeighborhood.value))
          let restaurantesByFood = restaurantesByNeighborhood.value === 'all' ? allRestaurantes : allRestaurantes.filter( r=> r.foodTypes === filteredByNeighborhood.value)
         let restaurantesByPrice = restaurantesByFood.value === 'all' ? allRestaurantes : allRestaurantes.filter(r=> r.price === filteredByFoodTypes.value)
      }

      function handleNeighborhood(e) {
        // setCurrentPage(1);
        setFilteredByNeighborhood(e);
    }
    
    function handlePrice(e){
        setFilteredByPrice(e)
    }

    function handleFoodTypes(e){
        setFilteredByFoodTypes(e)
    }


      return (
          <div>
              <Select options={neighborhoodOptions} value={filteredByNeighborhood} name={'neighborhood'} onChange={(e) => handleNeighborhood(e)} />
            <Select options={priceOptions} value={filteredByPrice} name={'price'} onChange={e=> handlePrice(e)}/>
              <Select options={foodTypes} value={filteredByFoodTypes} name={'types'} onChange={e=> handleFoodTypes(e)}/>
          </div>
      )
    
    }
    