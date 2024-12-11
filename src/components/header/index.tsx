import React from 'react';
import Navbar from '@/components/navbar';
import styles from '@/styles/header.module.scss';
import MobileNavbar from '@/components/navbar/mobileNavbar';

interface IHeader {
    navId: number
}

const Header = ({navId}: IHeader) => {
    const links = [
        {
            link: 'ШAF',
            href: ''
        },
        {
            link: 'ШОРИН',
            href: 'shorin'
        },
        {
            link: 'О ФОНДЕ',
            href: 'foundation'
        },
        {
            link: 'каталог',
            href: 'catalog'
        },
        // {
        //     link: 'профиль',
        //     href: 'profile'
        // }
    ];

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.headerContainer}>
                <Navbar navId={navId} links={links}/>
                <div className={styles.navbarPlaceHolder}></div>
                <MobileNavbar links={links}/>
            </div>
        </div>
    );
};

export default Header;
