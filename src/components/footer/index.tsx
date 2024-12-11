import React from 'react';
import styles from '@/styles/footer.module.scss';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.footerContainer}>
                <Link
                    href={'https://shorinprint.com/'}
                    target={'_blank'}
                    className={styles.footerLink}
                >
                    shorinprint.com
                </Link>
                {/*<Link*/}
                {/*    href={'https://instagram.com/shorin_print'}*/}
                {/*    target={'_blank'}*/}
                {/*    className={styles.footerLink}*/}
                {/*>*/}
                {/*    INSTAGRAM*/}
                {/*</Link>*/}
                <Link
                    href='mailto:info@shorinfond.com'
                    className={styles.footerLink}
                >
                    info@shorinfond.com
                </Link>
                <Link
                    href='tel:79117868983'
                    className={styles.footerLink}
                >
                    +79117868983
                </Link>
                {/*<img*/}
                {/*    src='/logos/footerLogo.png'*/}
                {/*    onClick={() => router.push('/')}*/}
                {/*    className={styles.footerLogo}*/}
                {/*    alt='Shaf logo'*/}
                {/*/>*/}
                {/*<div className={styles.footerInfo}>*/}
                {/*    <Link*/}
                {/*        href='tel:79117868983'*/}
                {/*        className={styles.footerLink}*/}
                {/*    >*/}
                {/*        +79117868983*/}
                {/*    </Link>*/}
                {/*    <Link*/}
                {/*        href='mailto:shorinprint@gmail.com'*/}
                {/*        className={styles.footerLink}*/}
                {/*    >*/}
                {/*        shorinprint@gmail.com*/}
                {/*    </Link>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Footer;
