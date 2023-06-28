import { configureStore } from '@reduxjs/toolkit'
import UserReducer from './userSlice'
import CategoryReducer from './categorySlice'
import PackageReducer from './packageSlice'
import ListingReducer from './listingSlice'
import RequirementsReducer from './requirementsSlice'

export const store = configureStore({
    reducer: {
        user: UserReducer,
        categories: CategoryReducer,
        packages: PackageReducer,
        listing: ListingReducer,
        //to get rhe requiremnets from the add requirement page to checkout
        requirements: RequirementsReducer
    },
    //to avoid redux persist error
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['TYPE'],
            ignoredActionPaths: ['property'],
            ignoredPaths: ['reducer.property']
        }
    })
})