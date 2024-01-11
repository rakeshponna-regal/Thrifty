export const thrifitiSchema = [
    {
        name: 'user_details',
        primaryKey: 'user_id',
        properties: {
            user_id: { type: 'int', default: 0 },
            first_name: 'string',
            last_name: 'string',
            user_email: 'string',
            user_password: 'string',
        },
    },
    {
        name: 'products',
        primaryKey: 'product_id',
        properties: {
            product_id: { type: 'int', default: 0 },
            user_id: 'int',
            product_name: 'string',
            product_description: 'string',
            size_type: 'string',
            size: 'string',
            image_urls: 'string',
            price: 'string',
            agency: 'string',
            brand: 'string',
            color: 'string',
        },
    },
    {
        name: 'product_images',
        properties: {
            product_image_id: { type: 'int', default: 0 },
            user_id: 'int',
            product_id: 'int',
            product_name: 'string',
            product_image: 'string',
        },
    }
]

export const USER_DETAILS_SCHEMA = 'user_details';
export const PRODUCTS_SCHEMA = 'products';
export const PRODUCT_IMAGES_SCHEMA = 'product_images';

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

export const products_schema = {
    name: PRODUCTS_SCHEMA,
    primaryKey: 'product_id',
    properties: {
        product_id: { type: 'int', default: 0 },
        user_id: 'int',
        product_name: 'string',
        product_description: 'string',
        size_type: 'string',
        size: 'string',
        image_urls: 'string',
        price: 'string',
        agency: 'string',
        brand: 'string',
        color: 'string',
    },
};

export const product_images_schema = {
    name: PRODUCT_IMAGES_SCHEMA,
    primaryKey: 'product_image_id',
    properties: {
        product_image_id: { type: 'int', default: 0 },
        user_id: 'int',
        product_id: 'int',
        product_name: 'string',
        imgage: 'string',
    },
};

const databaseOptions = {
    path: 'trifti.realm',
    schema: [user_details_schema, products_schema,product_images_schema],
    schemaVersion: 0, // optional
  };

