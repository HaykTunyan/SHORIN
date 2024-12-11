import React, {useState} from 'react';
import {useRouter} from 'next/router';
import styles from '@/styles/navbar.module.scss';
import {ILink} from '@/components/navbar';

interface IMobileNavbar {
    links: ILink[]
}

const MobileNavbar = ({links}: IMobileNavbar) => {
    const [toggleMobileMenu, setToggleMobileMenu] = useState<boolean>(false);
    const router = useRouter();

    const handleToggleMobileMenu = () => {
        setToggleMobileMenu(!toggleMobileMenu);
        !toggleMobileMenu
            ? document?.querySelector('body')?.classList.add('bodyOverflowHidden')
            : document?.querySelector('body')?.classList.remove('bodyOverflowHidden');
    };

    const handleRedirectTo = (link: string) => {
        router.push(`/${link}`);
        handleToggleMobileMenu();
    };

    // const handleRedirectToHome = () => {
    //     document?.querySelector('body')?.classList.remove('bodyOverflowHidden');
    //     router.push('/');
    // };

    return (
        <div className={styles.mobileNavbarContainer}>
            <svg
                className={`
                ${styles.hamburger}
                ${toggleMobileMenu ? styles.rotated : ''}
                `}
                onClick={handleToggleMobileMenu}
                width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g clipPath='url(#clip0_586_388)'>
                    <path fillRule='evenodd' clipRule='evenodd'
                          d='M14.9829 -0.5V-1.5H12.9829V-0.5V12.5181H0.5H-0.5V14.5181H0.5H12.9829V27.5V28.5H14.9829V27.5V14.5181H28.5H29.5V12.5181H28.5H14.9829V-0.5Z'
                          fill='#FF3333'/>
                </g>
                <defs>
                    <clipPath id='clip0_586_388'>
                        <rect width='28' height='28' fill='white'/>
                    </clipPath>
                </defs>
            </svg>
            {
                toggleMobileMenu &&
                <div className={styles.mobileMenuContainer}>
                    <div
                        className={`
                        ${styles.mobileMenu}
                        ${toggleMobileMenu ? styles.menuHeight : undefined}
                        `}
                    >
                        <div className={`
                        ${styles.mobileMenuLinks}
                        `}>
                            {links.map((link, index) =>
                                <div
                                    key={index}
                                    onClick={() => handleRedirectTo(link.href)}
                                    className={styles.mobileMenuLink}
                                >
                                    <span>{link.link}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MobileNavbar;
