"use client"

import api from '@/constants/api'
import { setUser } from '@/store/slices/global'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Footer from './Footer'

const Main = ({ children }: any) => {
    const dispatch = useDispatch();
    const { user, updateRender } = useSelector((state: any) => state.global);

    useEffect(() => {
        api.get("/verify").then(res => {
            dispatch(setUser(res?.data))
        })
    }, [updateRender])

    return (
        <div className='bg-blue-50'>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Main