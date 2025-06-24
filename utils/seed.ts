import mongoose from "mongoose";
import Food from "../models";
import dotenv from "dotenv";

dotenv.config();




const seedData = [
  // Nigerian Dishes
  {
    dish: 'Jollof Rice',
    recipe: 'Cook rice with tomatoes, peppers, onions, thyme, and bay leaves. Add chicken stock for depth. Simmer until rice absorbs flavors, slightly charred for smoky taste. Serve with fried plantain or chicken.',
    tags: ['Nigerian', 'gluten-free', 'spicy'],
    locations: [
      { name: 'Jollof by Jara', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Mama Cass', city: 'Lagos' }, //[](https://blog.ofadaa.com/top-lagos-spots-eat-local-dishes/)
      { name: 'Yellow Chilli', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Taste of Nigeria', city: 'Abuja' }, //[](https://blackrestaurantweeks.com/11-of-the-best-nigerian-west-african-restaurants-in-the-u-s/)
      { name: 'Jevinik', city: 'Port Harcourt' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
    ],
  },
  {
    dish: 'Egusi Soup',
    recipe: 'Grind egusi seeds, cook with palm oil, spinach, dried fish, and beef. Add peppers and onions for spice. Serve with fufu or pounded yam for a hearty meal.',
    tags: ['Nigerian', 'gluten-free', 'nutty'],
    locations: [
      { name: 'Olaiya Food Canteen', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Finger Licking Bukateria', city: 'Houston' }, //[](https://www.houstonpress.com/restaurants/here-eat-this-a-beginners-guide-to-nigerian-cuisine-6432981)
      { name: 'Mama Cass', city: 'Abuja' }, //[](https://blog.ofadaa.com/top-lagos-spots-eat-local-dishes/)
      { name: 'Utazi', city: 'Lagos' }, //[](https://blog.ofadaa.com/top-lagos-spots-eat-local-dishes/)
    ],
  },
  {
    dish: 'Amala',
    recipe: 'Boil yam flour into a smooth, dark paste. Serve with ewedu or gbegiri soup, topped with stewed meat or fish. A Yoruba staple, soft and savory.',
    tags: ['Nigerian', 'gluten-free', 'Yoruba'],
    locations: [
      { name: 'Olaiya', city: 'Lagos' }, //[](https://x.com/elonboyy/status/1933463720820101423)
      { name: 'Amala Sky', city: 'Lekki' }, //[](https://x.com/elonboyy/status/1933463720820101423)
      { name: 'Iya Basira Alamala', city: 'Shomolu' }, //[](https://x.com/elonboyy/status/1933463720820101423)
      { name: 'Amoke Oge', city: 'Bariga' }, //[](https://x.com/elonboyy/status/1933463720820101423)
      { name: 'Topshot Amala', city: 'Lagos' }, //[](https://x.com/elonboyy/status/1933463720820101423)
    ],
  },
  {
    dish: 'Suya',
    recipe: 'Skewer beef or chicken, coat with peanut spice mix (cayenne, ginger). Grill over open flame. Serve with onions and tomatoes for a smoky, spicy snack.',
    tags: ['Nigerian', 'spicy', 'street-food'],
    locations: [
      { name: 'Terra Kulture', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Nkoyo', city: 'Abuja' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
      { name: 'Suya Spot', city: 'Lagos' }, //[](https://www.tripadvisor.com/Restaurants-g304026-c1-Lagos_Lagos_State.html)
      { name: 'Taste of Nigeria', city: 'Houston' }, //[](https://www.houstoniamag.com/eat-and-drink/2024/03/nigerian-food-houston)
    ],
  },
  {
    dish: 'Pounded Yam',
    recipe: 'Boil yams, pound into a smooth, stretchy dough. Pair with egusi or vegetable stew. A filling staple, often served at celebrations with assorted meats.',
    tags: ['Nigerian', 'gluten-free', 'hearty'],
    locations: [
      { name: 'Jevinik', city: 'Lagos' }, //[](https://www.tripadvisor.com/Restaurants-g304026-c1-Lagos_Lagos_State.html)
      { name: 'Mama Cass', city: 'London' }, //[](https://blog.ofadaa.com/top-lagos-spots-eat-local-dishes/)
      { name: 'The Place', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'DeltaPot', city: 'Lagos' }, //[](https://blog.ofadaa.com/top-lagos-spots-eat-local-dishes/)
    ],
  },
  {
    dish: 'Efo Riro',
    recipe: 'Cook spinach with palm oil, peppers, tomatoes, and dried fish or meat. Spicy and rich, serve with fufu or rice for a Yoruba classic.',
    tags: ['Nigerian', 'vegetarian-option', 'spicy'],
    locations: [
      { name: 'Black Bell', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Afrisian', city: 'London' }, //[](https://www.afrisian.co.uk/)
      { name: 'Eazy Kitchen', city: 'London' }, //[](https://www.timeout.com/london/restaurants/londons-best-nigerian-and-west-african-restaurants)
      { name: 'Finger Licking Bukateria', city: 'Houston' }, //[](https://www.houstonpress.com/restaurants/here-eat-this-a-beginners-guide-to-nigerian-cuisine-6432981)
    ],
  },
  {
    dish: 'Moi Moi',
    recipe: 'Blend black-eyed beans with peppers, onions, and spices. Steam in leaves or tins. Serve as a side with jollof rice or alone as a snack.',
    tags: ['Nigerian', 'vegetarian', 'gluten-free'],
    locations: [
      { name: 'Ofada Hut', city: 'Lagos' }, //[](https://blog.ofadaa.com/top-lagos-spots-eat-local-dishes/)
      { name: 'Mama Cass', city: 'New York' }, //[](https://blog.ofadaa.com/top-lagos-spots-eat-local-dishes/)
      { name: 'Jollof by Jara', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Chuku’s', city: 'London' }, //[](https://www.bbc.co.uk/news/articles/cx2k713lvpno)
    ],
  },
  {
    dish: 'Pepper Soup',
    recipe: 'Simmer goat, fish, or chicken with habanero, utazi leaves, and spices. Spicy and brothy, perfect with yam or as a standalone sipping soup.',
    tags: ['Nigerian', 'spicy', 'gluten-free'],
    locations: [
      { name: 'Yellow Chilli', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Taste of Nigeria', city: 'Houston' }, //[](https://www.houstoniamag.com/eat-and-drink/2024/03/nigerian-food-houston)
      { name: 'BluCabana', city: 'Abuja' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
      { name: 'Akoko', city: 'London' }, //[](https://www.timeout.com/london/restaurants/londons-best-nigerian-and-west-african-restaurants)
    ],
  },
  {
    dish: 'Akara',
    recipe: 'Blend black-eyed peas with onions, peppers, and spices. Deep-fry into crispy fritters. A breakfast or snack staple, served with pap or alone.',
    tags: ['Nigerian', 'vegetarian', 'street-food'],
    locations: [
      { name: 'Akara', city: 'London' }, //[](https://www.akaralondon.co.uk/)
      { name: 'Terra Kulture', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'The Place', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Olaide’s Kitchen', city: 'Houston' }, //[](https://blackrestaurantweeks.com/11-of-the-best-nigerian-west-african-restaurants-in-the-u-s/)
      { name: 'Afriville', city: 'Surulere' }, //[](https://blog.ofadaa.com/top-lagos-spots-eat-local-dishes/)
    ],
  },
  {
    dish: 'Ogbono Soup',
    recipe: 'Cook ogbono seeds with palm oil, vegetables, and fish or meat. Thick and slimy, pair with eba or fufu for a rich, nutty Nigerian soup.',
    tags: ['Nigerian', 'gluten-free', 'hearty'],
    locations: [
      { name: 'The Place', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Fannie’s West African Cuisine', city: 'Houston' }, //[](https://blackrestaurantweeks.com/11-of-the-best-nigerian-west-african-restaurants-in-the-u-s/)
      { name: 'Nkoyo', city: 'Abuja' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
      { name: 'Tasty African Food', city: 'London' }, //[](https://www.bbc.co.uk/news/articles/cx2k713lvpno)
    ],
  },
  // Global Dishes
  {
    dish: 'Pizza Margherita',
    recipe: 'Top dough with tomato sauce, mozzarella, and basil. Bake until crust is golden. A classic Italian pizza, simple yet flavorful, served fresh.',
    tags: ['Italian', 'vegetarian', 'gluten-option'],
    locations: [
      { name: 'Marcopolo', city: 'Lagos' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
      { name: 'La Taverna', city: 'Lagos' }, //[](https://www.myguidenigeria.com/restaurants)
      { name: 'Buka', city: 'Brooklyn' }, //[](https://blackrestaurantweeks.com/11-of-the-best-nigerian-west-african-restaurants-in-the-u-s/)
      { name: 'Sailor', city: 'New York' }, //[](https://www.nytimes.com/interactive/2025/dining/best-nyc-restaurants.html)
    ],
  },
  {
    dish: 'Sushi (Nigiri)',
    recipe: 'Shape vinegared rice, top with fresh fish (e.g., tuna, salmon). Serve with soy sauce, wasabi, and ginger. Japanese delicacy, light and elegant.',
    tags: ['Japanese', 'gluten-free', 'seafood'],
    locations: [
      { name: 'Natives Restaurant', city: 'Lagos' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
      { name: 'Penny', city: 'New York' }, //[](https://www.nytimes.com/interactive/2025/dining/best-nyc-restaurants.html)
      { name: 'Akara', city: 'London' }, //[](https://www.akaralondon.co.uk/)
      { name: 'Chishuru', city: 'London' }, //[](https://www.timeout.com/london/restaurants/londons-best-nigerian-and-west-african-restaurants)
    ],
  },
  {
    dish: 'Pad Thai',
    recipe: 'Stir-fry rice noodles with shrimp, tofu, egg, bean sprouts, and peanuts. Season with tamarind, fish sauce, and chili. Thai classic, sweet and tangy.',
    tags: ['Thai', 'gluten-free-option', 'spicy'],
    locations: [
      { name: 'La Taverna', city: 'Lagos' }, //[](https://www.myguidenigeria.com/restaurants)
      { name: 'Kabawa', city: 'New York' }, //[](https://www.nytimes.com/interactive/2025/dining/best-nyc-restaurants.html)
      { name: 'Tasty African Food', city: 'London' }, //[](https://www.bbc.co.uk/news/articles/cx2k713lvpno)
      { name: 'Black Bell', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
    ],
  },
  {
    dish: 'Tacos (Al Pastor)',
    recipe: 'Marinate pork in chili and pineapple, grill, and serve in corn tortillas with onions, cilantro, and lime. Mexican street food, vibrant and zesty.',
    tags: ['Mexican', 'gluten-free', 'spicy'],
    locations: [
      { name: 'Yellow Chilli', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'A&A', city: 'New York' }, //[](https://www.nytimes.com/interactive/2025/dining/best-nyc-restaurants.html)
      { name: 'Eazy Kitchen', city: 'London' }, //[](https://www.timeout.com/london/restaurants/londons-best-nigerian-and-west-african-restaurants)
      { name: 'Marcopolo', city: 'Lagos' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
    ],
  },
  {
    dish: 'Butter Chicken',
    recipe: 'Cook chicken in a creamy tomato sauce with butter, cream, and spices (garam masala, cumin). Serve with naan or rice. Indian comfort food.',
    tags: ['Indian', 'gluten-free-option', 'spicy'],
    locations: [
      { name: 'Marcopolo', city: 'Lagos' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
      { name: 'Akoko', city: 'London' }, //[](https://www.timeout.com/london/restaurants/londons-best-nigerian-and-west-african-restaurants)
      { name: 'Buka', city: 'Brooklyn' }, //[](https://blackrestaurantweeks.com/11-of-the-best-nigerian-west-african-restaurants-in-the-u-s/)
      { name: 'Taste of Nigeria', city: 'Abuja' }, //[](https://blackrestaurantweeks.com/11-of-the-best-nigerian-west-african-restaurants-in-the-u-s/)
    ],
  },
  {
    dish: 'Pasta Carbonara',
    recipe: 'Toss spaghetti with egg, pecorino, guanciale, and black pepper. Creamy without cream, this Italian dish is rich and savory, served al dente.',
    tags: ['Italian', 'dairy', 'hearty'],
    locations: [
      { name: 'La Taverna', city: 'Lagos' }, //[](https://www.myguidenigeria.com/restaurants)
      { name: 'Sailor', city: 'New York' }, //[](https://www.nytimes.com/interactive/2025/dining/best-nyc-restaurants.html)
      { name: 'Natives Restaurant', city: 'Lagos' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
      { name: 'Chishuru', city: 'London' }, //[](https://www.timeout.com/london/restaurants/londons-best-nigerian-and-west-african-restaurants)
    ],
  },
  {
    dish: 'Falafel',
    recipe: 'Blend chickpeas with herbs, spices, and onion. Fry into crispy balls. Serve in pita with tahini, lettuce, and tomatoes. Middle Eastern favorite.',
    tags: ['Middle Eastern', 'vegan', 'gluten-free-option'],
    locations: [
      { name: 'Royale Express', city: 'Abuja' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
      { name: 'A&A', city: 'New York' }, //[](https://www.nytimes.com/interactive/2025/dining/best-nyc-restaurants.html)
      { name: 'Tasty African Food', city: 'London' }, //[](https://www.bbc.co.uk/news/articles/cx2k713lvpno)
      { name: 'Black Bell', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
    ],
  },
  {
    dish: 'Dim Sum (Shumai)',
    recipe: 'Fill wonton wrappers with shrimp, pork, and mushrooms. Steam until tender. Serve with soy sauce and chili oil. Chinese bite-sized delight.',
    tags: ['Chinese', 'seafood', 'steamed'],
    locations: [
      { name: 'Marcopolo', city: 'Lagos' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
      { name: 'Penny', city: 'New York' }, //[](https://www.nytimes.com/interactive/2025/dining/best-nyc-restaurants.html)
      { name: 'Eazy Kitchen', city: 'London' }, //[](https://www.timeout.com/london/restaurants/londons-best-nigerian-and-west-african-restaurants)
      { name: 'BluCabana', city: 'Abuja' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
    ],
  },
  {
    dish: 'Paella',
    recipe: 'Cook rice with saffron, seafood, chicken, and vegetables in a wide pan. Spanish classic, vibrant and aromatic, served family-style.',
    tags: ['Spanish', 'gluten-free', 'seafood'],
    locations: [
      { name: 'La Taverna', city: 'Lagos' }, //[](https://www.myguidenigeria.com/restaurants)
      { name: 'Sailor', city: 'New York' }, //[](https://www.nytimes.com/interactive/2025/dining/best-nyc-restaurants.html)
      { name: 'Akoko', city: 'London' }, //[](https://www.timeout.com/london/restaurants/londons-best-nigerian-and-west-african-restaurants)
      { name: 'Jollof by Jara', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Nkoyo', city: 'Abuja' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
    ],
  },
  {
    dish: 'Beef Pho',
    recipe: 'Simmer beef broth with star anise, ginger, and spices. Add rice noodles, thin beef slices, and herbs. Vietnamese soup, fragrant and warming.',
    tags: ['Vietnamese', 'gluten-free', 'hearty'],
    locations: [
      { name: 'Black Bell', city: 'Lagos' }, //[](https://opensauce.vendease.com/food-restaurants/top-10-best-spots-for-nigerian-cuisine-in-lagos/)
      { name: 'Kabawa', city: 'New York' }, //[](https://www.nytimes.com/interactive/2025/dining/best-nyc-restaurants.html)
      { name: 'Tasty African Food', city: 'London' }, //[](https://www.bbc.co.uk/news/articles/cx2k713lvpno)
      { name: 'Royale Express', city: 'Abuja' }, //[](https://www.travelstart.com.ng/blog/25-most-amazing-restaurants-in-nigeria/)
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    await Food.deleteMany({});
    await Food.insertMany(seedData);
    console.log('Seeded 20 dishes successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seed error:', error);
  }
}

seedDatabase();