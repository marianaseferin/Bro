import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

const INGREDIENTS = [
  { name: "tomato", category: "VEGETABLE", emoji: "🍅" },
  { name: "onion", category: "VEGETABLE", emoji: "🧅" },
  { name: "garlic", category: "VEGETABLE", emoji: "🧄" },
  { name: "potato", category: "VEGETABLE", emoji: "🥔" },
  { name: "carrot", category: "VEGETABLE", emoji: "🥕" },
  { name: "spinach", category: "VEGETABLE", emoji: "🥬" },
  { name: "mushroom", category: "VEGETABLE", emoji: "🍄" },
  { name: "bell pepper", category: "VEGETABLE", emoji: "🫑" },
  { name: "broccoli", category: "VEGETABLE", emoji: "🥦" },
  { name: "zucchini", category: "VEGETABLE", emoji: "🥒" },
  { name: "sweet potato", category: "VEGETABLE", emoji: "🍠" },
  { name: "avocado", category: "FRUIT", emoji: "🥑" },
  { name: "lemon", category: "FRUIT", emoji: "🍋" },
  { name: "banana", category: "FRUIT", emoji: "🍌" },
  { name: "chickpeas", category: "LEGUME", emoji: "🫘" },
  { name: "lentils", category: "LEGUME", emoji: "🫘" },
  { name: "black beans", category: "LEGUME", emoji: "🫘" },
  { name: "rice", category: "GRAIN", emoji: "🍚" },
  { name: "pasta", category: "GRAIN", emoji: "🍝" },
  { name: "quinoa", category: "GRAIN", emoji: "🌾" },
  { name: "bread", category: "GRAIN", emoji: "🍞" },
  { name: "oats", category: "GRAIN", emoji: "🌾" },
  { name: "tofu", category: "PROTEIN", emoji: "🧆" },
  { name: "tempeh", category: "PROTEIN", emoji: "🧆" },
  { name: "almonds", category: "NUT", emoji: "🥜" },
  { name: "walnuts", category: "NUT", emoji: "🥜" },
  { name: "olive oil", category: "OIL", emoji: "🫒" },
  { name: "soy sauce", category: "SAUCE", emoji: "🫙" },
  { name: "coconut milk", category: "OTHER", emoji: "🥥" },
  { name: "cumin", category: "SPICE", emoji: "🌿" },
  { name: "paprika", category: "SPICE", emoji: "🌶️" },
  { name: "turmeric", category: "SPICE", emoji: "🌿" },
  { name: "basil", category: "HERB", emoji: "🌿" },
  { name: "cilantro", category: "HERB", emoji: "🌿" },
  { name: "parsley", category: "HERB", emoji: "🌿" },
] as const

const RECIPES = [
  {
    title: "Spiced Chickpea & Spinach Curry",
    description: "A warming, protein-packed curry ready in 25 minutes. Perfect for any weeknight.",
    timeMinutes: 25,
    servings: 4,
    calories: 320,
    tags: ["vegan", "high-protein", "quick", "comfort"],
    difficulty: "easy",
    steps: [
      "Heat olive oil in a large pan over medium heat.",
      "Sauté onion and garlic for 3 minutes until softened.",
      "Add cumin, turmeric, and paprika. Stir for 1 minute.",
      "Add chickpeas and tomatoes. Simmer 10 minutes.",
      "Stir in spinach until wilted. Season and serve with rice.",
    ],
    ingredients: [
      { name: "chickpeas", amount: "2 cans" },
      { name: "spinach", amount: "200g" },
      { name: "tomato", amount: "2 large" },
      { name: "onion", amount: "1 large" },
      { name: "garlic", amount: "3 cloves" },
      { name: "cumin", amount: "1 tsp" },
      { name: "turmeric", amount: "1 tsp" },
      { name: "olive oil", amount: "2 tbsp" },
      { name: "rice", amount: "for serving" },
    ],
  },
  {
    title: "Roasted Veggie Buddha Bowl",
    description: "Colorful, nourishing bowl with roasted vegetables, quinoa, and tahini dressing.",
    timeMinutes: 35,
    servings: 2,
    calories: 450,
    tags: ["vegan", "whole-foods", "meal-prep"],
    difficulty: "easy",
    steps: [
      "Preheat oven to 200°C. Chop sweet potato, broccoli, and bell pepper.",
      "Toss vegetables with olive oil, salt, and paprika. Roast 25 minutes.",
      "Cook quinoa according to package instructions.",
      "Assemble bowls: quinoa base, roasted veggies, avocado slices.",
      "Drizzle with tahini mixed with lemon juice and water.",
    ],
    ingredients: [
      { name: "sweet potato", amount: "1 large" },
      { name: "broccoli", amount: "1 head" },
      { name: "bell pepper", amount: "1" },
      { name: "quinoa", amount: "1 cup" },
      { name: "avocado", amount: "1" },
      { name: "olive oil", amount: "3 tbsp" },
      { name: "lemon", amount: "1" },
      { name: "paprika", amount: "1 tsp" },
    ],
  },
  {
    title: "Mushroom & Lentil Bolognese",
    description: "A hearty, meaty-tasting pasta sauce — 100% plant-based. Nobody will miss the beef.",
    timeMinutes: 40,
    servings: 4,
    calories: 380,
    tags: ["vegan", "comfort", "high-protein"],
    difficulty: "medium",
    steps: [
      "Finely chop mushrooms and cook in olive oil until golden brown, about 8 minutes.",
      "Add onion, garlic, and carrot. Cook 5 minutes.",
      "Add lentils, tomatoes, soy sauce, and 500ml water. Simmer 20 minutes.",
      "Season with basil, salt, and pepper.",
      "Serve over cooked pasta with fresh parsley.",
    ],
    ingredients: [
      { name: "mushroom", amount: "400g" },
      { name: "lentils", amount: "1 cup dry" },
      { name: "tomato", amount: "400g canned" },
      { name: "onion", amount: "1" },
      { name: "garlic", amount: "4 cloves" },
      { name: "carrot", amount: "1" },
      { name: "pasta", amount: "400g" },
      { name: "soy sauce", amount: "1 tbsp" },
      { name: "basil", amount: "fresh, handful" },
      { name: "parsley", amount: "to garnish" },
      { name: "olive oil", amount: "2 tbsp" },
    ],
  },
  {
    title: "Crispy Tofu Stir-Fry",
    description: "Golden crispy tofu with vibrant vegetables in a savory sauce. Ready in 20 minutes.",
    timeMinutes: 20,
    servings: 2,
    calories: 340,
    tags: ["vegan", "quick", "high-protein", "asian"],
    difficulty: "easy",
    steps: [
      "Press and cube tofu. Pan-fry in olive oil until golden on all sides.",
      "Remove tofu. In same pan, stir-fry bell pepper, broccoli, and garlic.",
      "Mix soy sauce, garlic, and a splash of water for sauce.",
      "Return tofu, pour sauce, toss to coat.",
      "Serve over rice with sesame seeds.",
    ],
    ingredients: [
      { name: "tofu", amount: "400g firm" },
      { name: "broccoli", amount: "1 small head" },
      { name: "bell pepper", amount: "1" },
      { name: "garlic", amount: "3 cloves" },
      { name: "soy sauce", amount: "3 tbsp" },
      { name: "olive oil", amount: "2 tbsp" },
      { name: "rice", amount: "for serving" },
    ],
  },
  {
    title: "Black Bean Tacos",
    description: "Quick and satisfying tacos with spiced black beans, avocado, and fresh toppings.",
    timeMinutes: 15,
    servings: 2,
    calories: 420,
    tags: ["vegan", "quick", "comfort", "mexican"],
    difficulty: "easy",
    steps: [
      "Heat black beans with cumin, paprika, and garlic for 5 minutes.",
      "Mash slightly to create a creamy texture.",
      "Warm tortillas in a dry pan.",
      "Fill tortillas with bean mixture, avocado, tomato, and cilantro.",
      "Squeeze lemon juice over top and serve.",
    ],
    ingredients: [
      { name: "black beans", amount: "1 can" },
      { name: "avocado", amount: "1" },
      { name: "tomato", amount: "2" },
      { name: "cilantro", amount: "handful" },
      { name: "lemon", amount: "1" },
      { name: "cumin", amount: "1 tsp" },
      { name: "paprika", amount: "1/2 tsp" },
      { name: "garlic", amount: "2 cloves" },
    ],
  },
]

async function seed() {
  console.log("Seeding database...")

  for (const ing of INGREDIENTS) {
    await db.ingredient.upsert({
      where: { name: ing.name },
      update: {},
      create: { name: ing.name, category: ing.category as "VEGETABLE", emoji: ing.emoji },
    })
  }
  console.log(`✅ ${INGREDIENTS.length} ingredients seeded`)

  for (const recipe of RECIPES) {
    const created = await db.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        timeMinutes: recipe.timeMinutes,
        servings: recipe.servings,
        calories: recipe.calories,
        tags: recipe.tags as string[],
        difficulty: recipe.difficulty,
        steps: recipe.steps,
      },
    })

    for (const ri of recipe.ingredients) {
      const ingredient = await db.ingredient.findUnique({ where: { name: ri.name } })
      if (ingredient) {
        await db.recipeIngredient.create({
          data: {
            recipeId: created.id,
            ingredientId: ingredient.id,
            amount: ri.amount,
          },
        })
      }
    }
  }
  console.log(`✅ ${RECIPES.length} recipes seeded`)
  console.log("Done!")
}

seed().catch(console.error).finally(() => db.$disconnect())
