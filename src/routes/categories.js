import CategoryModel from "../models/Category.js"

const categoriesRoutes = ({ app, db }) => {
  // READ collection
  app.get("/categories", async (req, res) => {
    const categories = await CategoryModel.query()

    res.send(categories)
  })

  // READ collection products
  app.get("/categories/:categoryId/products", async (req, res) => {
    const {
      params: { categoryId },
      query,
    } = req
    const maxPrice = Number(query.maxPrice) || 0

    const category = await CategoryModel.query().findById(categoryId)

    if (!category) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    const productsQuery = category.$relatedQuery("products")

    if (maxPrice) {
      productsQuery.where("products.price", "<", maxPrice)
    }

    const products = await productsQuery

    res.send(products)
  })

  // READ single
  app.get("/categories/:categoryId", async (req, res) => {
    const {
      params: { categoryId },
    } = req

    const category = await CategoryModel.query().findById(categoryId)

    if (!category) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    res.send(category)
  })

  // CREATE
  app.post("/categories", async (req, res) => {
    const {
      body: { name },
    } = req

    const category = await CategoryModel.query().insertAndFetch({ name })

    res.send(category)
  })

  // UPDATE
  app.put("/categories/:categoryId", async (req, res) => {
    const {
      params: { categoryId },
      body: { name },
    } = req

    const category = await CategoryModel.query().updateAndFetchById(
      categoryId,
      { name }
    )

    if (!category) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    const [updatedCategory] = await db("categories")
      .update({ name })
      .where({ id: categoryId })
      .returning("*")

    res.send(updatedCategory)
  })

  // DELETE
  app.delete("/categories/:categoryId", async (req, res) => {
    const {
      params: { categoryId },
    } = req

    const [category] = await db("categories").where({ id: categoryId })

    if (!category) {
      res.status(404).send({ error: "y a pas wesh" })

      return
    }

    await db("categories").delete().where({ id: categoryId })

    res.send({ status: "DELETED" })
  })
}

export default categoriesRoutes
