import React, { useState } from 'react';
import './ShopPage.css';


import fruitsImg from './categories/fruits.jpg';
import vegetablesImg from './categories/vegetables.jpg';
import seedsImg from './categories/seeds.jpg';
import cattleandsheepImg from './categories/cattleandsheep.jpg';
import fertilizersImg from './categories/fertilizers.jpg';
import fisheryImg from './categories/fishery.jpg';
import flowersImg from './categories/flowers.jpg';
import nurseryplantsImg from './categories/nurseryplants.jpg';
import poultryproductsImg from './categories/poultryproducts.jpg';
import spicesImg from './categories/spices.jpg';
import anyotherImg from './categories/anyother.jpg';
import woodandtimberImg from './categories/woodandtimber.jpg';
import cottonImg from './categories/cotton.jpg';
import homemadeproductsImg from './categories/homemadeproducts.jpg';
import agritoolsImg from './categories/agritools.jpg';
import manureImg from './categories/manure.jpg';
import coffeeandteaImg from './categories/coffeeandtea.jpg';

const categories = [
  { name: 'Fruits', image: fruitsImg },
  { name: 'Vegetables', image: vegetablesImg },
  { name: 'Seeds', image: seedsImg },
  { name: 'Cattle and Sheep', image: cattleandsheepImg },
  { name: 'Fertilizers', image: fertilizersImg },
  { name: 'Fishery', image: fisheryImg },
  { name: 'Flowers', image: flowersImg },
  { name: 'Nursery Plants', image: nurseryplantsImg },
  { name: 'Poultry Products', image: poultryproductsImg },
  { name: 'Spices', image: spicesImg },
  { name: 'Any Other', image: anyotherImg },
  { name: 'Wood and Timber', image: woodandtimberImg },
  { name: 'Cotton', image: cottonImg },
  { name: 'Homemade Products', image: homemadeproductsImg },
  { name: 'Agri Tools', image: agritoolsImg },
  { name: 'Manure', image: manureImg },
  { name: 'Coffee and Tea', image: coffeeandteaImg },
];

const ShopPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategoryClick = (categoryName) => {
    window.location.href = `/shop/${categoryName.toLowerCase()}`;
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shop-page">
      <p>Browse and order fresh product from farmers</p>

      <div className="search-container">
        <div className="search-bar-with-button">
          <input
            type="text"
            placeholder="Search for categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Handles the search as the user types
            className="search-input"
          />
        </div>
      </div>

      <div className="categories-container">
        {filteredCategories.map((cat) => (
          <div
            key={cat.name}
            className="category-card"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <img src={cat.image} alt={cat.name} />
            <h4>{cat.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
