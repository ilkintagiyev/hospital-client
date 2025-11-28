"use client"

import api from '@/constants/api'
import { setUser } from '@/store/slices/global'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import Spinner from '@/shared/Loading'

const Main = ({ children }: any) => {
    const dispatch = useDispatch();
    const { user, updateRender, loading } = useSelector((state: any) => state.global);

    useEffect(() => {
        api.get("/verify").then(res => {
            dispatch(setUser(res?.data))
        })
    }, [updateRender])

    return (
        <div className='flex flex-col min-h-screen bg-blue-50 relative'>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-white/50 backdrop-blur-sm">
                    <Spinner />
                </div>
            )}
            <Header />
            <main className={`flex-1 transition-all duration-300 ${loading ? "blur-sm pointer-events-none" : ""}`}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Main