import React, {useEffect, useState} from 'react';
import styles from '@/styles/catalog.module.scss';
import {ICatalogItem} from '@/pages/catalog';
import {getYearFromDate} from '@/hooks/getYearFromDate';
import Link from 'next/link';
import {generateRandomNumber} from '@/hooks/generateRandomNumber';

interface ICatalogNetWork {
    catalogItems: ICatalogItem[]
}

const CatalogNetWork = ({catalogItems}: ICatalogNetWork) => {
    /**
     *  Catalog Network
     */

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoverShowInfo, setHoverShowInfo] = useState<ICatalogItem | null>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const maxMobileSize = 1024;

    useEffect(() => {
        setIsMobile(window.innerWidth < maxMobileSize);
    }, []);

    const handleHoverOnImage = (item: any, index: number) => {
        if(isMobile) {
            return;
        }
        setHoveredIndex(index);
        setHoverShowInfo(item);
    };

    const modalMinWidth = 300;
    const modalTopMinWidth = 100;
    const modalTopMaxWidth = 400;
    const modalMaxWidth = 500;

    return (
        <>
            <div className={styles.catalogNetworkContainer}>
                <div className={styles.catalogNetwork}>
                    {catalogItems?.map((item, index) =>
                        <div
                            className={`${styles.flexBetween} ${styles.listNetwork}`}
                            key={item.id}
                            onMouseEnter={() => handleHoverOnImage(item, index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <Link
                                href={`catalog/${item.slug}`}
                                className={styles.titleInfo}
                            >
                                {item.name}
                            </Link>
                            {
                                item.year && <span className={styles.timeInfo}>{getYearFromDate(item.year)}</span>
                            }
                        </div>
                    )}
                    {hoveredIndex ===  hoverShowInfo?.index &&
                        <div className={styles.transparentModel}>
                            <div
                                className={styles.hoverDiv}
                                style={{
                                    top: `${generateRandomNumber(modalTopMinWidth, modalTopMaxWidth)}px`,
                                    left: `${generateRandomNumber(modalMinWidth, modalMaxWidth)}px`,
                                }}
                            >
                                <img
                                    src={hoverShowInfo.image}
                                    alt='Image'
                                    className={styles.hoverImageNet}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default CatalogNetWork;
