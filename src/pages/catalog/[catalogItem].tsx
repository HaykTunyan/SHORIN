import React, { FC, useEffect, useState } from 'react';
import Layout from '@/components/layout';
import style from '@/styles/product.module.scss';
import ModalPurchase from '@/components/modals/modalPurchase';
import ModalRequest from '@/components/modals/modalRequest';
import ModalSuccess from '@/components/modals/modalSucces';
import PriceList from '@/components/priceList';
import { PriceListItemProps } from '@/types/priceListItem';
import { GetServerSideProps } from 'next';
import { getProductSlugAPI } from '../api/productAPI/priductSlugItem';
import { CatalogItemProps } from '@/types/catalogItem';
import ProductGiclee from '@/components/product-giclee';
import ProductDescription from '@/components/product-description';
import ProductBanner from '@/components/product-banner';
import { Variant } from '@/types/catalogItem';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const CatalogItem: FC<CatalogItemProps> = ({ itemProduct }: any) => {
  /**
   * CatalogItem Hooks.
   */

  // const key = process.env.RECAPTION_KEY as string;

  const navId: number = 4;
  const [type, setType] = useState<string>('');
  const [isActiveImage] = useState<boolean>(itemProduct?.gicle);
  const giclesList = itemProduct?.gicles ? itemProduct.gicles : null;
  const itemImages = itemProduct?.image ? itemProduct.image : null;
  const stateisAuction = itemProduct?.state ? itemProduct?.state : null;
  
  const countOfListGicle = giclesList;
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [reqModal, setReqModal] = useState<boolean>(false);
  const [succesOrder, setSuccessOrder] = useState<boolean>(false);
  const [transformList, setTrasformList] = useState<Variant[]>([]);

  const [isCheckActive, setIsCheckActive] = useState(
    new Array(countOfListGicle?.length).fill(false)
  );

  const [checkedItems, setCheckedItems] = useState<any[]>(() => {
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('checkedItems');
      return savedItems ? JSON.parse(savedItems) : [];
    }
    return [];
  });

  // eslint-disable-next-line no-shadow
  const getCountOfEmptyStateItems = (
    gicleesList: { state: string }[] | null
  ): number => {
    if (!gicleesList) return 0;
    return gicleesList.filter((item) => item.state === 'AVAILABLE').length;
  };

  const countGicle = getCountOfEmptyStateItems(giclesList);
  // eslint-disable-next-line no-shadow
  const handleCheckIt = (id: any, item: any) => {
    // eslint-disable-next-line no-shadow
    const updatedCheckState = isCheckActive.map((item, idx) =>
      idx === id ? !item : item
    );
    setIsCheckActive(updatedCheckState);

    const isChecked = !isCheckActive[id];
    if (isChecked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem.id !== item.id)
      );
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    localStorage.removeItem('checkedItems');
    setIsCheckActive(new Array(countOfListGicle?.length).fill(false));
    setCheckedItems([]);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleOpenReqestModal = () => {
    setType('picture');
    setReqModal(true);
  };

  const handleReqestPurchase = () => {
    closeModal();
    setType('giclee');
    const getSelectedValues = localStorage.getItem('selectedVariants');
    const selectedVariants = getSelectedValues
      ? JSON.parse(getSelectedValues)
      : [];
    setTrasformList(selectedVariants);
    setReqModal(true);
  };

  const handleSuccessModal = () => {
    setReqModal(false);
    setSuccessOrder(true);
    localStorage.removeItem('checkedItems');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
      localStorage.setItem('itemImages', JSON.stringify(itemImages));
    }
  }, [checkedItems]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('checkedItems');
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems);
        setCheckedItems(parsedItems);
        const updatedCheckState = isCheckActive.map((item, idx) =>
          parsedItems.some(
            (checkedItem: any) => checkedItem.id === giclesList[idx].id
          )
        );
        setIsCheckActive(updatedCheckState);
      }
    }
  }, []);

  return (
    <>
      <Layout navId={navId}>
        <div className={style.container}>
          <ProductBanner
            stateisAuction={stateisAuction}
            itemProduct={itemProduct}
            itemImages={itemImages}
          />
          <ProductDescription
            itemProduct={itemProduct}
            stateisAuction={stateisAuction}
            handleOpenReqestModal={handleOpenReqestModal}
          />
          <ProductGiclee
            isActiveImage={isActiveImage}
            itemImages={itemImages}
            itemProduct={itemProduct}
          />
          {isActiveImage && 
            <div className={style.gicleFooter}>
              <div className={style.showInfoImage}>
                <div className={style.flexBetween}>
                  <div className={style.infoTitle}>
                    <span>
                      {/* Лимитированный тираж {giclesList?.length} экземпляров */}

                      Лимитированный тираж 10 экземпляров
                    </span>
                  </div>
                  <div className={`${style.descktopYear} ${style.infoYear}`}>
                    <span>
                      {' '}
                      {countGicle} / {giclesList?.length}
                      {'  '}
                    </span>
                    <span style={{ marginLeft: '3px' }}> доступно</span>
                  </div>
                </div>
                <div className={style.searchBottom} />

                <div className={`${style.mobileYear}  ${style.infoYear} `}>
                  <span>
                    {' '}
                    {countGicle} / {giclesList?.length}{' '}
                  </span>
                  <span> доступно</span>
                </div>
              </div>
              <div className={style.footerInfo}>
                {itemProduct?.description && 
                  <p
                    className={style.footerParagraph}
                  >
                    {/* Жикле производится в ограниченном тираже, имеет номер
                    авторской серии и личную подпись автора. Выпускается в трех
                    размерах: Small — 60X90, Medium — 95X145, Large — 140X190 */}
                    Жикле производится в ограниченном тираже, имеет номер авторской 
                    серии и подпись автора. Выпускается в трех размерах: Small — 60X90, 
                    Medium — 95X145, Large — 140X190
                  </p>
                }
              </div>
              <div className={style.footerSelector}>
                <div className={style.checkBoxList}>
                  {giclesList?.length &&
                    giclesList.map(
                      (gilce: PriceListItemProps, index: number) => 
                        <PriceList
                          handleCheckIt={() => handleCheckIt(index, gilce)}
                          gicleeNumber={gilce.gicleeNumber}
                          id={gilce.id}
                          key={index}
                          state={gilce.state}
                          variants={gilce.variants}
                          isCheckActive={isCheckActive}
                        />
                      
                    )}
                </div>
                <div className={style.priceSubbmit}>
                  {checkedItems.length > 0 && 
                    <button className={'btn'} onClick={() => openModal()}>
                      <div className={'btnInnerContainer'}>
                        <span>оформить покупку</span>
                        <svg
                          width='28'
                          height='28'
                          viewBox='0 0 28 28'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M3 13.875H25M25 13.875L18.125 7M25 13.875L18.125 20.75'
                            stroke='black'
                            strokeWidth='2'
                            strokeLinecap='square'
                          />
                        </svg>
                      </div>
                      <div className={'bottomLine'}></div>
                    </button>
                  }
                </div>
              </div>
            </div>
          }
        </div>
        <ModalPurchase
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          onRequest={handleReqestPurchase}
        />
        <GoogleReCaptchaProvider
          reCaptchaKey={'6LcLpQEqAAAAAJbBLUH-oXQD8G68L8e24lDZQT6o'}
        >
          <ModalRequest
            isOpen={reqModal}
            onRequestClose={() => setReqModal(false)}
            onSuccessRequest={handleSuccessModal}
            requestType={type}
            pictureId={itemProduct?.id}
            gilceLocalInfor={transformList}
          />
        </GoogleReCaptchaProvider>
        <ModalSuccess
          isOpen={succesOrder}
          onRequestClose={() => setSuccessOrder(false)}
          successImage={itemImages}
          material={itemProduct.material}
          year={itemProduct.year}
          name={itemProduct.name}
          height={itemProduct.height}
          width={itemProduct.width}
        />
      </Layout>
    </>
  );
};

export default CatalogItem;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const catalogItem = context.query.catalogItem as string;
  const itemProduct = await getProductSlugAPI(catalogItem);

  return {
    props: {
      itemProduct,
    },
  };
};
