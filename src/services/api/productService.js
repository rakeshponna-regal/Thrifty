import Realm from 'realm';
import { createAsyncThunk } from '@reduxjs/toolkit';
import realmSchema, { sch_product } from '../../database/RealmConfig';
import { productJson } from './products';
import { useSelector } from 'react-redux';
import { productsList } from '../slices/selector';

export const storeProductsFromJson = createAsyncThunk(
    '/products',
    async (data, thunkAPI) => {
        try {

            let products = realmSchema.objects(sch_product)
            console.log("object",products.length)
            if(products.length == 0){
                productJson.map((data) => {
                    let prod = {
                        id: data.id,
                        title: data.title,
                        price: data.price,
                        description: data.description,
                        images: data.images,
                        creationAt: data.creationAt,
                        updatedAt: data.updatedAt,
                        seller_id: data.seller_id,
                        rating: {
                            rate: data.rating.rate,
                            count: data.rating.count
                        },
                        category: {
                            id: data.category.id,
                            name: data.category.name,
                            image: data.category.image,
                            creationAt: data.category.creationAt,
                            updatedAt: data.category.updatedAt
                        },
                    }
                    let res =  realmSchema.write(() => {
                          realmSchema.create(sch_product, prod);
                    })
                    // console.log(res)
                })
                let response  = {
                    status : "Success",
                    message: "Producst add successfully.",
                }
                return thunkAPI.fulfillWithValue(response);
            }else{
                let response  = {
                    status : "Failure",
                    message: `Failure to load due to data alrready exists ${products.length}`,
                }
                return thunkAPI.fulfillWithValue(response);
            }
        } catch (error) {
            console.log(error)
            const message = error
            return thunkAPI.rejectWithValue(message);
        }
    },
);


export const getProducts = createAsyncThunk(
    '/products',
    async (data, thunkAPI) => {
        try {
            let products = realmSchema.objects(sch_product)
            console.log("object",products.length)
            let response  = {
                status : "Success",
                message: "Product List.",
                data : products
            }
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            console.log(error)
            const message = error
            return thunkAPI.rejectWithValue(message);
        }
    },
);
export const getProductsJson = createAsyncThunk(
    '/productsJson',
    async (data, thunkAPI) => {
        try {
            let dataList = []
            productJson.map((data) => {
                let prod = {
                    id: data.id,
                    title: data.title,
                    price: data.price,
                    description: data.description,
                    images: data.images,
                    color: data.color,
                    size: data.size,
                    creationAt: data.creationAt,
                    updatedAt: data.updatedAt,
                    seller_id: data.seller_id,
                    rating: {
                        rate: data.rating.rate,
                        count: data.rating.count
                    },
                    category: {
                        id: data.category.id,
                        name: data.category.name,
                        image: data.category.image,
                        creationAt: data.category.creationAt,
                        updatedAt: data.category.updatedAt
                    },
                }
                // console.log("prod",prod)
                dataList.push(prod)
            })
            let response  = {
                status : "Success",
                message: "Product List.",
                data : dataList
            }
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            console.log(error)
            const message = error
            return thunkAPI.rejectWithValue(message);
        }
    },
);