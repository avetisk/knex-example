import express from "express"
import knex from "knex"
import { Model } from "objection"
import knexfile from "./knexfile.js"
import categoriesRoutes from "./src/routes/categories.js"

const app = express()
const port = process.env.PORT
const db = knex(knexfile)

Model.knex(db)

app.use(express.json())

categoriesRoutes({ app, db })

app.listen(port, () => console.log(`Listening on :${port}`))
