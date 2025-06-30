import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    password: process.env.MYSQL_DB_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
  });

  try {
    await connection.execute("SET FOREIGN_KEY_CHECKS = 0");
    await connection.execute("TRUNCATE TABLE recipes");
    await connection.execute("TRUNCATE TABLE categories");
    await connection.execute("SET FOREIGN_KEY_CHECKS = 1");
    console.log("✅ Existing tables truncated.");

    const categories = [
      {
        title: "Italian",
        image_path:
          "https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
      },
      {
        title: "Indian",
        image_path:
          "https://img.freepik.com/photos-premium/drapeau-indien-agitant-texture-tissu_50039-1029.jpg?semt=ais_items_boosted&w=740",
      },
      {
        title: "Salad",
        image_path:
          "https://www.primalkitchen.com/cdn/shop/articles/20240905221054-pk-greek-salad-0214-min.jpg?v=1725643684",
      },
      {
        title: "Dessert",
        image_path:
          "https://fitrahma.com/wp-content/uploads/2023/11/dessert-sans-cuisson-express.png",
      },
    ];

    const categoryMap = new Map<string, number>();
    for (const category of categories) {
      const [result] = (await connection.execute(
        "INSERT INTO categories (title, image_path) VALUES (?, ?)",
        [category.title, category.image_path]
      )) as [mysql.ResultSetHeader, unknown];

      categoryMap.set(category.title, result.insertId);
    }

    console.log("✅ Categories seeded.");

    const recipes = [
      {
        title: "Spaghetti Carbonara",
        description: "Classic Italian pasta dish.",
        ingredients: "Pasta, Eggs, Pancetta, Pecorino Romano, Black Pepper",
        picture:
          "https://www.allrecipes.com/thmb/Vg2cRidr2zcYhWGvPD8M18xM_WY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11973-spaghetti-carbonara-ii-DDMFS-4x3-6edea51e421e4457ac0c3269f3be5157.jpg",
        category: "Italian",
      },
      {
        title: "Chicken Tikka Masala",
        description: "Creamy and flavorful Indian curry.",
        ingredients: "Chicken, Yogurt, Tomatoes, Cream, Spices",
        picture:
          "https://www.skinnytaste.com/wp-content/uploads/2011/06/Chicken-Tikka-Masala-15.jpg",
        category: "Indian",
      },
      {
        title: "Caesar Salad",
        description: "Fresh and crisp salad.",
        ingredients:
          "Romaine Lettuce, Croutons, Parmesan Cheese, Caesar Dressing",
        picture:
          "https://bakerbynature.com/wp-content/uploads/2025/01/Caesar-Salad-9.jpg",
        category: "Salad",
      },
      {
        title: "Tiramisu",
        description: "Classic Italian dessert.",
        ingredients: "Ladyfingers, Coffee, Mascarpone, Eggs, Cocoa Powder",
        picture:
          "https://pekis.net/sites/default/files/styles/wide/public/2025-04/tiramisu.jpg?itok=NUIMKu0t",
        category: "Dessert",
      },
    ];

    for (const recipe of recipes) {
      const categoryId = categoryMap.get(recipe.category);
      if (categoryId) {
        await connection.execute(
          "INSERT INTO recipes (title, description, ingredients, picture, category_id) VALUES (?, ?, ?, ?, ?)",
          [
            recipe.title,
            recipe.description,
            recipe.ingredients,
            recipe.picture,
            categoryId,
          ]
        );
      }
    }
    console.log("✅ Recipes seeded.");
    console.log("✨ Database seeded with initial data.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await connection.end();
  }
}

seed();
