import React, {useEffect, useState} from 'react';
import styles from '@/styles/slider.module.scss';
import {useKeenSlider} from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import BtnSec from '@/components/buttons/secButton';
import {ISlide} from '@/pages';
import {getYearFromDate} from '@/hooks/getYearFromDate';
import {useRouter} from 'next/router';

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
}) {
    const disabled = props.disabled ? ' arrow--disabled' : '';
    return (
        <>
            <div
                className={`arrow ${
                    props.left ? 'arrow--left' : 'arrow--right'
                } ${disabled}`}
                onClick={props.onClick}
            ></div>
        </>
    );
}

interface ISliderComp {
    slides: ISlide[]
}

const Slider = ({slides}: ISliderComp) => {
    const router = useRouter();
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        slides: {perView: 1},
        breakpoints: {
            '(max-width: 1280px)': {
                slides: {perView: 1.05, spacing: 40, origin: 'center'},
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    const [numbersSliderRef, instanceRef2] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        slides: {perView: 2.2},
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    useEffect(() => {
        if (instanceRef.current && instanceRef2.current) {
            instanceRef.current.on('slideChanged', (slider) => {
                instanceRef2.current?.moveToIdx(slider.track.details.rel);
            });
            instanceRef2.current.on('slideChanged', (slider) => {
                instanceRef.current?.moveToIdx(slider.track.details.rel);
            });
        }
    }, [instanceRef, instanceRef2]);

    const handleRedirectToProduct = (link: string) => {
        link && router.push(`${link}`);
    };

    return (
        <div className={styles.sliderWrapper}>
            <div className={styles.sliderContainer}>
                <div className={styles.abstractBtn}>
                    <BtnSec
                        name={'СМОТРЕТЬ ВЕСЬ КАТАЛОГ'}
                        href={'/catalog'}
                        color={'#FF0000'}
                    />
                </div>
                <div ref={numbersSliderRef} className={`keen-slider ${styles.numbersContainer}`}>
                    {
                        slides.map((_, index) =>
                            <span
                                key={index}
                                className={'keen-slider__slide'}
                                style={index === currentSlide ? {color: 'red'} : undefined}
                            >{index + 1}</span>
                        )
                    }
                </div>
                <div ref={sliderRef} className='keen-slider'>
                    {
                        slides.map((slider, index) =>
                            <div key={index} className={`keen-slider__slide ${styles.sliderImgContainer}`}>
                                <div className={styles.sliderImgInfoContainer}>
                                    <img src={slider.image} className={styles.sliderImg}
                                         alt='life line'/>
                                    <div
                                        className={styles.sliderImgInfo}
                                        onClick={() => handleRedirectToProduct(slider.link)}
                                    >
                                        <span className={styles.slideName}>{slider.name && slider.name}</span>
                                        <span>{slider.year && getYearFromDate(slider.year)}</span>
                                    </div>
                                    {loaded && instanceRef.current &&
                                        <>
                                            <Arrow
                                                left
                                                onClick={(e: any) =>
                                                    e.stopPropagation() || instanceRef.current?.prev()
                                                }
                                                disabled={currentSlide === 0}
                                            />
                                            <Arrow
                                                onClick={(e: any) =>
                                                    e.stopPropagation() || instanceRef.current?.next()
                                                }
                                                disabled={
                                                    currentSlide ===
                                                    instanceRef.current.track.details.slides.length - 1
                                                }
                                            />
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className={styles.abstractBtnMob}>
                    <BtnSec
                        name={'СМОТРЕТЬ ВЕСЬ КАТАЛОГ'}
                        href={'/catalog'}
                        color={'#FF0000'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Slider;
