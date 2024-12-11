import React, {useState} from 'react';
import styles from '@/styles/pagination.module.scss';
import {useKeenSlider} from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

interface IPagination {
    currentPage: number,
    totalPages: number,
    handleLoadPrevPage: () => void,
    handleSelectCurrentPage: (x: number) => void,
    handleLoadNextPage: () => void
}

const Pagination = ({
                        currentPage,
                        handleLoadPrevPage,
                        handleSelectCurrentPage,
                        totalPages,
                        handleLoadNextPage
                    }: IPagination) => {

    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [loaded, setLoaded] = useState<boolean>(false);
    if (currentSlide || loaded) {
    }
    const maxSlidesToSHow = 5;
    const [numbersSliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        drag: false,
        slides: {perView: maxSlidesToSHow},
        breakpoints: {
            '(max-width: 768px)': {
                slides: {perView: 3}
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        },
    });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'auto',
        });
    };

    const handleSlideSlider = (idx: number) => {
        handleSelectCurrentPage(idx);
        if (totalPages > maxSlidesToSHow) {
            instanceRef.current?.moveToIdx(idx - 1);
        }
        scrollToTop();
    };

    const handleSlideNext = () => {
        if (currentPage === totalPages) {
            instanceRef.current?.moveToIdx(0);
            scrollToTop();
            handleSelectCurrentPage(1);
            return;
        }

        handleLoadNextPage();
        if (totalPages > maxSlidesToSHow) {
            instanceRef.current?.next();
        }
        scrollToTop();
    };

    const handleSlideNPrev = () => {
        if (currentPage === 1) {
            scrollToTop();
            if (totalPages > maxSlidesToSHow) {
                instanceRef.current?.moveToIdx(totalPages - 1);
            }
            handleSelectCurrentPage(totalPages);
            return;
        }
        handleLoadPrevPage();
        if (totalPages > maxSlidesToSHow) {
            instanceRef.current?.prev();
        }
        scrollToTop();
    };

    return (
        <div className={styles.pages}>
            <svg
                onClick={handleSlideNPrev}
                className={`
                                    ${styles.prevPageArrow}
                                    `}
                width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 14.125L3 14.125M3 14.125L9.875 21M3 14.125L9.875 7.25" stroke="#FF0000" strokeWidth="2"
                      strokeLinecap="square"/>
            </svg>
            <div ref={numbersSliderRef} className={`keen-slider ${styles.pageNumbers}`}>
                {Array.from({length: totalPages}, (_, index) =>
                    <div
                        key={index + 1}
                        className={`keen-slider__slide ${styles.pageNumberWrapper}`}
                    >
                        <span
                            className={`${styles.pageNumber} ${currentPage === index + 1 ? styles.activePage : ''}`}
                            onClick={() => handleSlideSlider(index + 1)}
                        >
                            {index + 1}
                        </span>
                    </div>
                )}
            </div>
            <svg
                onClick={handleSlideNext}
                className={`
                                    ${styles.nextPageArrow}
                                    `}
                width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 13.875H25M25 13.875L18.125 7M25 13.875L18.125 20.75" stroke="#FF0000" strokeWidth="2"
                      strokeLinecap="square"/>
            </svg>
        </div>
    );
};

export default Pagination;
