import React, { useState, FC, useEffect } from 'react';
import Layout from '@/components/layout';
import FoundationAbout from '@/components/foundation-about';
import styles from '@/styles/foundation.module.scss';
import global from '@/styles/catalog.module.scss';
import { getFoundDescription } from '../api/foundationAPI/getFoundDescription';
import { getEventList } from '../api/eventsAPI/listAPI';
import { FoundDescription } from '@/types/found';
import classNames from 'classnames';
import {getYearFromDate} from '@/hooks/getYearFromDate';
import {Collapse} from 'react-collapse';
import Link from 'next/link';

const Foundation: FC = () => {
  /**
   *  Foundation Hooks.
   */

  const navId = 2;

  const [isExhibitions, setIsExhibitions] = useState<boolean>(false);
  const [isPublications, setIsPublications] = useState<boolean>(false);
  const [echibitionInfo, setEchibitionInfo] = useState<any>([]);
  const [publicationInfo, setPublicationInfo] = useState<any>([]);
  const [foundData, setFoundData] = useState<FoundDescription | null>(null);
  const [eventData, setEventData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFoundDescription();
        setFoundData(response);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getEventReq = async () => {
      try {
        const response = await getEventList();
        setEventData(response);
      } catch (error) {
      }
    };
    getEventReq();
  }, []);

  useEffect(() => {
    if (eventData?.rows.length) {
      const exhibitionData = eventData?.rows.filter(
        (item: any) => item.type === 'exhibition'
      );
      setEchibitionInfo(exhibitionData);
      const publicationData = eventData?.rows.filter(
        (item: any) => item.type === 'publication'
      );
      setPublicationInfo(publicationData);
    }
  }, [eventData]);

  const handleToggleExhibitions = (newExhibitions: boolean): void => {
    setIsExhibitions(!newExhibitions);
  };

  const handleTogglePublications = (newPublications: boolean): void => {
    setIsPublications(!newPublications);
  };

  return (
    <>
      <Layout navId={navId}>
        <div className={styles.containerFoundation}>
          <div className={styles.spaceFoundAbout}>
            <FoundationAbout innerData={foundData?.text} />
          </div>
          <div className={styles.spaceFoundList}>
            {/* Выставки  */}
            <div className={styles.foundList}>
              <div
                  className={` ${global.flexBetween} ${styles.bannerList}`}
                  onClick={() => handleToggleExhibitions(isExhibitions)}
              >
                <div className={styles.titleText}>Выставки</div>
                    <img
                        src='icons/plus-icon.svg'
                        alt='Plus-Icon'
                        className={classNames(styles.exhibition, {
                          [styles.active]: isExhibitions,
                        })}
                    />
              </div>
              <Collapse isOpened={isExhibitions}>
                <div
                    className={styles.listContent2}
                >
                  {
                    echibitionInfo.map((item: any, index: number) =>
                        <div key={index} className={` ${global.flexItem}  ${styles.listNetwork}`}>
                          <Link href={`${item.link}`} target={'_blank'} className={`${global.flexBetween} ${styles.link}`}>
                            <span
                                className={styles.titleInfo}
                            >
                              {item.title}
                            </span>
                            <span className={styles.timeInfo}>
                        {getYearFromDate(item.eventDate)}
                      </span>
                          </Link>
                        </div>
                    )
                  }
                </div>
              </Collapse>
            </div>
            {/* Публикации */}
            <div className={styles.foundList}>
              <div
                  className={` ${global.flexBetween} ${styles.bannerList}`}
                  onClick={() => handleTogglePublications(isPublications)}
              >
                <div className={styles.titleText}>Публикации</div>
                  <img
                      src='icons/plus-icon.svg'
                      alt='Plus-Icon'
                      className={classNames(styles.exhibition, {
                        [styles.active]: isPublications,
                      })}
                  />
              </div>
              <Collapse isOpened={isPublications}>
                <div
                    className={styles.listContent2}
                >
                  {
                    publicationInfo.map((item: any, index: number) =>
                        <div key={index} className={` ${global.flexItem}  ${styles.listNetwork}`}>
                          <Link href={`${item.link}`} target={'_blank'} className={`${global.flexBetween} ${styles.link}`}>
                            <span className={styles.titleInfo}>
                              {item.title}
                            </span>
                            <span className={styles.timeInfo}>
                        {getYearFromDate(item.eventDate)}
                      </span>
                          </Link>
                        </div>
                    )
                  }
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Foundation;
