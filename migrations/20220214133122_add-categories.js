export const up = async (knex) => {
  await knex.schema.createTable("categories", (table) => {
    table.increments("id")
    table.text("name").notNullable()
  })
  await knex.schema.alterTable("products", (table) => {
    table.integer("category_id").notNullable()
    table.foreign("category_id").references("id").inTable("categories")
  })
}

export const down = async (knex) => {
  await knex.schema.alterTable("products", (table) => {
    table.dropForeign("category_id")
  })
  await knex.schema.dropTable("categories")
}
