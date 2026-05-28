import React from 'react'
import Banner from '../Banner'
import Categories from '../Categories'
import BusinessListing from './business-listings/BusinessListing'
import Cities from '../Cities'

const Home = () => {
    return (
        <>
            <Banner />
            <Categories />
            <Cities />
            <BusinessListing limit={6} hideFilters={true} hidePagination={true} showViewAll={true} />
        </>
    )
}

export default Home