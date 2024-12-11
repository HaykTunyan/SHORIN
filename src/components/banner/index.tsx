import React from 'react';
import styles from '@/styles/banner.module.scss';

const Banner = () => {
    return (
        <div className={styles.bannerWrapper}>
            <div className={styles.bannerContainer}>
                <div className={styles.bannerImgContainer}>
                    <img src="/images/banner.png" className={styles.bannerImgDesktop} alt=""/>
                    <img src="/images/bannerMobile.png" className={styles.bannerImgMobile} alt=""/>
                </div>
            </div>
        </div>
    );
};

export default Banner;
