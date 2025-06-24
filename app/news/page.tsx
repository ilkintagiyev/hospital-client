import News from '@/components/News'
import api from '@/constants/api'
import Main from '@/layout/Main'
import { INews } from '@/types/news'
import React from 'react'

const page = async () => {

    const news = await api.get<INews[]>("/news")

    return (
        <Main>
            <News news={news?.data || []} />
        </Main>
    )
}

export default page