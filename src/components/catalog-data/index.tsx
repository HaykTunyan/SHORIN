import React from 'react';
import styles from '@/styles/catalog.module.scss';
import {ICatalogItem} from '@/pages/catalog';
import CatalogDataRow from '@/components/catalog-data/catalog-data-row';
import {reformatIndexes} from '@/hooks/reformatIndexes';
import {getYearFromDate} from '@/hooks/getYearFromDate';
import {useRouter} from 'next/router';
import Image from 'next/image';

interface ICatalogData {
    catalogItems: ICatalogItem[],
}

const CatalogData = ({catalogItems}: ICatalogData) => {
    /**
     *  Catalog Data Hooks.
     */
    const router = useRouter();
    const splitArray = (arr: ICatalogItem[], chunkSize: number) => {
        const chunkedArray = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunkedArray.push(arr.slice(i, i + chunkSize));
        }
        return chunkedArray;
    };

    const numberOfItemsInRow = 8;

    const partnerChunks = splitArray(catalogItems, numberOfItemsInRow);
    const formatedChunks = reformatIndexes(partnerChunks);

    return (
        <div className={styles.catalogContainer}>
            {/* Desktop Version */}
            <div className={`${styles.desktopHight}`}>
                <div className={`${styles.imageContainer}`}>
                    {
                        formatedChunks.map((chunk, index) =>
                            <CatalogDataRow
                                chunk={chunk}
                                key={index}
                                index={index}
                            />
                        )}
                </div>
            </div>

            {/* Mobile Version */}
            <div className={styles.imageContainerMobile}>
                {
                    catalogItems.map((item: ICatalogItem, index) =>
                        <div
                            key={index} className={styles.flexItem}
                            onClick={() => router.push(`/catalog/${item.slug}`)}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    layout="responsive"
                                    width={500}
                                    height={300}
                                />
                            </div>
                            <div className={styles.mobileTop}>
                                <div className={`${styles.flexBetween} ${styles.listNetwork}`}>
                                    <a href={`#`} className={styles.titleInfo}>
                                        {item.name}
                                    </a>
                                    {
                                        item.year &&
                                        <span className={styles.timeInfo}>{getYearFromDate(item.year)}</span>
                                    }
                                </div>
                                <div className={styles.searchBottom}/>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CatalogData;
