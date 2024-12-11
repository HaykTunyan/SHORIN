import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/news.module.scss';
import {convertDateFormat} from '@/hooks/covertDateFormat';

interface INewsBadge {
    index: number
    id: string,
    title: string,
    publication: string,
    slug: string,
    shortDescription?: string,
    image: string
}

const NewsBadge = ({image, title, publication, shortDescription, slug}: INewsBadge) => {
    const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleRedirectToSingleNews = () => {
        router.push(`/foundation/${slug}`);
    };

    const maxMobileSize = 1024;

    useEffect(() => {
        setIsMobile(window.innerWidth < maxMobileSize);
    }, []);

    return (
        <div
            onClick={handleRedirectToSingleNews}
            className={styles.newsBadgeContainer}
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
        >
            <div
                className={styles.newsCoverImgContainer}
                style={{
                    backgroundImage: `url(${image})`,
                }}
            >
            </div>
            {
                !isMobile && isImageHovered && <div className={styles.overlay}></div>
            }
            {
                !isMobile && isImageHovered && <div className={styles.overlayBorder}></div>
            }
            <span className={styles.newsName}>{title}</span>
            <span className={styles.newsDate}>{convertDateFormat(publication)}</span>
            <span
                className={styles.newsTitle}
            >{shortDescription}</span>
        </div>
    );
};

export default NewsBadge;
