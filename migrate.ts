import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

async function migrate() {
  let connection;
  try {
    // Connect without specifying a database to create it if it doesn't exist
    connection = await mysql.createConnection({
      host: process.env.MYSQL_DB_HOST,
      user: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
    });

    await connection.execute(
      `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB_NAME}`
    );
    console.log(
      `✅ Database '${process.env.MYSQL_DB_NAME}' created or already exists.`
    );
    await connection.end();

    // Reconnect with the specified database
    connection = await mysql.createConnection({
      host: process.env.MYSQL_DB_HOST,
      user: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
    });

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        image_path VARCHAR(255)
      )
    `);
    console.log("✅ Categories table created or already exists.");

    await connection.execute(`
      CREATE TABLE IF NOT EXISTS recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        ingredients TEXT,
        picture VARCHAR(255),
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
      )
    `);
    console.log("✅ Recipes table created or already exists with category_id.");
    console.log("✨ Migration successful!");
  } catch (error) {
    console.error("❌ Error migrating database:", error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

migrate();
