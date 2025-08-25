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
  },
  {
    dish: 'Egusi Soup',
    recipe: 'Grind egusi seeds, cook with palm oil, spinach, dried fish, and beef. Add peppers and onions for spice. Serve with fufu or pounded yam for a hearty meal.',
    tags: ['Nigerian', 'gluten-free', 'nutty'],
  },
  {
    dish: 'Amala',
    recipe: 'Boil yam flour into a smooth, dark paste. Serve with ewedu or gbegiri soup, topped with stewed meat or fish. A Yoruba staple, soft and savory.',
    tags: ['Nigerian', 'gluten-free', 'Yoruba'],
  },
  {
    dish: 'Suya',
    recipe: 'Skewer beef or chicken, coat with peanut spice mix (cayenne, ginger). Grill over open flame. Serve with onions and tomatoes for a smoky, spicy snack.',
    tags: ['Nigerian', 'spicy', 'street-food'],
  },
  {
    dish: 'Pounded Yam',
    recipe: 'Boil yams, pound into a smooth, stretchy dough. Pair with egusi or vegetable stew. A filling staple, often served at celebrations with assorted meats.',
    tags: ['Nigerian', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Efo Riro',
    recipe: 'Cook spinach with palm oil, peppers, tomatoes, and dried fish or meat. Spicy and rich, serve with fufu or rice for a Yoruba classic.',
    tags: ['Nigerian', 'vegetarian-option', 'spicy'],
  },
  {
    dish: 'Moi Moi',
    recipe: 'Blend black-eyed beans with peppers, onions, and spices. Steam in leaves or tins. Serve as a side with jollof rice or alone as a snack.',
    tags: ['Nigerian', 'vegetarian', 'gluten-free'],
  },
  {
    dish: 'Pepper Soup',
    recipe: 'Simmer goat, fish, or chicken with habanero, utazi leaves, and spices. Spicy and brothy, perfect with yam or as a standalone sipping soup.',
    tags: ['Nigerian', 'spicy', 'gluten-free'],
  },
  {
    dish: 'Akara',
    recipe: 'Blend black-eyed peas with onions, peppers, and spices. Deep-fry into crispy fritters. A breakfast or snack staple, served with pap or alone.',
    tags: ['Nigerian', 'vegetarian', 'street-food'],
  },
  {
    dish: 'Ogbono Soup',
    recipe: 'Cook ogbono seeds with palm oil, vegetables, and fish or meat. Thick and slimy, pair with eba or fufu for a rich, nutty Nigerian soup.',
    tags: ['Nigerian', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Nkwobi',
    recipe: 'Cook cow foot with palm oil, ugba, and spices. Season with ehuru and utazi for aroma. Serve in a spicy, oily sauce as a savory delicacy.',
    tags: ['Nigerian', 'spicy', 'Igbo'],
  },
  {
    dish: 'Banga Soup',
    recipe: 'Extract juice from palm nuts, cook with fish, beef, and spices. Add scent leaves for flavor. Serve with starch or fufu, a southern Nigerian favorite.',
    tags: ['Nigerian', 'gluten-free', 'nutty'],
  },
  {
    dish: 'Afang Soup',
    recipe: 'Cook afang leaves with waterleaf, palm oil, periwinkle, and fish. Rich and spicy, serve with pounded yam or fufu, popular in Calabar.',
    tags: ['Nigerian', 'gluten-free', 'seafood'],
  },
  {
    dish: 'Okra Soup',
    recipe: 'Cook okra with palm oil, fish, meat, and peppers. Slimy and flavorful, serve with eba or semo. A versatile Nigerian dish with regional variations.',
    tags: ['Nigerian', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Puff Puff',
    recipe: 'Mix flour, sugar, yeast, and water into a batter. Deep-fry into golden balls. Sweet and fluffy, a popular Nigerian street snack.',
    tags: ['Nigerian', 'vegetarian', 'street-food'],
  },
  {
    dish: 'Edikang Ikong',
    recipe: 'Cook ugu and waterleaf with fish, beef, and palm oil. Add periwinkle for depth. Serve with fufu, a rich Calabar vegetable soup.',
    tags: ['Nigerian', 'gluten-free', 'seafood'],
  },
  {
    dish: 'Oha Soup',
    recipe: 'Cook oha leaves with cocoyam, meat, and dried fish. Thick and savory, serve with fufu or garri, a beloved Igbo delicacy.',
    tags: ['Nigerian', 'gluten-free', 'Igbo'],
  },
  {
    dish: 'Gizdodo',
    recipe: 'Fry chicken gizzards and plantain, toss in peppered sauce. Sweet, spicy, and savory, serve as a side or main dish, popular at parties.',
    tags: ['Nigerian', 'spicy', 'side-dish'],
  },
  {
    dish: 'Eba',
    recipe: 'Boil water, stir in garri to form a smooth dough. Serve with egusi or okra soup. A staple swallow, simple yet satisfying.',
    tags: ['Nigerian', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Ofada Rice',
    recipe: 'Cook local brown rice with palm oil-based ofada sauce, made with peppers, locust beans, and assorted meats. Serve with fried plantain.',
    tags: ['Nigerian', 'gluten-free', 'spicy'],
  },
  {
    dish: 'Ukodo',
    recipe: 'Cook yam and unripe plantain with goat meat, peppers, and spices. A spicy Urhobo soup, often served at festive gatherings.',
    tags: ['Nigerian', 'spicy', 'Urhobo'],
  },
  {
    dish: 'Ikokore',
    recipe: 'Grate water yam, cook with fish, peppers, and palm oil. A thick Ijebu dish, serve with cold water for a peppery, savory meal.',
    tags: ['Nigerian', 'gluten-free', 'Ijebu'],
  },
  {
    dish: 'Bitterleaf Soup',
    recipe: 'Cook bitterleaf with cocoyam, fish, and meat. Add egusi for thickness. Serve with fufu, a rich and slightly bitter Igbo soup.',
    tags: ['Nigerian', 'gluten-free', 'Igbo'],
  },
  {
    dish: 'Fisherman Soup',
    recipe: 'Cook fresh fish, prawns, and periwinkle with yam, peppers, and spices. A Rivers State delicacy, serve with yam or plantain.',
    tags: ['Nigerian', 'seafood', 'spicy'],
  },
  {
    dish: 'Vegetable Soup (Edikaikong)',
    recipe: 'Cook ugu and waterleaf with fish, beef, and palm oil. Add periwinkle for depth. Serve with fufu, a rich Calabar vegetable soup.',
    tags: ['Nigerian', 'gluten-free', 'seafood'],
  },
  {
    dish: 'Asun',
    recipe: 'Grill goat meat, toss in spicy pepper sauce with onions. A smoky, fiery dish, often served as a snack or side at gatherings.',
    tags: ['Nigerian', 'spicy', 'street-food'],
  },
  {
    dish: 'Ofe Nsala',
    recipe: 'Cook chicken or fish with yam, peppers, and utazi leaves. A light, spicy Igbo soup, often served with pounded yam or fufu.',
    tags: ['Nigerian', 'gluten-free', 'Igbo'],
  },
  {
    dish: 'Ewedu Soup',
    recipe: 'Cook jute leaves with locust beans and potash. Blend smooth, serve with amala or fufu, often paired with gbegiri and stew.',
    tags: ['Nigerian', 'vegetarian', 'Yoruba'],
  },
  {
    dish: 'Gbegiri Soup',
    recipe: 'Cook blended beans with palm oil, peppers, and spices. Creamy and mild, serve with amala or as part of abula with ewedu.',
    tags: ['Nigerian', 'vegetarian', 'Yoruba'],
  },
  {
    dish: 'Obe Ata',
    recipe: 'Cook tomatoes, peppers, and onions into a thick stew. Add meat or fish for flavor. Serve with rice or swallow, a Yoruba classic.',
    tags: ['Nigerian', 'gluten-free', 'spicy'],
  },
  {
    dish: 'Isi Ewu',
    recipe: 'Cook goat head with palm oil, ugba, and spices. Spicy and rich, serve as a delicacy with drinks, popular in Igbo culture.',
    tags: ['Nigerian', 'spicy', 'Igbo'],
  },
  {
    dish: 'Miyan Kuka',
    recipe: 'Cook baobab leaves with dried okra, fish, and spices. A Hausa staple, serve with tuwo shinkafa, nutty and slightly tangy.',
    tags: ['Nigerian', 'gluten-free', 'Hausa'],
  },
  {
    dish: 'Tuwo Shinkafa',
    recipe: 'Boil rice flour into a thick, smooth paste. Serve with miyan kuka or egusi soup, a northern Nigerian staple, soft and filling.',
    tags: ['Nigerian', 'gluten-free', 'Hausa'],
  },
  {
    dish: 'Kilishi',
    recipe: 'Thinly slice beef, season with spices, and sun-dry. Grill lightly for smoky flavor. A Hausa jerky, spicy and chewy, perfect as a snack.',
    tags: ['Nigerian', 'spicy', 'Hausa'],
  },
  {
    dish: 'Chin Chin',
    recipe: 'Mix flour, sugar, milk, and butter into a dough. Cut into small pieces and deep-fry until crispy. A sweet Nigerian snack.',
    tags: ['Nigerian', 'vegetarian', 'sweet'],
  },
  {
    dish: 'Ekpang Nkukwo',
    recipe: 'Wrap grated cocoyam and water yam in cocoyam leaves, cook with fish, periwinkle, and palm oil. A Calabar delicacy, rich and spicy.',
    tags: ['Nigerian', 'gluten-free', 'seafood'],
  },
  {
    dish: 'Ofe Owerri',
    recipe: 'Cook assorted meats with vegetables, palm oil, and thickeners like cocoyam. A hearty Igbo soup, serve with fufu or garri.',
    tags: ['Nigerian', 'gluten-free', 'Igbo'],
  },
  {
    dish: 'Owo Soup',
    recipe: 'Cook starch with palm oil, fish, and peppers. A thick Urhobo soup, serve with boiled yam or plantain, spicy and savory.',
    tags: ['Nigerian', 'gluten-free', 'Urhobo'],
  },
  {
    dish: 'Dodo',
    recipe: 'Slice ripe plantain and fry until golden. Sweet and caramelized, serve as a side with rice or stew, a Nigerian favorite.',
    tags: ['Nigerian', 'vegetarian', 'sweet'],
  },
  {
    dish: 'Masa',
    recipe: 'Soak rice, blend with yeast and spices, ferment, and fry into pancakes. A Hausa breakfast, serve with honey or stew.',
    tags: ['Nigerian', 'vegetarian', 'Hausa'],
  },
  {
    dish: 'Peppered Snail',
    recipe: 'Clean snails, cook with peppers, onions, and spices. Spicy and chewy, serve as a side or main, popular in Nigerian cuisine.',
    tags: ['Nigerian', 'spicy', 'seafood'],
  },
  {
    dish: 'Fufu',
    recipe: 'Boil cassava and plantain, pound into a smooth dough. Serve with egusi or okra soup, a staple swallow across Nigeria.',
    tags: ['Nigerian', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Yam Porridge',
    recipe: 'Cook yam with palm oil, peppers, fish, and vegetables. A savory, one-pot dish, often enriched with spinach or scent leaves.',
    tags: ['Nigerian', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Abacha',
    recipe: 'Soak cassava strips, mix with ugba, palm oil, and spices. A cold Igbo salad, serve with fish or garden egg.',
    tags: ['Nigerian', 'gluten-free', 'Igbo'],
  },
  {
    dish: 'Ugba',
    recipe: 'Ferment oil bean seeds, mix with palm oil, peppers, and fish. A spicy Igbo side dish, often paired with abacha or nkwobi.',
    tags: ['Nigerian', 'spicy', 'Igbo'],
  },
  {
    dish: 'Akamu',
    recipe: 'Ferment corn, blend into a paste, cook with water into a smooth pap. Serve with akara or milk, a breakfast staple.',
    tags: ['Nigerian', 'vegetarian', 'breakfast'],
  },
  {
    dish: 'Ofe Akwu',
    recipe: 'Cook palm nut juice with beef, fish, and peppers. A stew-like Igbo dish, serve with rice or swallow, rich and flavorful.',
    tags: ['Nigerian', 'gluten-free', 'Igbo'],
  },
  {
    dish: 'Egusi Ijebu',
    recipe: 'Cook egusi with minimal water, palm oil, fish, and peppers. Thicker than regular egusi, serve with fufu, an Ijebu specialty.',
    tags: ['Nigerian', 'gluten-free', 'Ijebu'],
  },
  {
    dish: 'Ogiri Okpei Soup',
    recipe: 'Cook locust beans with fish, meat, and peppers. A pungent Igbo soup, serve with fufu or eba, rich and aromatic.',
    tags: ['Nigerian', 'gluten-free', 'Igbo'],
  },
  {
    dish: 'Boli',
    recipe: 'Roast plantain over an open flame until soft and smoky. Serve with groundnut or pepper sauce, a popular Nigerian street food.',
    tags: ['Nigerian', 'vegetarian', 'street-food'],
  },
  {
    dish: 'Adalu',
    recipe: 'Cook beans and corn together with palm oil and peppers. A Yoruba dish, serve as a main or side, hearty and flavorful.',
    tags: ['Nigerian', 'vegetarian', 'Yoruba'],
  },
  {
    dish: 'Obe Ilasa',
    recipe: 'Cook okra with locust beans, fish, and peppers. A Yoruba soup, serve with amala or fufu, slimy and spicy.',
    tags: ['Nigerian', 'gluten-free', 'Yoruba'],
  },
  {
    dish: 'Miyan Taushe',
    recipe: 'Cook pumpkin with spinach, peanuts, and meat. A Hausa soup, serve with tuwo shinkafa, creamy and slightly sweet.',
    tags: ['Nigerian', 'gluten-free', 'Hausa'],
  },
  {
    dish: 'Ogbono Ijebu',
    recipe: 'Cook ogbono seeds with minimal water, fish, and peppers. Thicker than regular ogbono, serve with fufu, an Ijebu specialty.',
    tags: ['Nigerian', 'gluten-free', 'Ijebu'],
  },
  {
    dish: 'Ukpo Ogede',
    recipe: 'Cook unripe plantain with palm oil, fish, and peppers. A thick Urhobo soup, serve with starch or yam, savory and spicy.',
    tags: ['Nigerian', 'gluten-free', 'Urhobo'],
  },
  {
    dish: 'Atama Soup',
    recipe: 'Cook atama leaves with palm nut juice, fish, and periwinkle. A Calabar delicacy, serve with fufu, rich and aromatic.',
    tags: ['Nigerian', 'gluten-free', 'seafood'],
  },
  {
    dish: 'Obe Egusi',
    recipe: 'Cook egusi with tomatoes, peppers, and meat. A Yoruba-style egusi stew, serve with rice or swallow, spicy and rich.',
    tags: ['Nigerian', 'gluten-free', 'Yoruba'],
  },
  {
    dish: 'Ogiri Soup',
    recipe: 'Cook fermented melon seeds with fish, meat, and peppers. A pungent Igbo soup, serve with fufu or eba, rich and spicy.',
    tags: ['Nigerian', 'gluten-free', 'Igbo'],
  },
  {
    dish: 'Ikokore Ijebu',
    recipe: 'Grate water yam, cook with fish, peppers, and palm oil. A thick Ijebu dish, serve with cold water, spicy and savory.',
    tags: ['Nigerian', 'gluten-free', 'Ijebu'],
  },
  {
    dish: 'Obe Owo',
    recipe: 'Cook starch with palm oil, fish, and peppers. A thick Urhobo stew, serve with boiled yam or plantain, spicy and savory.',
    tags: ['Nigerian', 'gluten-free', 'Urhobo'],
  },
  {
    dish: 'Obe Ila',
    recipe: 'Cook okra with locust beans, fish, and peppers. A Yoruba soup, serve with amala or fufu, slimy and spicy.',
    tags: ['Nigerian', 'gluten-free', 'Yoruba'],
  },
  {
    dish: 'Obe Onugbu',
    recipe: 'Cook bitterleaf with cocoyam, fish, and meat. Add egusi for thickness. Serve with fufu, a rich and slightly bitter Igbo soup.',
    tags: ['Nigerian', 'gluten-free', 'Igbo'],
  },
  {
    dish: 'Obe Efo',
    recipe: 'Cook spinach with palm oil, peppers, and fish or meat. A Yoruba stew, serve with rice or swallow, spicy and rich.',
    tags: ['Nigerian', 'gluten-free', 'Yoruba'],
  },
  {
    dish: 'Obe Egusi Ijebu',
    recipe: 'Cook egusi with minimal water, fish, and peppers. Thicker than regular egusi, serve with fufu, an Ijebu specialty.',
    tags: ['Nigerian', 'gluten-free', 'Ijebu'],
  },
  // Global Dishes
  {
    dish: 'Pizza Margherita',
    recipe: 'Top dough with tomato sauce, mozzarella, and basil. Bake until crust is golden. A classic Italian pizza, simple yet flavorful, served fresh.',
    tags: ['Italian', 'vegetarian', 'gluten-option'],
  },
  {
    dish: 'Sushi (Nigiri)',
    recipe: 'Shape vinegared rice, top with fresh fish (e.g., tuna, salmon). Serve with soy sauce, wasabi, and ginger. Japanese delicacy, light and elegant.',
    tags: ['Japanese', 'gluten-free', 'seafood'],
  },
  {
    dish: 'Pad Thai',
    recipe: 'Stir-fry rice noodles with shrimp, tofu, egg, bean sprouts, and peanuts. Season with tamarind, fish sauce, and chili. Thai classic, sweet and tangy.',
    tags: ['Thai', 'gluten-free-option', 'spicy'],
  },
  {
    dish: 'Tacos (Al Pastor)',
    recipe: 'Marinate pork in chili and pineapple, grill, and serve in corn tortillas with onions, cilantro, and lime. Mexican street food, vibrant and zesty.',
    tags: ['Mexican', 'gluten-free', 'spicy'],
  },
  {
    dish: 'Butter Chicken',
    recipe: 'Cook chicken in a creamy tomato sauce with butter, cream, and spices (garam masala, cumin). Serve with naan or rice. Indian comfort food.',
    tags: ['Indian', 'gluten-free-option', 'spicy'],
  },
  {
    dish: 'Pasta Carbonara',
    recipe: 'Toss spaghetti with egg, pecorino, guanciale, and black pepper. Creamy without cream, this Italian dish is rich and savory, served al dente.',
    tags: ['Italian', 'dairy', 'hearty'],
  },
  {
    dish: 'Falafel',
    recipe: 'Blend chickpeas with herbs, spices, and onion. Fry into crispy balls. Serve in pita with tahini, lettuce, and tomatoes. Middle Eastern favorite.',
    tags: ['Middle Eastern', 'vegan', 'gluten-free-option'],
  },
  {
    dish: 'Dim Sum (Shumai)',
    recipe: 'Fill wonton wrappers with shrimp, pork, and mushrooms. Steam until tender. Serve with soy sauce and chili oil. Chinese bite-sized delight.',
    tags: ['Chinese', 'seafood', 'steamed'],
  },
  {
    dish: 'Paella',
    recipe: 'Cook rice with saffron, seafood, chicken, and vegetables in a wide pan. Spanish classic, vibrant and aromatic, served family-style.',
    tags: ['Spanish', 'gluten-free', 'seafood'],
  },
  {
    dish: 'Beef Pho',
    recipe: 'Simmer beef broth with star anise, ginger, and spices. Add rice noodles, thin beef slices, and herbs. Vietnamese soup, fragrant and warming.',
    tags: ['Vietnamese', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Ramen',
    recipe: 'Simmer pork or chicken broth with miso or soy sauce. Add noodles, seaweed, egg, and pork slices. Japanese comfort food, rich and savory.',
    tags: ['Japanese', 'hearty', 'noodles'],
  },
  {
    dish: 'Biryani',
    recipe: 'Cook basmati rice with spices, saffron, and marinated chicken or lamb. Layer with fried onions and herbs. Indian dish, aromatic and flavorful.',
    tags: ['Indian', 'gluten-free', 'spicy'],
  },
  {
    dish: 'Hummus',
    recipe: 'Blend chickpeas, tahini, lemon juice, garlic, and olive oil. Serve with pita bread or vegetables. Creamy Middle Eastern dip, nutty and tangy.',
    tags: ['Middle Eastern', 'vegan', 'gluten-free-option'],
  },
  {
    dish: 'Tom Yum',
    recipe: 'Simmer shrimp, lemongrass, galangal, and chili in a spicy, sour broth. Add mushrooms and lime juice. Thai soup, vibrant and aromatic.',
    tags: ['Thai', 'gluten-free', 'spicy'],
  },
  {
    dish: 'Ceviche',
    recipe: 'Marinate fresh fish in lime juice, mix with onions, cilantro, and chili. Serve chilled. Peruvian dish, refreshing and tangy.',
    tags: ['Peruvian', 'gluten-free', 'seafood'],
  },
  {
    dish: 'Moussaka',
    recipe: 'Layer eggplant, minced meat, and béchamel sauce. Bake until golden. Greek dish, hearty and creamy, served with salad.',
    tags: ['Greek', 'hearty', 'dairy'],
  },
  {
    dish: 'Peking Duck',
    recipe: 'Roast duck until crispy, serve with pancakes, hoisin sauce, and scallions. Chinese delicacy, rich and flavorful, often served in courses.',
    tags: ['Chinese', 'hearty', 'poultry'],
  },
  {
    dish: 'Chole Bhature',
    recipe: 'Cook chickpeas in spicy tomato gravy, serve with deep-fried bhature bread. North Indian dish, bold and satisfying.',
    tags: ['Indian', 'vegetarian', 'spicy'],
  },
  {
    dish: 'Feijoada',
    recipe: 'Cook black beans with pork, beef, and sausages. Serve with rice and orange slices. Brazilian stew, rich and hearty.',
    tags: ['Brazilian', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Gyoza',
    recipe: 'Fill dumpling wrappers with pork, cabbage, and garlic. Pan-fry until crispy. Serve with soy-vinegar dip. Japanese appetizer, savory and crunchy.',
    tags: ['Japanese', 'hearty', 'dumplings'],
  },
  {
    dish: 'Shakshuka',
    recipe: 'Poach eggs in a spicy tomato and pepper sauce with onions and cumin. Serve with bread. North African dish, vibrant and comforting.',
    tags: ['North African', 'vegetarian', 'spicy'],
  },
  {
    dish: 'Nasi Goreng',
    recipe: 'Stir-fry rice with chicken, shrimp, and kecap manis. Top with fried egg and prawn crackers. Indonesian dish, sweet and savory.',
    tags: ['Indonesian', 'gluten-free-option', 'spicy'],
  },
  {
    dish: 'Poutine',
    recipe: 'Top French fries with cheese curds and smother in gravy. Canadian comfort food, rich and indulgent, often served with extra toppings.',
    tags: ['Canadian', 'hearty', 'dairy'],
  },
  {
    dish: 'Banh Mi',
    recipe: 'Fill a baguette with pork, pickled carrots, cucumber, cilantro, and chili. Vietnamese sandwich, crunchy and flavorful with a French twist.',
    tags: ['Vietnamese', 'hearty', 'spicy'],
  },
  {
    dish: 'Laksa',
    recipe: 'Simmer coconut milk with curry paste, add noodles, chicken, and shrimp. Malaysian soup, creamy and spicy, garnished with herbs.',
    tags: ['Malaysian', 'gluten-free-option', 'spicy'],
  },
  {
    dish: 'Jerk Chicken',
    recipe: 'Marinate chicken in jerk spices, grill or bake until smoky. Serve with rice and peas. Jamaican dish, spicy and aromatic.',
    tags: ['Jamaican', 'gluten-free', 'spicy'],
  },
  {
    dish: 'Kebab',
    recipe: 'Skewer lamb or chicken, grill with spices. Serve with pita, yogurt sauce, and salad. Middle Eastern dish, juicy and flavorful.',
    tags: ['Middle Eastern', 'gluten-free-option', 'spicy'],
  },
  {
    dish: 'Rogan Josh',
    recipe: 'Cook lamb in a rich sauce of yogurt, tomatoes, and Kashmiri spices. Serve with rice or naan. Indian curry, aromatic and spicy.',
    tags: ['Indian', 'gluten-free-option', 'spicy'],
  },
  {
    dish: 'Goulash',
    recipe: 'Cook beef with paprika, onions, and peppers in a rich stew. Serve with noodles or dumplings. Hungarian dish, hearty and spicy.',
    tags: ['Hungarian', 'hearty', 'spicy'],
  },
  {
    dish: 'Bibimbap',
    recipe: 'Mix rice with vegetables, beef, and gochujang sauce. Top with a fried egg. Korean dish, colorful and flavorful, served in a hot bowl.',
    tags: ['Korean', 'gluten-free-option', 'spicy'],
  },
  {
    dish: 'Empanadas',
    recipe: 'Fill pastry with beef, chicken, or cheese, then bake or fry. Serve with chimichurri. Argentine dish, crispy and savory.',
    tags: ['Argentine', 'hearty', 'savory'],
  },
  {
    dish: 'Tikka Masala',
    recipe: 'Marinate chicken in yogurt and spices, grill, and simmer in tomato-cream sauce. Serve with rice or naan. Indian dish, creamy and spicy.',
    tags: ['Indian', 'gluten-free-option', 'spicy'],
  },
  {
    dish: 'Okonomiyaki',
    recipe: 'Mix cabbage, flour, and eggs into a batter, cook with pork or shrimp. Top with mayo and bonito flakes. Japanese savory pancake.',
    tags: ['Japanese', 'savory', 'seafood'],
  },
  {
    dish: 'Couscous Royale',
    recipe: 'Cook couscous with lamb, chicken, and vegetables in a spiced broth. Serve with harissa. Moroccan dish, hearty and aromatic.',
    tags: ['Moroccan', 'hearty', 'spicy'],
  },
  {
    dish: 'Pho Ga',
    recipe: 'Simmer chicken broth with ginger, star anise, and spices. Add rice noodles, chicken, and herbs. Vietnamese soup, light and fragrant.',
    tags: ['Vietnamese', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Katsu Curry',
    recipe: 'Bread and fry chicken or pork cutlet, serve with Japanese curry sauce and rice. Japanese dish, crispy and mildly spicy.',
    tags: ['Japanese', 'hearty', 'spicy'],
  },
  {
    dish: 'Pav Bhaji',
    recipe: 'Mash spiced vegetables (potatoes, peas) into a thick curry. Serve with buttered bread rolls. Indian street food, spicy and comforting.',
    tags: ['Indian', 'vegetarian', 'spicy'],
  },
  {
    dish: 'Borscht',
    recipe: 'Simmer beets, cabbage, and potatoes in a beef or vegetable broth. Serve with sour cream. Eastern European soup, vibrant and earthy.',
    tags: ['Eastern European', 'vegetarian-option', 'hearty'],
  },
  {
    dish: 'Tteokbokki',
    recipe: 'Cook cylindrical rice cakes in a spicy red pepper sauce with fish cakes. Korean street food, chewy and fiery.',
    tags: ['Korean', 'vegetarian-option', 'spicy'],
  },
  {
    dish: 'Churrasco',
    recipe: 'Grill skewered meats (beef, chicken) with chimichurri sauce. Serve with rice or potatoes. Brazilian BBQ, juicy and flavorful.',
    tags: ['Brazilian', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Samosa',
    recipe: 'Fill pastry with spiced potatoes, peas, or meat, then fry until crispy. Serve with chutney. Indian snack, flaky and flavorful.',
    tags: ['Indian', 'vegetarian-option', 'spicy'],
  },
  {
    dish: 'Massaman Curry',
    recipe: 'Cook beef or chicken in coconut milk with peanuts, potatoes, and tamarind. Thai curry, mildly spicy and aromatic.',
    tags: ['Thai', 'gluten-free', 'spicy'],
  },
  {
    dish: 'Pupusas',
    recipe: 'Fill cornmeal dough with beans, cheese, or pork, then grill. Serve with curtido. Salvadoran dish, hearty and tangy.',
    tags: ['Salvadoran', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Chicken Shawarma',
    recipe: 'Marinate chicken in spices, grill, and wrap in pita with garlic sauce, pickles, and lettuce. Middle Eastern street food, juicy and flavorful.',
    tags: ['Middle Eastern', 'hearty', 'spicy'],
  },
  {
    dish: 'Palak Paneer',
    recipe: 'Cook spinach with paneer cheese in a spiced creamy sauce. Serve with naan or rice. Indian dish, rich and vegetarian.',
    tags: ['Indian', 'vegetarian', 'gluten-free-option'],
  },
  {
    dish: 'Arepa',
    recipe: 'Grill cornmeal patties, fill with cheese, avocado, or shredded beef. Venezuelan dish, crispy outside, soft inside, versatile and delicious.',
    tags: ['Venezuelan', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Adobo',
    recipe: 'Cook chicken or pork in vinegar, soy sauce, garlic, and bay leaves. Serve with rice. Filipino dish, tangy and savory.',
    tags: ['Filipino', 'gluten-free', 'hearty'],
  },
  {
    dish: 'Baklava',
    recipe: 'Layer phyllo pastry with nuts and honey syrup, bake until crispy. Serve as a sweet dessert. Middle Eastern treat, rich and flaky.',
    tags: ['Middle Eastern', 'vegetarian', 'sweet'],
  },
  {
    dish: 'Rendang',
    recipe: 'Slow-cook beef in coconut milk, lemongrass, and spices until tender. Indonesian dish, rich and spicy, served with rice.',
    tags: ['Indonesian', 'gluten-free', 'spicy'],
  },
  {
    dish: 'Mapo Tofu',
    recipe: 'Cook tofu with ground pork, Sichuan peppercorns, and chili oil. Chinese dish, spicy and numbing, served with rice.',
    tags: ['Chinese', 'spicy', 'hearty'],
  },
  {
    dish: 'Croque Monsieur',
    recipe: 'Layer ham and cheese between bread, top with béchamel, and bake. French sandwich, creamy and indulgent, often served with salad.',
    tags: ['French', 'hearty', 'dairy'],
  },
  {
    dish: 'Doro Wat',
    recipe: 'Cook chicken in a spicy berbere sauce with onions and eggs. Serve with injera. Ethiopian stew, fiery and rich.',
    tags: ['Ethiopian', 'gluten-free', 'spicy'],
  },
  {
    dish: 'Koshari',
    recipe: 'Mix lentils, rice, pasta, and crispy onions, top with tomato sauce and chili. Egyptian street food, hearty and flavorful.',
    tags: ['Egyptian', 'vegetarian', 'street-food'],
  },
  {
    dish: 'Bunny Chow',
    recipe: 'Fill a hollowed-out bread loaf with curry (chicken, lamb, or vegetable). South African street food, spicy and filling.',
    tags: ['South African', 'hearty', 'spicy'],
  },
  {
    dish: 'Chicken Satay',
    recipe: 'Marinate chicken in turmeric and spices, grill on skewers, serve with peanut sauce. Indonesian dish, juicy and flavorful.',
    tags: ['Indonesian', 'gluten-free', 'spicy'],
  },
  {
    dish: 'Acaraje',
    recipe: 'Fry black-eyed pea fritters, split and fill with shrimp stew or vatapa. Brazilian street food, crispy and spicy.',
    tags: ['Brazilian', 'gluten-free', 'seafood'],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    await Food.deleteMany({});
    await Food.insertMany(seedData);
    console.log('Seeded 20 dishes successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seed error:', error);
  }
}

seedDatabase();