export const up = async (knex) => {
  await knex.schema.createTable("products", (table) => {
    table.increments("id")
    table.text("name").notNullable().unique()
    table.integer("price").notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("products")
}
