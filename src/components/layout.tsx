import React, { ReactNode } from 'react';
import styles from '@/styles/Home.module.scss';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Pagination from '@/hooks/pagination';
import {useRouter} from 'next/router';

type Props = {
  children: ReactNode;
  navId: number;
  currentPage?: number,
  totalPages?: number,
  handleLoadPrevPage?: () => void,
  handleSelectCurrentPage?: (x: number) => void,
  handleLoadNextPage?: () => void
};

const Layout = ({ children, navId, handleSelectCurrentPage, totalPages, handleLoadNextPage, handleLoadPrevPage, currentPage }: Props) => {
  const router = useRouter();
  const pathname = router.pathname;
  // const {isLoggedIn} = useAuth();
  const isLoggedIn = true;

  return (
    <>
      {isLoggedIn ?
        <div className={styles.homePageContent}>
          <div className={styles.homePageTop}>
            <Header navId={navId} />
            {children}
          </div>

          <div className={styles.paginationSimulate}>
            {
                pathname === '/foundation' && <div className={styles.pagesWrapper}>
                  <div className={styles.pagesContainer}>
                    {
                        totalPages! > 1 && <Pagination
                            currentPage={currentPage!}
                            totalPages={totalPages!}
                            handleLoadPrevPage={handleLoadPrevPage!}
                            handleSelectCurrentPage={handleSelectCurrentPage!}
                            handleLoadNextPage={handleLoadNextPage!}
                        />
                    }
                  </div>
                </div>
            }
            <Footer/>
          </div>
        </div>
          :
          // : <Login/>
          ''
      }
    </>
  );
};

export default Layout;
