import React from 'react';
import Banner from '@/components/banner';
import About from '@/components/about';
import Slider from '@/components/slider';
import Layout from '@/components/layout';
import HomePageNews from '@/components/news/homePageNews';
import {GetServerSideProps} from 'next';
import {getAllNews} from '@/pages/api/news/getAllNews';
import {INews} from '@/pages/foundation';
import {getHomePageAboutText} from '@/pages/api/homePage/getHomePageAboutText';
import {getSlides} from '@/pages/api/homePage/getSlides';

export interface ISlide {
    id: string,
    name: string,
    year: string,
    image: string,
    link: string
}

interface IHome {
    news: INews,
    aboutText: string,
    slides: ISlide[]
}

const Home = ({news, aboutText, slides}: IHome) => {
    const navId = 1;

    return (
        <Layout navId={navId}>
            <Banner/>
            <About/>
            <Slider slides={slides}/>
            <HomePageNews news={news.news}/>
        </Layout>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const currentLimit = 3;
    const news = await getAllNews(0, currentLimit);
    const aboutText = await getHomePageAboutText();
    const slides = await getSlides();

    return {
        props: {
            news,
            aboutText,
            slides
        },
    };
};
