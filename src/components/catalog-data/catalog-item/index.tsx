import React, {useState} from 'react';
import styles from '@/styles/catalog.module.scss';
import Link from 'next/link';

interface ICatalogItem {
    item: any,
    chunkIndex: number,
    handleHoverOnImage: (item: any, chunkIndex: number) => void,
    setHoveredIndex: (x: any) => void
}

const CatalogItem = ({item, chunkIndex, handleHoverOnImage, setHoveredIndex}: ICatalogItem) => {
    const [isImageHovered, setIsImageHovered] = useState<boolean>(false);

    const handleImageHover = () => {
        setIsImageHovered(true);
        handleHoverOnImage(item, chunkIndex);
    };

    const handleImageBlur = () => {
        setIsImageHovered(false);
        setHoveredIndex(null);
    };

    return (
        <Link
            href={`/catalog/${item.slug}`}
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageBlur}
            className={styles.flexItem}
        >
            <img
                src={item.image}
                alt={item.name}
                className={` ${styles.itemImage} `}
            />
            {
                isImageHovered && <div className={styles.overlay}></div>
            }
            {
                isImageHovered && <div className={styles.overlayBorder}></div>
            }
        </Link>
    );
};

export default CatalogItem;
