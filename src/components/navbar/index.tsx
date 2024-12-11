import React from 'react';
import {useRouter} from 'next/router';
import classNames from 'classnames';
import styles from '@/styles/navbar.module.scss';

export interface ILink {
    link: string,
    href: string,
}

interface INavbar {
    navId: number,
    links: ILink[]
}

const Navbar = ({navId, links}: INavbar) => {
    const router = useRouter();

    return (
        <div className={styles.navbarContainer}>
            {links.map((link, index) =>
                <div
                    key={index}
                    onClick={() => router.push(`/${link.href}`)}
                    className={classNames(styles.navbarLinkContainer, {
                        [styles.active]: navId === index + 1,
                    })}
                >
                    <span className={styles.navbarLink}>{link.link}</span>
                </div>
            )}
        </div>
    );
};

export default Navbar;
