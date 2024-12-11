import React from 'react';
import styles from '@/styles/news.module.scss';
import NewsBadge from '@/components/news/newsBadge';
import BtnPrimary from '@/components/buttons/primaryButton';
import {ISingleNews} from '@/pages/foundation';

interface IHomePageNews {
    news: ISingleNews[]
}

const HomePageNews = ({news}: IHomePageNews) => {
    return (
        <div className={styles.homePageNewsWrapper}>
            <div className={styles.newsContainer}>
                <div className={styles.news}>
                    {
                        news.map((eachNews, index) =>
                            <NewsBadge
                                key={index}
                                index={index}
                                {...eachNews}
                            />
                        )
                    }
                </div>
                <BtnPrimary
                    name={'ВСЕ НОВОСТИ'}
                    href={'/foundation'}
                />
            </div>
        </div>
    );
};

export default HomePageNews;
