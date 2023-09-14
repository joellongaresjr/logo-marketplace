const typeDefs = `
  type User {
    _id: ID!
    username: String
    email: String
    password: String
    address: String
    orders: [Order]
  }

  type Admin {
    _id: ID!
    username: String
    email: String
    password: String
    store: Store
  }

  type Order {
    _id: ID!
    purchaseDate: String
    products: [Product]
  }

  type Product {
    _id: ID!
    name: String
    description: String
    price: Float
    category: Category
    store: Store
    stockQuantity: Int
    purchaseQuantity: Int
    imageUrl: String
    featured: Boolean
    created_at: String
  }

  type Category {
    _id: ID!
    name: String
    description: String
    products: [Product]
  }

  type Auth {
    token: ID!
    user: User
    admin: Admin
  }

  type Checkout {
    session: ID
  }

  input ProductInput {
    name: String!
    price: Float!
    quantity: Int!
  }

  input OrderInput {
    customerName: String!
    products: [ProductInput!]!
  }


  type Store {
    _id: ID!
    name: String
    location: String
    shopImageUrl: String
    products: [Product]
    admin: Admin
  }

  input ProductPaginationInput {
    limit: Int!
    offset: Int!
  }

  input OrderProductInput {
    name: String
    price: Float
    quantity: Int
  }

  type Query {
    user: User
    admin: Admin
    users: [User]
    checkout(products: [ID]!): Checkout
    admins: [Admin]
    order(_id: ID!): Order
    orders: [Order]
    productsByCategory(category: ID): [Product]
    getProduct(_id: ID!): Product
    getProducts(limit: Int!, offset: Int!): [Product]
    getProductsFuzzy(query: String!): [Product]
    getFeaturedProducts: [Product]
    getCategory(id: ID!): Category
    getCategories: [Category]
    getStore(id: ID!): Store
    getStores: [Store]!
    getProductsByCategory(_id: ID!): [Product]
    getOrder(_id: ID!): Order
  }

  type Mutation {

    addUser(username: String!, email: String!, password: String!, address: String! ): Auth
    updateUser(username: String!, email: String!, password: String!): Auth
    addAdmin(username: String!, email: String!, password: String! ): Auth
    addAdminStore(name: String!, location: String!, admin: ID! ): Auth
    login(email: String!, password: String!): Auth
    addProduct(name: String!, description: String!, price: Float!, category: ID!, store: ID!, stockQuantity: Int!, imageUrl: String!): Product
    updateProduct(_id: ID!, quantity: Int!): Product
    removeProduct(_id: ID!): Product
    addCategory(name: String!, description: String!): Category
    updateCategory(_id: ID!, name: String!): Category
    removeCategory(_id: ID!): Category
    addStore(name: String!, location: String!, admin: ID! ): Store
    updateStore(_id: ID!, name: String!): Store
    removeStore(_id: ID!): Store
    addOrder(products: [ID]!): Order
  }
    
  `;

module.exports = typeDefs;
