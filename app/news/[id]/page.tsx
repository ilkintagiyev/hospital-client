import AboutNews from '@/components/AboutNews';
import api from '@/constants/api';
import Main from '@/layout/Main';
import React from 'react'

const page = async ({ params }: any) => {

  const newsResponse = await api.get(`/news/${params?.id}`);

  return (
    <Main>
      <AboutNews newsItem={newsResponse?.data} />
    </Main>
  )
}

export default page