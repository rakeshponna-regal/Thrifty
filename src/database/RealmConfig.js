import Realm from 'realm';
Realm.THROW_ON_GLOBAL_REALM = true;

export const USER_DETAILS_SCHEMA = 'user_details';
export const PRODUCTS_SCHEMA = 'products';
export const PRODUCT_IMAGES_SCHEMA = 'product_images';
export const PRODUCT_REVIEW_SCHEMA = 'product_review';
export const USER_ADDRESS_SCHEMA = 'user_address';
export const USER_PAYMENT_SCHEMA = 'user_payment';
export const CART_ITEM_SCHEMA = 'cart_item';
export const ORDER_ITEMS_SCHEMA = 'order_items';
export const ORDER_DETAILS_SCHEMA = 'order_details';
export const PAYMENT_DETAILS_SCHEMA = 'payment_details';
export const PRODUCT_WISHLIST_SCHEMA = 'product_whishlist';
export const sch_product = 'Product';
export const sch_user = 'user';
export const sch_address = 'address';
export const sch_payment = 'payments';
export const sch_review = 'product_review';
export const sch_wishlist = 'whishlist';
export const sch_cart = 'cart';
export const sch_orders = 'orders';
export const sch_rating = 'rating';
export const sch_category = 'category';

export const Orders = {
  name: sch_orders,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    user_id: 'string',
    order_id: 'int',
    qty: 'int',
    status: 'string',
    total: 'double',
    payment_id: 'int',
    created_at: 'string'
  },
}

export const Cart = {
  name: sch_cart,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    cart_id: 'int',
    product_id: 'int',
    title: 'string',
    images: { type: 'list', objectType: 'string' },
    user_id: 'string',
    qty: 'int',
    price: 'double',
    created_at: 'string'
  },
}

export const WishList = {
  name: sch_wishlist,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    product_id: 'int',
    user_id: 'string',
    created_at: 'string'
  },
}

export const ReviewProduct = {
  name: sch_review,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    product_id: 'int',
    rating: 'int',
    user_id: 'string',
    comment: 'int',
    created_at: 'string'
  },
}

export const Payment = {
  name: sch_payment,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    user_id: 'string',
    payment_type: 'string',
    provider: 'string',
    account_no: 'string',
    expiry: 'string',
  },
}

export const Address = {
  name: sch_address,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    user_id: 'string',
    address_line1: 'string',
    address_line2: 'string',
    city: 'string',
    postal_code: 'string',
    country: 'string',
    mobile: 'string',
  },
}

export const User = {
  name: sch_user,
  primaryKey: 'id',
  properties: {
    id: 'string',
    first_name: 'string',
    last_name: 'string',
    email: 'string',
    password: 'string',
    role: 'string',
    avatar: 'string'
  },
}

export const Rating = {
  name: sch_rating,
  properties: {
    rate: 'float',
    count: 'int',
  },
};

export const Category = {
  name: sch_category,
  properties: {
    id: 'int',
    name: 'string',
    image: 'string',
    creationAt: 'string',
    updatedAt: 'string',
  },
};

export const Product = {
  name: sch_product,
  properties: {
    id: { type: 'int', indexed: true },
    title: 'string',
    price: 'float',
    description: 'string',
    images: { type: 'list', objectType: 'string' },
    creationAt: 'string',
    updatedAt: 'string',
    seller_id: 'int',
    rating:  sch_rating ,
    category : sch_category
  },
};

export const seller = {
  name :'seller',
  properties:{
    id:{type:'int',indexed:true},
    userId:'string',
    image:'string',
    rating:  sch_rating ,
  }
}


export const user_details_schema = {
  name: USER_DETAILS_SCHEMA,
  primaryKey: 'user_id',
  properties: {
    user_id: 'int',
    first_name: 'string',
    last_name: 'string',
    user_email: 'string',
    user_password: 'string',
  },
};

export const user_address_schema = {
  name: USER_ADDRESS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    user_id: 'int',
    address_line1: 'string',
    address_line2: 'string',
    city: 'string',
    postal_code: 'string',
    country: 'string',
    mobile: 'string',
  },
};

export const user_payment_schema = {
  name: USER_PAYMENT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    user_id: 'int',
    payment_type: 'string',
    provider: 'string',
    account_no: 'string',
    expiry: 'string',
  },
};


/* 
  PRODUCTS_SCHEMA  product_id = cart_item id = ORDER_ITEMS_SCHEMA id = ORDER_DETAILS_SCHEMA id
  ORDER_DETAILS_SCHEMA payment_id = id

*/
export const products_schema = {
  name: PRODUCTS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    title: 'string',
    price: 'float',
    description: 'string',
    images: 'list<string>',
    creationAt: 'string',
    updatedAt: 'string',
    rating: {
      type: 'object',
      properties: {
        rate: 'float',
        count: 'int',
      },
    },
    category: {
      name: 'Category',
      properties: {
        id: { type: 'int', indexed: true },
        name: 'string',
        image: 'string',
        creationAt: 'string',
        updatedAt: 'string',
      },
    },
  },
};

export const product_review_schema = {
  name: PRODUCT_REVIEW_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    product_id: 'int',
    rating: 'int',
    user_id: 'int',
    comment: 'int',
    created_at: 'int'
  },
};

export const cart_item_schema = {
  name: CART_ITEM_SCHEMA,
  primaryKey: 'cart_id',
  properties: {
    cart_id: { type: 'int', default: 0 },
    product_id: 'int',
    user_id: 'int',
    qty: 'int',
    price: 'double',
    created_at: 'int'
  },
};

export const product_wishlist_schema = {
  name: PRODUCT_WISHLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    product_id: 'int',
    user_id: 'int',
    created_at: 'int'
  },
};

export const order_items_schema = {
  name: ORDER_ITEMS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    order_id: 'int',
    product_id: 'int',
    user_id: 'int',
    qty: 'int',
    price: 'double',
    created_at: 'int'
  },
};

export const order_details_schema = {
  name: ORDER_DETAILS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    user_id: 'int',
    order_id: 'int',
    qty: 'int',
    total: 'double',
    payment_id: 'int',
    created_at: 'int'
  },
};

export const payment_details_schema = {
  name: PAYMENT_DETAILS_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    user_id: 'int',
    order_id: 'int',
    amount: 'int',
    provider: 'string',
    status: 'string',
    created_at: 'int'
  },
};

export const product_images_schema = {
  name: PRODUCT_IMAGES_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int', default: 0 },
    product_id: 'int',
    product_name: 'string',
    image_path: 'string',
    created_at: 'int'
  },
};

const realmConfig = {
  path: 'trifti.realm',
  schema: [Product, User, Address, WishList, ReviewProduct, Payment, Cart, Orders,Rating,Category],
  schemaVersion: 1,
};

const realmSchema = new Realm(realmConfig);
console.log(realmSchema.schema);

// module.exports = { Product, User, Address, WishList, ReviewProduct, Payment, Cart, Orders }
export default realmSchema;

