import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

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
  },
  // eslint-disable-next-line camelcase
  ReactModal__Overlay: {
    backgroundColor: 'white',
  },
  divBanner: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    border: '2px solid #FF0000',
    padding: '20px',
    textDecoration: 'uppercase',
  },

  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'fixed',
    paddingRight: '45px',
    width: '100%',
  },
  closeBtn: {
    background: 'inherit',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  description: {
    fontSize: '18px',
    lineHeight: '36.32px',
    fontWeight: '400',
    textTransform: 'uppercase',
    overflowY: 'auto',
    height: '500px',
    paddingRight: '58px',
    // paddingTop: '50px',
  },

  spaceL: {
    margin: '20px 0',
  },

  redTitle: {
    color: '#FF0000',
  },

  divButton: {
    width: '10%',
    marginLeft: '30px',
  },

  borderRed: {
    background: '#FF0000',
    height: '2px',
    width: '100%',
    marginTop: '10px',
    marginBottom: '10px',
  },
};

Modal.setAppElement('#__next');

interface ModalMoreInfoProps {
  isMoreOpen: boolean;
  onMoreClose: () => void;
}

const ModalMoreInfo: React.FC<ModalMoreInfoProps> = ({
  isMoreOpen,
  onMoreClose,
}) => {
  /**
   * Modal MoreInfo Hooks.
   */

  const [width, setWidth] = useState(0);

  // @ts-ignore
  const desktopSize = 1280;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getWidth = () => {
    // eslint-disable-next-line no-magic-numbers
    if (width >= 1280) {
      return '1200px';
      // eslint-disable-next-line no-magic-numbers
    } else if (width >= 768) {
      return '768px';
    } else {
      return '360px';
    }
  };

  const closeModal = () => {
    onMoreClose();
  };

  return (
    <Modal
      isOpen={isMoreOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel='Modal Info'
    >
      <div style={{ width: getWidth() }}>
        <div style={customStyles.divBanner}>
          <div style={customStyles.flexEnd}>
            <span onClick={onMoreClose} style={customStyles.closeBtn}>
              <img
                src='/icons/close-icon.svg'
                alt='Close-Icon'
                style={customStyles.closeIcon}
              />
            </span>
          </div>
          <div style={{ paddingTop: width < desktopSize ? '50px' : '' , ...customStyles.description  }}>
            <p>
              <span style={{ fontSize: width > desktopSize ? '24px' : '18px' }}>Жикле — </span>{' '}
              <span style={{ fontSize: width > desktopSize ? '24px' : '18px' }}>
                (фр. giclee – «распылять», «разбрызгивать») – копия
                художественной, работы, создаваемая методом цифровой печати и
                дополнительной ручной доработки. У термина нет строгих критериев
                качества, но подразумевается копия в масштабе 1:1, максимально
                точная передача цветов и деталей оригинала, доступная
                профессиональному оборудованию. Частым критерием является
                лимитированность отпечатков. При грамотной цветокоррекции,
                подходящем оборудовании и одинаковом освещении отпечаток и
                оригинал сложно отличить визуально с просмотрового расстояния.
              </span>
            </p>
            <div style={customStyles.spaceL}></div>
            <p style={{ fontSize: width > desktopSize ? '24px' : '18px' }}>
              Такой отпечаток обязательно покрывается художественным лаком,
              чтобы защитить от старения, продлить стойкость красок и
              имитировать фактуру носителя. При печати используют специальные
              пигментные краски без токсичных веществ, но стойкие и долговечные.
              Производители заявляют о защите от выгорания до 200 лет (при
              использовании оригинальных комбинаций красок, носителя и лака и
              соответствующих условиях эксплуатации).
            </p>
            <div style={customStyles.spaceL}> </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalMoreInfo;
