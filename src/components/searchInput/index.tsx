//

import React, { FC, useState } from 'react';
import styles from '@/styles/catalog.module.scss';
import Image from 'next/image';

const SearchInput: FC = () => {
  /**
   * Seach Input.
   */

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSearch = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        {!isOpen ?
          <button className={styles.searchIcon} onClick={toggleSearch}>
            🔍
          </button>
         :
          <>
            <input
              type='text'
              className={`${styles.searchInput} ${
                isOpen ? styles.searchOpen : ''
              }`}
              placeholder='Search...'
              autoFocus={isOpen}
            />
            <button
              type='button'
              className={styles.iconButton}
              onClick={toggleSearch}
            >
              <Image
                src='/icons/search-icon.svg'
                alt='Search-Icon'
                width={38}
                height={38}
                className={styles.bannerIcons}
              />
            </button>
          </>
        }
      </div>
    </>
  );
};

export default SearchInput;
