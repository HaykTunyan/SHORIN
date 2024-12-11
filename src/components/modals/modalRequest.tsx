import React, {
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
} from 'react';
import Modal from 'react-modal';
import { createOrderByGiclee } from '@/pages/api/order/orderByGliclee';
import styles from '@/styles/modal.module.scss';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Link from 'next/link';

interface Variant {
  id: string;
  width: number;
  height: number;
  price: number;
  state: string;
}

interface FormData {
  customerName: string;
  customSurname?: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  agreementOne: boolean;
  agreementTwo: boolean;
}

const injectPlaceholderStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
      ::placeholder {
        color: #FF0000; /* color */
        opacity: 0.8; 
        font-style: SF Pro Display; 
        font-weight: 500;
        font-size: 18px;
         textTransform: uppercase;
      }
      input[type='checkbox'] {
      appearance: none;
      -webkit-appearance: none;
      width: 20px;
      height: 20px;
      background-color: #fff;
      border: 2px solid #FF1D1D;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
    }
    input[type='checkbox']:checked {
      background-color: #FF1D1D;
    }
    `;
  document.head.append(style);
};

const customStyles: Record<string, React.CSSProperties> = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '0',
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    // border: '2px solid #FF0000',
    color: '#FF0000',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexJustifyBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    color: '#FF0000',
    fontSize: '22px',
    paddingBottom: '20px',
    paddingTop: '20px',
  },
  title: {
    fontSize: '24px',
    textTransform: 'uppercase',
  },
  closeBtn: {
    background: 'inherit',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  closeIcon: {
    width: '28px',
    height: '28px',
  },
  spaceL: {
    margin: '40px',
  },
  spaceS: {
    margin: '10px 0',
  },
  spaceM: {
    margin: '20px 0',
  },
  inputDiv: {
    borderBottom: '2px solid',
    borderColor: '#FF1D1D',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  inputStyle: {
    border: 'none',
    outline: 'none',
    paddingLeft: '0',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingRight: '10px',
    width: '100%',
    fontSize: '20px',
    color: '#FF0000',
    textTransform: 'uppercase',
    opacity: '0.8',
  },
  checkboxStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
    fontSize: '16px',
  },
  btnDiv: {
    marginTop: '0',
    marginBottom: '0px',
  },
  submitButton: {
    color: '#FF1D1D',
    border: 'none',
    outline: 'none',
    background: 'inherit',
    cursor: 'pointer',
    fontWeight: '500',
    textTransform: 'uppercase',
  },

  disabledButton: {
    color: '#FF1D1D',
    opacity: '20',
  },

  errorTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FF1D1D',
  },
  noselect: {
    cursor: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
  },
};

const customStyleDesktop: Record<string, React.CSSProperties> = {
  content: {
    // top: '55%',
    // left: '55%',
    // right: 'auto',
    // bottom: 'auto',
    // marginRight: '-50%',
    // left: 'auto',
    // top: 'auto',
    // right: '160px',
    // bottom: 'auto',
    inset: 'auto 160px -220px auto',
    transform: 'translate(20%, -50%)',
    padding: '20px',
    borderRadius: '0',
    color: '#FF0000',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexJustifyBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    color: '#FF0000',
    fontSize: '22px',
    paddingBottom: '20px',
    paddingTop: '20px',
  },
  title: {
    fontSize: '24px',
    textTransform: 'uppercase',
  },
  closeBtn: {
    background: 'inherit',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  closeIcon: {
    width: '28px',
    height: '28px',
  },
  spaceL: {
    margin: '40px',
  },
  spaceS: {
    margin: '10px 0',
  },
  spaceM: {
    margin: '20px 0',
  },
  inputDiv: {
    borderBottom: '2px solid',
    borderColor: '#FF1D1D',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  inputStyle: {
    border: 'none',
    outline: 'none',
    paddingLeft: '0',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingRight: '10px',
    width: '100%',
    fontSize: '20px',
    color: '#FF0000',
    textTransform: 'uppercase',
    opacity: '0.8',
  },
  checkboxStyle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
    fontSize: '16px',
  },
  btnDiv: {
    marginTop: '0',
    marginBottom: '0px',
  },
  submitButton: {
    color: '#FF1D1D',
    border: 'none',
    outline: 'none',
    background: 'inherit',
    cursor: 'pointer',
    fontWeight: '500',
    textTransform: 'uppercase',
  },

  disabledButton: {
    color: '#FF1D1D',
    opacity: '20',
  },

  errorTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FF1D1D',
  },

  noselect: {
    cursor: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
  },
};

Modal.setAppElement('#__next');

interface ModalRequestProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSuccessRequest: () => void;
  requestType: string;
  pictureId: string;
  gilceLocalInfor: Variant[];
}

const ModalRequest: React.FC<ModalRequestProps> = ({
  isOpen,
  onRequestClose,
  onSuccessRequest,
  requestType,
  pictureId,
  gilceLocalInfor,
}) => {
  /**
   * ModalRequest Hooks.
   */
  const [errorMessages, setErrorMessages] = useState<any>(null);
  const [selectedVariants, setSelectedVariants] = useState<Variant[]>([]);
  const [formData, setFormData] = useState<FormData>({
    customerName: '',
    customSurname: '',
    customerEmail: '',
    customerPhone: '',
    message: '',
    agreementOne: false,
    agreementTwo: false,
  });

  const [width, setWidth] = useState(0);

  // @ts-ignore
  const desktopSize = 1280;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [errors, setErrors] = useState({
    customerEmail: false,
    customerPhone: false,
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    const selectedTypeGicleInfo = localStorage.getItem('selectedVariants');
    setErrorMessages(null);
    setFormData({
      customerName: '',
      customSurname: '',
      customerEmail: '',
      customerPhone: '',
      message: '',
      agreementOne: false,
      agreementTwo: false,
    });
    if (selectedTypeGicleInfo) {
      try {
        const parsedData: Variant[] = JSON.parse(selectedTypeGicleInfo);
        setSelectedVariants(parsedData);
      } catch (error) {}
    }
  }, [isOpen]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'customerEmail') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        // eslint-disable-next-line no-use-before-define
        customerEmail: !validateEmail(value),
      }));
    }

    if (name === 'customerPhone') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        // eslint-disable-next-line no-use-before-define
        customerPhone: !validatePhone(value),
      }));
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    // const phoneRegex = /^\+?\d{1,14}?[-.\s]?(\d{1,4}[-.\s]?){1,4}\d{1,4}$/;
    const phoneRegex = /^\+?\d{7,18}$/;
    // const phoneRegex = /^(?:\+7|8)?\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
    return phoneRegex.test(phone);
  };

  const isFormValid = () => {
    const {
      customerName,
      customSurname,
      customerEmail,
      customerPhone,
      message,
      agreementOne,
    } = formData;
    return (
      customerName &&
      customSurname &&
      validateEmail(customerEmail) &&
      validatePhone(customerPhone) &&
      message &&
      agreementOne
    );
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!executeRecaptcha) {
        return;
      }

      const result = await executeRecaptcha('question');

      const transformedData = gilceLocalInfor.map((item) => ({
        gicleeVariantId: item.id,
        price: item.price,
        height: item.height,
        width: item.width,
      }));

      const requestBody =
        requestType === 'giclee'
          ? {
              gicles: transformedData,
              type: 'giclee',
              customerName: `${formData.customerName} ${formData.customSurname}`, //  customerName and customSurname
              customerEmail: formData.customerEmail,
              customerPhone: formData.customerPhone,
              token: result,
            }
          : {
              type: 'picture',
              customerName: `${formData.customerName} ${formData.customSurname}`, //  customerName and customSurname
              customerEmail: formData.customerEmail,
              customerPhone: formData.customerPhone,
              product: { id: pictureId },
              token: result,
            };

      try {
        const response = await createOrderByGiclee(requestBody);
        if (response.id) {
          onSuccessRequest();
          // eslint-disable-next-line no-use-before-define
          handleRequestClose();
        }
      } catch (error) {
        const errorObj = JSON.parse((error as Error).message);
        if (errorObj.message && Array.isArray(errorObj.message)) {
          setErrorMessages(errorObj.message);
        } else {
          setErrorMessages([
            errorObj.error || 'Некорректный email или телефона',
          ]);
        }
      }
    },
    [
      executeRecaptcha,
      formData.customerName,
      formData.customSurname,
      formData.customerEmail,
      formData.customerPhone,
      formData.message,
    ]
  );

  const resetFormData = () => {
    setFormData({
      customerName: '',
      customSurname: '',
      customerEmail: '',
      customerPhone: '',
      message: '',
      agreementOne: false,
      agreementTwo: false,
    });
    setErrors({
      customerEmail: false,
      customerPhone: false,
    });
  };

  const handleRequestClose = () => {
    resetFormData();
    onRequestClose();
    localStorage.removeItem('selectedVariants');
    if (selectedVariants) return;
  };

  useEffect(() => {
    injectPlaceholderStyles();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      style={width > desktopSize ? customStyleDesktop : customStyles}
      contentLabel='Modal'
    >
      <div className={styles.reqestContainer}>
        <div className={styles.flexJustifyBetween}>
          <span
            style={{ textDecoration: 'uppercase' }}
            className={styles.title}
          >
            Запрос на покупку
          </span>
          <button onClick={handleRequestClose} className={styles.closeBtn}>
            <img
              src='/icons/close-icon.svg'
              alt='Close-Icon'
              className={styles.closeIcon}
            />
          </button>
        </div>
        <div className={styles.description}>
          <p>
            Оставьте свои данные, и мы свяжемся с вами насчет возможности
            покупки работы.
          </p>
        </div>
        <form onSubmit={handleSubmit} style={customStyles.customStyles}>
          <div className={styles.inputDiv}>
            <input
              type='text'
              name='customerName'
              value={formData.customerName}
              placeholder='Имя'
              onChange={handleChange}
              style={customStyles.inputStyle}
            />
          </div>
          <div style={customStyles.spaceM} />
          <div className={styles.inputDiv}>
            <input
              type='text'
              name='customSurname'
              value={formData.customSurname}
              placeholder='Фамилия'
              onChange={handleChange}
              style={customStyles.inputStyle}
            />
          </div>
          <div style={customStyles.spaceM} />
          <div className={styles.inputDiv}>
            <input
              type='email'
              name='customerEmail'
              value={formData.customerEmail}
              placeholder='EMAIL'
              onChange={handleChange}
              style={customStyles.inputStyle}
            />
          </div>
          {errors.customerEmail && 
            <p style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }}>
              Некорректный email
            </p>
          }
          <div style={customStyles.spaceM} />

          <div className={styles.inputDiv}>
            <input
              type='tel'
              name='customerPhone'
              value={formData.customerPhone}
              placeholder='Телефон'
              onChange={handleChange}
              style={customStyles.inputStyle}
              maxLength={18}
            />
          </div>
          {errors.customerPhone && 
            <p style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }}>
              Некорректный номер телефона
            </p>
          }
          <div style={customStyles.spaceM} />
          <div className={styles.inputDiv}>
            <input
              type='text'
              name='message'
              value={formData.message}
              placeholder='Сообщение'
              onChange={handleChange}
              style={customStyles.inputStyle}
            />
          </div>
          {/* <div style={customStyles.spaceL} /> */}
          {/* Checkbox */}
          <div style={{ marginTop: '40px' , marginBottom: '24px' }}>
            <div style={customStyles.flexColumn}>
              <div style={customStyles.checkboxStyle}>
                <div className={styles.checkBoxM}>
                  <input
                    type='checkbox'
                    name='agreementOne'
                    checked={formData.agreementOne}
                    onChange={handleChange}
                  />
                </div>
                <label
                  htmlFor='agreementOne'
                  style={{
                    marginLeft: '2px',
                    color: '#FF1D1D',
                    lineHeight: '18px',
                  }}
                >
                  Согласие на{' '}
                  <Link
                    style={{ color: '#FF1D1D' }}
                    target={'_blank'}
                    href={'/privacy-policy'}
                  >
                    обработку персональных данных
                  </Link>
                </label>
              </div>

              <div style={customStyles.checkboxStyle}>
                <div className={styles.checkBoxM}>
                  <input
                    type='checkbox'
                    name='agreementTwo'
                    checked={formData.agreementTwo}
                    onChange={handleChange}
                  />
                </div>
                <label
                  htmlFor='agreementOne'
                  style={{
                    marginLeft: '2px',
                    color: '#FF1D1D',
                    lineHeight: '18px',
                  }}
                >
                  Согласие на получение информационных рассылок о новинках
                </label>
              </div>
              {/* <div
                style={{
                  marginTop: '24px',
                  marginBottom: '24px',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                }}
              >
                <div
                  style={{
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#B2B2B229',
                    height: '64px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: '400',
                      lineHeight: '18px',
                      color: '#B2B2B2',
                    }}
                  >
                    поле для ввода CAPTCHA
                  </span>
                </div>
              </div> */}
            </div>
            {errorMessages?.length > 0 && 
              <div style={customStyles.flexColumn}>
                <div style={customStyles.spaceL} />
                <span style={customStyles.errorTitle}>
                  Что-то пошло не так!{' '}
                </span>
              </div>
            }
          </div>
          <div style={{ ...customStyles.btnDiv }}>
            <button
              type='submit'
              style={{
                ...customStyles.submitButton,
                fontSize: width < desktopSize ? '18px' : '22px',
                ...isFormValid()
                  ? {}
                  : { opacity: 0.5, cursor: 'not-allowed' },
              }}
              disabled={!isFormValid()}
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default ModalRequest;
