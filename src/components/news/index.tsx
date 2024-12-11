import React from 'react';
import styles from '@/styles/news.module.scss';
import NewsBadge from '@/components/news/newsBadge';
import {ISingleNews} from '@/pages/foundation';

interface INews {
    news: ISingleNews[],
    count: number
}

const News = ({news, count}: INews) => {
    return (
        <div className={styles.newsWrapper}>
            <div className={styles.newsContainer}>
                <div className={styles.news}>
                    {
                        news.map((eachNews, index) =>
                            <NewsBadge
                                index={index}
                                key={index}
                                {...eachNews}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default News;
