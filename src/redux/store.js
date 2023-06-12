import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './userSlice'
import CategoryReducer from './categorySlice'
import PackageReducer from './packageSlice'
import ListingReducer from './listingSlice'

export const store = configureStore({
    reducer: {
        user: UserReducer,
        categories: CategoryReducer,
        packages: PackageReducer,
        listing: ListingReducer
    }
})