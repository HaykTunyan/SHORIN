import React from 'react';
import Layout from '@/components/layout';
import SingleNews from '@/components/news/singleNews';
import {GetServerSideProps} from 'next';
import {getSingleNews} from '@/pages/api/news/getSingleNews';
import {ISingleNews} from '@/pages/foundation';

interface IHome {
    singleNews: ISingleNews
}

const Home = ({singleNews}: IHome) => {
    const navId = 3;

    return (
        <Layout navId={navId}>
            <SingleNews singleNews={singleNews}/>
        </Layout>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {

    const slug = context.query.slug as string;
    const singleNews = await getSingleNews(slug);

    return {
        props: {
            singleNews
        },
    };
};
