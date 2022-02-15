import { Model } from "objection"
import ProductModel from "./Product.js"

class CategoryModel extends Model {
  static tableName = "categories"

  static get relationMappings() {
    return {
      products: {
        modelClass: ProductModel,
        relation: Model.HasManyRelation,
        join: {
          from: "categories.id",
          to: "products.category_id",
        },
      },
    }
  }
}

export default CategoryModel
