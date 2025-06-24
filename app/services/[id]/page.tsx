import Detail from '@/components/Service/Detail'
import api from '@/constants/api'
import Main from '@/layout/Main'
import React from 'react'

const Page = async ({ params }: any) => {
    const service = await api.get(`/services/${params.id}`)

    return (
        <Main>
            <Detail serviceData={service?.data || []} />
        </Main>
    )
}

export default Page
