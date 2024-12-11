import React, {ChangeEvent, FC, useState} from 'react';
import styles from '@/styles/catalog.module.scss';

interface BannerImageProps {
    tabButton: (number: number) => void;
    activeTab: number;
    handleSearchInput: (searchInput: string) => void,
    handleSort: (sortBy: string, direction: string) => void,
    searchInput: string
}

const sortElements = [
    {
        name: 'ГОД',
        direction: 'DESC',
        sort: 'year'
    },
    {
        name: 'ГОД',
        direction: 'ASC',
        sort: 'year'
    },
    {
        name: 'а-я',
        direction: 'DESC',
        sort: 'name'
    },
    {
        name: 'а-я',
        direction: 'ASC',
        sort: 'name'
    },
];

const BannerImage: FC<BannerImageProps> = ({
                                               tabButton,
                                               activeTab,
                                               handleSearchInput,
                                               searchInput,
                                               handleSort
                                           }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isSortDrpDwnOpened, setIsSortDrpDwnOpened] = useState(false);
    const [selectedSort, setSelectedSort] = useState({
        name: 'ГОД',
        direction: 'DESC',
    },);

    const toggleSearch = () => {
        setIsOpen(!isOpen);
    };

    const handleOneChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
        const currentInputValue = event.target.value;

        handleSearchInput(currentInputValue);
    };

    const handleChooseSort = (sort: string, direction: string, name: string) => {
        handleSort(sort, direction);
        setSelectedSort({
            name,
            direction,
        });
        setIsSortDrpDwnOpened(false);
    };

    const handleToggleSortDrpDwn = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        setIsSortDrpDwnOpened(!isSortDrpDwnOpened);
    };

    return (
        <>
            <div className={styles.catalogInputContainer}>
                <div className={styles.inputBanner}>
                    <div
                        className={`${styles.bannerSearch} ${
                            isOpen ? styles.searchSize : ' '
                        }`}
                    >
                        <div className={`${styles.searchContainer}`}>
                            <input
                                type='text'
                                className={`${styles.searchInput} ${
                                    isOpen ? styles.searchOpen : ' '
                                }`}
                                value={searchInput}
                                onChange={(event) => handleOneChangeInput(event)}
                                placeholder=''
                                autoFocus={isOpen}
                            />
                            <svg
                                className={styles.iconButton}
                                onClick={() => toggleSearch()}
                                width="38" height="38" viewBox="0 0 38 38" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_577_1511)">
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M20.5224 7.99503C23.9818 11.4544 23.9818 17.0632 20.5224 20.5225C17.0629 23.9819 11.4541 23.9819 7.99465 20.5225C4.53522 17.0632 4.53522 11.4544 7.99465 7.99503C11.4541 4.53565 17.0629 4.53565 20.5224 7.99503ZM22.6111 21.1981C26.1637 16.9322 25.9388 10.583 21.9366 6.58083C17.6961 2.34041 10.8209 2.34041 6.58043 6.58083C2.33994 10.8212 2.33994 17.6963 6.58043 21.9367C10.5823 25.9386 16.9309 26.1637 21.1968 22.6122L21.2294 22.6447L30.0043 31.4195L30.7114 32.1267L32.1257 30.7124L31.4186 30.0053L22.6436 21.2305L22.6111 21.1981Z"
                                          fill="#FF0000"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_577_1511">
                                        <rect width="38" height="38" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <div className={`${styles.flexCenter}  ${isOpen ? styles.btnMobileAnimate : ''} `}>
                            <button
                                type="button"
                                className={`${styles.buttonTab} ${
                                    activeTab === 1 ? styles.activeButton : ''
                                }`}
                                onClick={() => tabButton(0)}
                            >
                                СПИСОК{''}
                            </button>
                        </div>
                    </div>
                    <div
                        className={`${styles.bannerSearch}  ${
                            isOpen ? styles.filterSize : ''
                        }  `}
                    >
                        <div className={styles.flexCenter}>
                            <button
                                type="button"
                                className={`${styles.buttonTab} ${
                                    activeTab === 0 ? styles.activeButton : ''
                                }`}
                                onClick={() => tabButton(1)}
                            >
                                СЕТКА{' '}
                            </button>
                        </div>
                        <div
                            className={styles.flexBetween4}
                            onClick={handleToggleSortDrpDwn}
                        >
                            <span className={styles.subtitle}>{selectedSort.name}</span>
                            {
                                selectedSort.direction === 'DESC' ?
                                    <svg
                                        className={styles.bannerIcons}
                                        width="38" height="38" viewBox="0 0 38 38" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18.8304 33.9275V4.07031M18.8304 4.07031L9.5 13.4007M18.8304 4.07031L28.1607 13.4007"
                                            stroke="#FF0000" strokeWidth="2"
                                            strokeLinecap="square"/>
                                    </svg>
                                    : <svg
                                        className={`${styles.bannerIcons} ${styles.rotated}`}
                                        width="38" height="38" viewBox="0 0 38 38" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M18.8304 33.9275V4.07031M18.8304 4.07031L9.5 13.4007M18.8304 4.07031L28.1607 13.4007"
                                            stroke="#FF0000" strokeWidth="2" strokeLinecap="square"/>
                                    </svg>
                            }
                            {
                                isSortDrpDwnOpened && <div
                                    onClick={(e) => e.stopPropagation()}
                                    className={styles.drpDwn}
                                >
                                    {
                                        sortElements.map((el, i) =>
                                            <div
                                                key={i} className={styles.drpDwnItem}
                                                onClick={() => handleChooseSort(el.sort, el.direction, el.name)}
                                            >
                                                <span className={styles.itemTitle}>{el.name}</span>
                                                {
                                                    el.direction === 'DESC' ?
                                                        <svg
                                                            className={styles.bannerIcons}
                                                            width="38" height="38" viewBox="0 0 38 38" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M18.8304 33.9275V4.07031M18.8304 4.07031L9.5 13.4007M18.8304 4.07031L28.1607 13.4007"
                                                                stroke="#FF0000" strokeWidth="2"
                                                                strokeLinecap="square"/>
                                                        </svg>
                                                        : <svg
                                                            className={`${styles.bannerIcons} ${styles.rotated}`}
                                                            width="38" height="38" viewBox="0 0 38 38" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M18.8304 33.9275V4.07031M18.8304 4.07031L9.5 13.4007M18.8304 4.07031L28.1607 13.4007"
                                                                stroke="#FF0000" strokeWidth="2" strokeLinecap="square"/>
                                                        </svg>
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={styles.searchBottom}/>
            </div>
        </>
    );
};

export default BannerImage;
