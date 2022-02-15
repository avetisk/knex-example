import { Model } from "objection"
import CategoryModel from "./Category.js"

class ProductModel extends Model {
  static tableName = "products"

  static get relationMappings() {
    return {
      category: {
        modelClass: CategoryModel,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "products.category_id",
          to: "categories.id",
        },
      },
    }
  }
}

export default ProductModel
