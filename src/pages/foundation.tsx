import React, {useState} from 'react';
import Layout from '@/components/layout';
import News from '@/components/news';
import {GetServerSideProps} from 'next';
import {getAllNews} from '@/pages/api/news/getAllNews';
import styles from '@/styles/news.module.scss';

export interface ISingleNews {
    id: string,
    title: string,
    publication: string,
    slug: string,
    description: string,
    shortDescription?: string,
    image: string
}

export interface INews {
    count: number,
    news: ISingleNews[]
}

interface IHome {
    news: INews
}

const Home = ({news}: IHome) => {
    const [offset, setOffset] = useState<number>(0);
    const [currentCount, setCurrentCount] = useState<number>(news.count);
    const offsetStep = 6;
    const totalPages = Math.ceil(currentCount / offsetStep);
    const [currentNews, setCurrentNews] = useState<ISingleNews[]>([...news.news]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navId = 3;

    const loadData = (currentOffset: number) => {
        getAllNews(currentOffset, offsetStep)
            .then(res => {
                setCurrentNews([...res?.news]);
                setCurrentCount(res?.count || 0);
                setOffset(currentOffset);
            });
    };

    const handleLoadNextPage = () => {
        setCurrentPage(prev => prev + 1);
        setOffset(prev => prev + offsetStep);
        loadData(offset + offsetStep);
    };

    const handleLoadPrevPage = () => {
        setCurrentPage(prev => prev - 1);
        setOffset(prev => prev - offsetStep);
        loadData(offset - offsetStep);
    };

    const handleSelectCurrentPage = (pageNumber: number) => {
        const pageOffset = (pageNumber - 1) * offsetStep;
        setCurrentPage(pageNumber);
        loadData(pageOffset);
    };

    return (
        <Layout
            currentPage={currentPage}
            totalPages={totalPages}
            handleLoadNextPage={handleLoadNextPage}
            handleLoadPrevPage={handleLoadPrevPage}
            handleSelectCurrentPage={handleSelectCurrentPage}
            navId={navId}
        >
            <div className={styles.newsWrapContainer}>
                <News
                    count={currentCount}
                    news={currentNews}
                />
            </div>
        </Layout>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const currentLimit = 6;
    const news = await getAllNews(0, currentLimit);

    return {
        props: {
            news
        },
    };
};
