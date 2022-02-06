import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import {getRestos, getNeighborhoods} from "../../actions/index"


export default function Filters(){
    const dispatch = useDispatch()

    const allRestaurants = useSelector((state)=> state.restaurants)
    const allNeighborhoodsRaw = useSelector((state)=> state.neighborhoods)
    const allNeighborhoods = allNeighborhoodsRaw.map(n => {return{name: n.name, label: n.name}})
    const [restosToShow, setRestosToShow] = useState(allRestaurants)
    
    
    
    let defaultNeighborhood =  { name: "all", label: "Barrios", value: "all" }
    
    let priceOptions = [
      { name: "all", label: "Precios", value: "all" },
      {name: '$', label: '$', value:'$'},
      {name: '$$', label: '$$', value:'$$'},
      {name: '$$$', label: '$$$', value:'$$$'},
      {name: '$$$$', label: '$$$$', value:'$$$$'},
      {name: '$$$$$', label: '$$$$$', value:'$$$$$'}
  
    ]
    
      let foodTypes = [
        { name: "all", label: "Tipos de comida", value: "all" },
        {name: "type1", label: "Vegana", value: "type1"},
        {name: "type2", label: "Vegetariana", value: "type2"},
        {name: "type3", label: "Italiana", value: "type3"}
      ]

      const [filteredByNeighborhood, setFilteredByNeighborhood] = useState(defaultNeighborhood);
      const [filteredByPrice, setFilteredByPrice] = useState(priceOptions[0]);
      const [filteredByFoodTypes, setFilteredByFoodTypes] = useState(foodTypes[0]);


      
    function displaySelectedRestaurantes(){
        
        let restaurantesByNeighborhood = filteredByNeighborhood.value === 'all' ?  allRestaurants : allRestaurants.filter(restaurante => (restaurante.neighborhood.some(e => e === filteredByNeighborhood.name)))
        
        let restaurantesByFood = foodTypes.value === 'all' ? restaurantesByNeighborhood : restaurantesByNeighborhood.filter( r=> r.foodTypes === filteredByNeighborhood.value)
        let restaurantesByPrice = priceOptions.value === 'all' ? restaurantesByFood : restaurantesByFood.filter(r=> r.price === filteredByFoodTypes.value)
        setRestosToShow(restaurantesByNeighborhood)
      }

      useEffect(() => {
        if (allNeighborhoods && allNeighborhoods.length > 0) {
            allNeighborhoods.unshift(defaultNeighborhood)
        }
      }, [allNeighborhoods])
        

        useEffect(() => {
          displaySelectedRestaurantes();
      }, [allRestaurants,  filteredByNeighborhood, filteredByPrice, filteredByFoodTypes])
      // function resetFilters() {
      //   setFilteredByFoodTypes(foodTypes[0]),
      //   setFilteredByNeighborhood(neighborhoodOptions[0]),
      //   setFilteredByPrice(priceOptions[0])
      // }

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

    useEffect(()=>{
        dispatch(getRestos());
        dispatch(getNeighborhoods());
    },[])
    
    return (
            <div>
              <Select options={allNeighborhoods} value={filteredByNeighborhood} name={'neighborhood'} onChange={(e) => handleNeighborhood(e)} />
            <Select options={priceOptions} value={filteredByPrice} name={'price'} onChange={e=> handlePrice(e)}/>
              <Select options={foodTypes} value={filteredByFoodTypes} name={'types'} onChange={e=> handleFoodTypes(e)}/>
          </div>
     
    )
}