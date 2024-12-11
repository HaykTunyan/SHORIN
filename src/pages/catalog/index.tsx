import React, {useEffect, useState} from 'react';
import BannerImage from '@/components/banner-image';
import style from '@/styles/catalog.module.scss';
import CatalogData from '@/components/catalog-data';
import CatalogNetWork from '@/components/catalog-newtwork';
import Layout from '@/components/layout';
import {GetServerSideProps} from 'next';
import {getCatalogList} from '@/pages/api/catalog/getCatalogList';

export interface ICatalogItem {
    index: number,
    id: string,
    name: string,
    year: string,
    slug: string,
    image: string,
    material: string,
    width: string,
    height: string
}

interface ICatalogItems {
    catalogItems: ICatalogItem[],
    count: number
}

interface ICatalog {
    catalogItems: ICatalogItems
}

const Catalog = ({catalogItems}: ICatalog) => {
    /**
     *  Catalog Hooks.
     */

    const navId: number = 4;
    const [activeTab, setActiveTab] = useState<number>(1);
    const [searchInputValue, setSearchInputValue] = useState<string>('');
    const [sortBy, setSort] = useState<string>('year');
    const [direction, setDirection] = useState<string>('DESC');
    const [currentCatalogItems, setCurrentCatalogItems] = useState<ICatalogItem[]>([...catalogItems.catalogItems]);
    const numberOfLetterToStartSearch = 0;

    const loadData = (searchInput: string, sort?: string, currentDirection?: string) => {
        getCatalogList(searchInput, sort, currentDirection)
            .then(res => setCurrentCatalogItems([...res?.catalogItems]));
    };

    const handleSort = (currentSort: string, currentDirection: string) => {
        setSort(currentSort);
        setDirection(currentDirection);
        loadData(searchInputValue, currentSort, currentDirection);
    };

    useEffect(() => {
        setCurrentCatalogItems([]);
        if (searchInputValue.length === 0) {
            setCurrentCatalogItems([...catalogItems.catalogItems]);
            return;
        }

        if (searchInputValue.length > numberOfLetterToStartSearch) {
            loadData(searchInputValue, sortBy, direction);
        }
    }, [searchInputValue]);

    const handleClickTab = (newTab: number): void => {
        setActiveTab(newTab);
    };

    const handleSearchInput = (inputValue: string) => {
        setSearchInputValue(inputValue);
    };

    return (
        <Layout navId={navId}>
            <div className={style.catalogWrapper}>
                <div className={style.container}>
                    <BannerImage
                        tabButton={handleClickTab}
                        handleSearchInput={handleSearchInput}
                        activeTab={activeTab}
                        searchInput={searchInputValue}
                        handleSort={handleSort}
                    />
                    {activeTab === 1 ?
                        <div>
                            <CatalogData
                                catalogItems={currentCatalogItems}
                            />
                        </div>
                        :
                        <div>
                            <CatalogNetWork
                                catalogItems={currentCatalogItems}
                            />
                        </div>
                    }
                </div>
            </div>
        </Layout>
    );
};

export default Catalog;

export const getServerSideProps: GetServerSideProps = async () => {
    const catalogItems = await getCatalogList('', 'year', 'DESC');

    return {
        props: {
            catalogItems
        },
    };
};
