import React, { useState, useLayoutEffect, useEffect } from 'react';
import Modal from 'react-modal';
import styles from '@/styles/modal.module.scss';

interface Variant {
  id: string;
  width: number;
  height: number;
  price: number;
  state: string;
}

interface PurchaseItem {
  id: string;
  gicleeNumber: number;
  state: string | null;
  state_url: string | null;
  variants: Variant[];
}

interface ModalPurchaseProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onRequest: () => void;
}

const customStyles: Record<string, React.CSSProperties> = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    borderRadius: '0',
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textTransform: 'uppercase',
  },
  divBanner: {
    border: '2px solid #FF1D1D',
    padding: '30px',
  },
  flexRowBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '15px',
  },

  flexJustifyBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  catalogNetwork: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    height: '360px',
    overflowX: 'auto',
  },
  topSpace: {
    marginTop: '50px',
  },
  title: {
    fontSize: '24px',
  },
  redTitle: {
    border: 'none',
    background: 'inherit',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '26px',
    fontWeight: '500',
    color: '#FF0000',
  },
  priceSlectTitle: {
    border: 'none',
    background: 'inherit',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '22px',
    fontWeight: '500',
    color: '#FF0000',
  },
  priceTitle: {
    border: 'none',
    background: 'inherit',
    outline: 'none',
    cursor: 'pointer',
    fontSize: '22px',
    fontWeight: '500',
  },
  closeBtn: {
    background: 'inherit',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  deleteBtn: {
    background: 'inherit',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  imageModal: {
    width: '130px',
    height: '68px',
    objectFit: 'cover',
  },
  borderRed: {
    background: '#FF0000',
    height: '2px',
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px',
  },
  closeIcon: {
    width: '28px',
    height: '28px',
  },
  spaceX: {
    margin: '0 40px',
  },
  spaceS: {
    margin: '0 5px',
  },
  paddingList: {
    paddingBottom: '20px',
  },
  priceListRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};

Modal.setAppElement('#__next'); // This is important for accessibility

const ModalPurchase: React.FC<ModalPurchaseProps> = ({
  isOpen,
  onRequestClose,
  onRequest,
}) => {
  /**
   * ModalPurchase Hooks.
   */

  const [selectedSizes, setSelectedSizes] = useState<
    Record<string, Variant | null>
  >({});

  const [image, setImage] = useState<{
    url: string | null;
    alt: string | null;
  }>({ url: null, alt: null });
  const [purchaseList, setPurchaseList] = useState<PurchaseItem[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);

  const handleCheckSize = (itemId: string, variant: Variant) => {
    setSelectedSizes((prevState) => ({
      ...prevState,
      [itemId]: variant,
    }));
  };

  const handleDeleteItem = (itemId: string) => {
    const updatedPurchaseList = purchaseList.filter(
      (item) => item.id !== itemId
    );
    setPurchaseList(updatedPurchaseList);
    localStorage.setItem('checkedItems', JSON.stringify(updatedPurchaseList));

    setSelectedSizes((prevState) => {
      const newState = { ...prevState };
      delete newState[itemId];
      return newState;
    });
  };

  const getSelectedPrice = (itemId: string): number => {
    return (
      selectedSizes[itemId]?.price ??
      Math.min(
        ...purchaseList
          .find((item) => item.id === itemId)!
          .variants.map((variant) => variant.price)
      )
    );
  };

  const getTotalSelectedPrice = (): number => {
    return purchaseList.reduce((total, item) => {
      return total + getSelectedPrice(item.id);
    }, 0);
  };

  const handleRequestSend = () => {
    if (selectedVariants.length === purchaseList.length) {
      localStorage.setItem('selectedVariants', JSON.stringify(selectedVariants));
      onRequest();
    }
  };

  const onCloseModal = () => {
    onRequestClose();
    localStorage.removeItem('selectedVariants');
  };

  useEffect(() => {
    setSelectedVariants(
      Object.values(selectedSizes).filter(
        (variant) => variant !== null
      ) as Variant[]
    );
    localStorage.setItem('selectedVariants', JSON.stringify(selectedVariants));
  }, [selectedSizes]);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const savedItems = localStorage.getItem('checkedItems');
      if (savedItems) {
        setPurchaseList(JSON.parse(savedItems));
      }
      const savedImage = localStorage.getItem('itemImages');
      if (savedImage) {
        setImage(JSON.parse(savedImage));
      }
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel='Purchase Modal'
    >
      <div className={styles.divBanner}>
        <div className={styles.flexJustifyBetweenM}>
          <span className={styles.title}>Оформить покупку</span>
          <span onClick={onCloseModal} className={styles.closeBtn}>
            <img
              src={'/icons/close-icon.svg'}
              alt='Close-Icon'
              className={styles.closeIcon}
            />
          </span>
        </div>
        <div className={styles.borderRed} />
        <div className={styles.catalogDIv}>
          {purchaseList.length > 0 ? 
            purchaseList.map((item) => 
              <div className={styles.flexJustifyBetweenM} key={item.id}>
                {/* IMages */}
                <div className={styles.flexRowM}>
                  <img
                    src={image?.url || ''}
                    alt={image?.alt || ''}
                    className={styles.imageModal}
                    style={customStyles.imageModal}
                  />
                  <span className={styles.spaceX} />
                  <span className={styles.title}>коллекционер</span>
                  <span className={styles.spaceS} />
                  <span>/</span>
                  <span className={styles.spaceS} />
                  <span className={styles.title}>
                    жикле {item.gicleeNumber}
                  </span>
                  <span className={styles.spaceX} />
                </div>
                {/* Button Div */}
                <div
                  className={`${styles.flexInfoM} ${styles.flexRowBetweenM} `}
                >
                  <div className={styles.flexRowBetweenM}>
                    {item.variants.map((variant) => 
                      <div key={variant.id} className={styles.priceListRow}>
                        <span
                          className={
                            selectedSizes[item.id]?.id === variant.id
                              ? styles.priceSlectTitle
                              : styles.priceTitle
                          }
                          onClick={() => handleCheckSize(item.id, variant)}
                        >
                         {variant.height} X {variant.width}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className={styles.spaceX} />
                  {/* Price Div */}
                  <div className={styles.flexRowBetweenM}>
                    <span className={styles.title}>
                      {getSelectedPrice(item.id)}
                      {'  '}₽
                    </span>
                  </div>
                  <span className={styles.spaceM} />
                  <div className={styles.flexRowBetweenM}>
                    <span
                      className={styles.deleteBtn}
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <img
                        src='/icons/close-icon.svg'
                        alt='Close-Icon'
                        className={styles.closeIcon}
                      />
                    </span>
                  </div>
                </div>
              </div>
            )
           : 
            <div className={styles.flexCenter}>
              <span className={styles.title}>НЕТ ТОВАРОВ В СПИСКЕ ПОКУПОК</span>
            </div>
          }
        </div>
        {/* Mobile Version */}
        <div className={styles.catalogMobileDiv}>
          {purchaseList.length > 0 ? 
            purchaseList.map((item) => 
              <div className={styles.flexColumntItem} key={item.id}>
                <div className={styles.flexRowBetweenM}>
                  <div className={styles.itemGicle}>
                    <span className={styles.title}>коллекционер картина</span>
                  </div>
                  <div
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <img
                      src='/icons/close-icon.svg'
                      alt='Close-Icon'
                      className={styles.closeIcon}
                    />
                  </div>
                </div>
                <div style={{ marginTop: '10px' }} className={styles.flexRowBetweenM}>
                  <div className={styles.title}>жикле {item.gicleeNumber}</div>
                  <div className={styles.title}>
                    {getSelectedPrice(item.id)}
                    {'  '}₽
                  </div>
                </div>
                {/* IMages */}
                <div className={styles.gicleImage}>
                  <img
                    src={image?.url || ''}
                    alt={image?.alt || ''}
                    className={styles.imageModal}
                    style={customStyles.imageModal}
                  />
                </div>
                {/* Variants BTN */}
                <div className={styles.flexVarianM}>
                  {item.variants.map((variant) => 
                    <div key={variant.id} className={styles.priceListRow}>
                      <span
                        className={
                          selectedSizes[item.id]?.id === variant.id
                            ? styles.priceSlectTitle
                            : styles.priceTitle
                        }
                        onClick={() => handleCheckSize(item.id, variant)}
                      >
                        {variant.width} X {variant.height}
                      </span>
                    </div>
                  )}
                </div>
                {/* Price Div */}
                <div className={styles.borderItem} />
              </div>
            )
           : 
            <div className={styles.flexCenter}>
              <span className={styles.title}>НЕТ ТОВАРОВ В СПИСКЕ ПОКУПОК</span>
            </div>
          }
        </div>

        <div className={styles.topSpace} />
        <div className={styles.borderRed} />
        <div className={styles.flexFooter}>
          <div
            className={`${styles.redTitle}  ${
              selectedVariants?.length != purchaseList.length
                ? styles.disabledStyle
                : ''
            }  `}
            onClick={handleRequestSend}
            // disabled={selectedVariants?.length !== purchaseList.length}
          >
            Отправить запрос на покупку
          </div>
          <span className={styles.redTitle}>{getTotalSelectedPrice()}₽</span>
        </div>
      </div>
    </Modal>
  );
};

export default ModalPurchase;
