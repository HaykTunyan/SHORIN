import React, {useState} from 'react';
import styles from '@/styles/about.module.scss';
import BtnPrimary from '@/components/buttons/primaryButton';

const About = () => {
    const [hoverState, setHoverState] = useState<{ [key: string]: boolean }>({
        hover1: false,
        hover2: false,
        hover3: false,
        hover4: false,
        hover5: false,
        hover6: false,
        hover7: false,
        hover8: false
    });

    const handleImageShow = (hoverKey: string) => {
        setHoverState(prevState => ({...prevState, [hoverKey]: true}));
    };

    const handleImageHide = (hoverKey: string) => {
        setHoverState(prevState => ({...prevState, [hoverKey]: false}));
    };

    return (
        <div className={styles.aboutWrapper}>
            <div className={styles.aboutContainer}>
                <div className={styles.aboutTxtBtn}>
                    <span className={styles.aboutText}>
                        {
                            hoverState.hover1 && <div className={styles.hoveredImg2}>
                                <img src="/images/hover/Shorin.png"  alt=""/>
                            </div>
                        }
                        {
                            hoverState.hover2 && <div className={styles.hoveredImg}>
                                <img src="/images/hover/insitut.png" alt=""/>
                            </div>
                        }
                        {
                            hoverState.hover3 && <div className={styles.hoveredImg3}>
                                <img src="/images/hover/pushkinskaya10.png"  alt=""/>
                            </div>
                        }
                        {
                            hoverState.hover4 && <div className={styles.hoveredImg3}>
                                <img src="/images/hover/sothebys.png" alt=""/>
                            </div>
                        }
                        {
                            hoverState.hover5 && <div className={styles.hoveredImg2}>
                                <img src="/images/hover/museum.png" alt=""/>
                            </div>
                        }
                        {
                            hoverState.hover6 && <div className={styles.hoveredImg6}>
                                <img src="/images/hover/honor.png"  alt=""/>
                            </div>
                        }
                        {
                            hoverState.hover7 && <div className={styles.hoveredImg7}>
                                <img src="/images/hover/bienale.png" alt=""/>
                            </div>
                        }
                        {
                            hoverState.hover8 && <div className={styles.hoveredImg6}>
                                <img src="/images/hover/bullandbear.png" alt=""/>
                            </div>
                        }
                        <span
                            className={styles.red}
                            onMouseEnter={() => handleImageShow('hover1')}
                            onMouseLeave={() => handleImageHide('hover1')}
                        >Дмитрий Шорин</span> учился на&nbsp;<span
                        onMouseEnter={() => handleImageShow('hover2')}
                        onMouseLeave={() => handleImageHide('hover2')}
                    ><span
                        className={styles.italicLight}>
                    художественно-графическом факультете </span>Педагогического
                    института </span> имени Горького в&nbsp;Омске (1987&ndash;1988), в&nbsp;Академии бытового обслуживания Омска
                    по&nbsp;специальности художник-проектировщик костюма (1988&ndash;1990). В&nbsp;1993&nbsp;году Шорин
                    вступил в&nbsp;Товарищество художников &laquo;Свободная культура&raquo;, занимавшее пространство Арт-центра
                    <span
                        className={styles.italicLight}
                        onMouseEnter={() => handleImageShow('hover3')}
                        onMouseLeave={() => handleImageHide('hover3')}
                    > &laquo;Пушкинская, 10&raquo;.</span> С&nbsp;1999&nbsp;года
                    его работы выставлялись на&nbsp;аукционах <span
                        onMouseEnter={() => handleImageShow('hover4')}
                        onMouseLeave={() => handleImageHide('hover4')}
                        className={styles.italicLight}> Sotheby&apos;s и&nbsp;Phillips
                    de&nbsp;Pury.</span> В&nbsp;2008&nbsp;году он&nbsp;стал самым
                    молодым художником, удостоенным персональной выставки в&nbsp;<span
                        className={styles.italicLight}
                            onMouseEnter={() => handleImageShow('hover5')}
                            onMouseLeave={() => handleImageHide('hover5')}
                        >Мраморном дворце Государственного
                    Русского музея.</span> Участник первой и&nbsp;третьей Московских биеннале современного искусства.
                    В&nbsp;2009&nbsp;году был номинирован на&nbsp;<span
                        className={styles.italicLight}
                        onMouseEnter={() => handleImageShow('hover6')}
                        onMouseLeave={() => handleImageHide('hover6')}
                    >премию Кандинского </span>
                    в&nbsp;категории &laquo;Проект Года&raquo;. В&nbsp;2013&nbsp;году его проект &laquo;I Believe In Angels&raquo;
                        был представлен на&nbsp;<span
                        onMouseEnter={() => handleImageShow('hover7')}
                        onMouseLeave={() => handleImageHide('hover7')}
                        className={styles.italicLight}
                    >55-й Венецианской биеннале. </span>
                    В&nbsp;2022&nbsp;году скульптуры Дмитрия <span
                        onMouseEnter={() => handleImageShow('hover8')}
                        onMouseLeave={() => handleImageHide('hover8')}
                        className={styles.italicLight}
                    > &laquo;Биржевые Символы
                    Бык и&nbsp;Медведь&raquo;</span> были установлены в&nbsp;Москва-Сити.
                    </span>
                    <BtnPrimary
                        name={'узнать больше'}
                        href={'/shorin'}
                    />
                </div>
            </div>
        </div>
    );
};

export default About;
