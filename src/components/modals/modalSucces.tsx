import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { getYearFromDate } from '@/hooks/getYearFromDate';

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
    border: '2px solid #FF0000',
    // border: 'none',
  },
  borderTopRed: {
    border: '2px solid #FF0000',
  },
  divBanner: {
    width: '370px',
  },
  closeBtn: {
    background: 'inherit',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRowBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexJustifyBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    paddingBottom: '0',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  flexJustifyFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '0',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    color: '#FF0000',
    fontSize: '18px',
    paddingBottom: '20px',
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  title: {
    color: '#FF0000',
    fontSize: '26px',
    textTransform: 'uppercase',
  },
  subTitle: {
    fontSize: '18px',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  imageContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },

  spaceX: {
    margin: '10px 10px',
  },
  imageDiv: {
    width: '100%',
    height: '450px', // 450px
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    minHeight: '100%',
    objectFit: 'contain',
  },

  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    color: '#c2c2c2',
    paddingTop: '0',
    paddingBottom: '10px',
  },

  borderRed: {
    background: '#FF0000',
    height: '2px',
    width: '100%',
    marginBottom: '5px',
  },
};

const customStylesDestkop: Record<string, React.CSSProperties> = {
  content: {
    // top: '75%', 
    // left: '65%', 
    // right: 'auto', 
    // bottom: 'auto',
    // marginRight: '-50%',
    left: 'auto',
    top: '180px',
    right: '40px',
    bottom: 'auto',
    transform: 'translate(0%, -50%)',
    padding: '0',
    borderRadius: '0',
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    // border: '2px solid #FF0000',
    // border: 'none',
  },
  borderTopRed: {
    border: '2px solid #FF0000',
  },
  divBanner: {
    width: '560px',
  },
  imageContainer: {
    display: 'none',
  },
  closeBtn: {
    background: 'inherit',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRowBetween: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexJustifyBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '20px',
    paddingBottom: '0',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  flexJustifyFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    paddingBottom: '0',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    color: '#FF0000',
    fontSize: '18px',
    paddingBottom: '20px',
    paddingTop: '20px',
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  title: {
    color: '#FF0000',
    fontSize: '26px',
    textTransform: 'uppercase',
  },
  subTitle: {
    fontSize: '18px',
    fontWeight: '500',
    textTransform: 'uppercase',
  },

  spaceX: {
    margin: '10px 10px',
  },
  imageDiv: {
    width: '100%',
    height: '450px', // 450px
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    minHeight: '100%',
    objectFit: 'contain',
  },

  flexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    color: '#c2c2c2',
    paddingTop: '0',
    paddingBottom: '10px',
  },

  borderRed: {
    background: '#FF0000',
    height: '2px',
    width: '100%',
    marginBottom: '5px',
  },
};

Modal.setAppElement('#__next');

interface ModalRequestProps {
  isOpen: boolean;
  onRequestClose: () => void;
  successImage: {
    id: string;
    mimeType: string;
    url: string;
  };
  material: string;
  year: number | string;
  name: string;
  height: string;
  width: string;
}

const ModalSuccess: React.FC<ModalRequestProps> = ({
  isOpen,
  onRequestClose,
  successImage,
  material,
  year,
  name,
  height,
  width,
}) => {
  /**
   * ModalRequest Hooks.
   */

  const [widthSize, setWidthSize] = useState(0);

  // @ts-ignore
  const desktopSize = 1280;

  useEffect(() => {
    const handleResize = () => setWidthSize(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.removeItem('selectedVariants');
    localStorage.removeItem('checkedItems');
  }, []);

  // @ts-ignore
  // @ts-ignore

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={widthSize > desktopSize ? customStylesDestkop : customStyles}
      contentLabel='Modal Success'
    >
      <div style={widthSize > desktopSize ? customStylesDestkop.divBanner : customStyles.divBanner }>
        <div style={customStyles.borderTopRed}>
          <div style={customStyles.flexJustifyBetween}>
            <span style={customStyles.title}>Запрос на покупку</span>
            <button onClick={onRequestClose} style={customStyles.closeBtn}>
              <img
                src='/icons/close-icon.svg'
                alt='Close-Icon'
                style={customStyles.closeIcon}
              />
            </button>
          </div>
          <div style={customStyles.description}>
            <p>
              Ваши данные были отправлены, мы свяжемся с вами в течение 5
              рабочих дней
            </p>
          </div>
        </div>
        {widthSize < desktopSize && 
          <div style={customStyles.imageContainer}>
            <div style={customStyles.imageDiv}>
              <img
                src={successImage?.url}
                alt={successImage?.mimeType}
                style={customStyles.image}
              />
            </div>
            <div style={customStyles.flexColumn}>
              <div style={customStyles.flexJustifyFooter}>
                <div>
                  <span style={customStyles.subTitle}>{name}</span>
                </div>
                <div>
                  <span style={customStyles.subTitle}>
                    <span>{year && getYearFromDate(year.toString())}</span>
                  </span>
                </div>
              </div>
              <div style={customStyles.borderRed} />
              <div style={customStyles.flexStart}>
                <span
                  style={{
                    fontSize: '18px',
                    marginRight: '10px',
                    textTransform: 'uppercase',
                  }}
                >
                  {material}
                </span>
                <span style={{ fontSize: '18px', margin: '0 10px' }}>
                  {height} x {width} СМ.
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </Modal>
  );
};
export default ModalSuccess;
