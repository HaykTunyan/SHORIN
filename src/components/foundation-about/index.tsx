import React, {useEffect, FC} from 'react';
import styles from '@/styles/foundation.module.scss';
import {generateRandomNumber} from '@/hooks/generateRandomNumber';

// import { processHtmlString } from '@/global/innerText';

interface FoundationAboutProps {
    innerData?: string;
}

const FoundationAbout: FC<FoundationAboutProps> = ({innerData}) => {
    /**
     * Foundation About Hooks.
     */

    const topLimit = 250;
    const leftLimit = 250;
    const desktopMinWidth = 1280;

    useEffect(() => {
        const isDesktop = window.innerWidth >= desktopMinWidth;

        const links = document.querySelectorAll('a');

        links.forEach((link, index) => {
            if (link.href.includes('https://storage.yandexcloud.net')) {
                const img = document.createElement('img');
                img.src = link.href;
                img.alt = 'Related image';
                img.style.display = 'none';
                img.style.position = 'absolute';
                img.style.width = '250px';
                img.style.top = `${generateRandomNumber(0, topLimit)}px`;
                img.style.left = `${generateRandomNumber(0, leftLimit)}px`;
                img.style.pointerEvents = 'none';
                //@ts-ignore
                link.parentNode.insertBefore(img, link.nextSibling);

                isDesktop && link.addEventListener('mouseenter', () => {
                    img.style.display = 'block';
                });

                link.addEventListener('mouseleave', () => {
                    img.style.display = 'none';
                });

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                });
            }
        });

        return () => {
            links.forEach(link => {
                if (link.href.includes('https://storage.yandexcloud.net')) {
                    const img = link.nextSibling as HTMLImageElement;
                    if (img) {
                        link.removeEventListener('mouseenter', () => {
                            img.style.display = 'block';
                        });

                        link.removeEventListener('mouseleave', () => {
                            img.style.display = 'none';
                        });
                    }
                }
            });
        };
    }, [innerData]);

    return (
        <div className={styles.aboutWrapper}>
            <div className={styles.aboutContainer}>
                {/* For Generetion Inner HTML */}
                <div className={styles.aboutTxtBtn}>
                    {innerData && <div dangerouslySetInnerHTML={{__html: innerData}}/>}
                </div>
            </div>
        </div>
    );
};

export default FoundationAbout;
