import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/news.module.scss';
import { ISingleNews } from '@/pages/foundation';
import { useRouter } from 'next/router';
import { convertDateFormat } from '@/hooks/covertDateFormat';

interface ISingleNewsComp {
    singleNews: ISingleNews;
}

const SingleNews = ({ singleNews }: ISingleNewsComp) => {
    const { title, publication, image } = singleNews;
    const router = useRouter();
    const [processedDescription, setProcessedDescription] = useState<string>('');

    useEffect(() => {
        if (singleNews && singleNews.description) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(singleNews.description, 'text/html');
            const figures = doc.querySelectorAll('figure.media');

            figures.forEach(figure => {
                const oembed = figure.querySelector('oembed');
                if (oembed) {
                    const url = oembed.getAttribute('url');
                    if (url) {
                        const iframe = document.createElement('iframe');
                        iframe.className = styles.videoContainer; // Apply video container style
                        iframe.setAttribute('frameborder', '0');
                        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                        iframe.setAttribute('allowfullscreen', 'true');

                        if (url.includes('youtube.com') || url.includes('youtu.be')) {
                            iframe.setAttribute('src', url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/'));
                        } else if (url.includes('vimeo.com')) {
                            iframe.setAttribute('src', url.replace('vimeo.com', 'player.vimeo.com/video'));
                        }

                        oembed.replaceWith(iframe);
                    }
                }
            });

            setProcessedDescription(doc.body.innerHTML);
        }
    }, [singleNews]);

    if (!singleNews) {
        return <div className={styles.error}>No news data available</div>;
    }

    return (
        <div className={styles.newsContent}>
            <div className={styles.newsWrapper}>
                <div className={styles.newsContainer}>
                    <div className={styles.newsContainerInfo}>
                        <div className={styles.singleNewsInfo}>
                            <div className={styles.singleNewsNameDate}>
                                <span className={styles.singleNewsName}>{title}</span>
                                <span className={styles.newsDate}>{convertDateFormat(publication)}</span>
                            </div>
                            <div className={styles.singleNewsImageContainer}>
                                <Image
                                    src={image}
                                    alt={title}
                                    layout='responsive'
                                    width={700}
                                    height={475}
                                    className={styles.singleNewsImg}
                                    //@ts-ignore
                                    fetchpriority="high" // Corrected attribute
                                />
                            </div>
                        </div>
                        <div className={styles.singleNewsTextContainer}>
                            <div className={styles.singleNewsNameDateHideMobile}>
                                <span></span>
                                <svg
                                    onClick={() => router.back()}
                                    className={styles.backArrow}
                                    width='28' height='28' viewBox='0 0 28 28' fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    aria-label="Back"
                                >
                                    <path d='M25 14.125L3 14.125M3 14.125L9.875 21M3 14.125L9.875 7.25' stroke='#FF0000'
                                          strokeWidth='2' strokeLinecap='square' />
                                </svg>
                            </div>
                            <div
                                className={styles.singleNewsText}
                                dangerouslySetInnerHTML={{ __html: processedDescription }}
                            >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleNews;
