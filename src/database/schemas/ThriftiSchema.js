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
            product_id: { type: 'int', default: 0  },
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