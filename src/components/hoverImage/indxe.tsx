// import React from 'react';
// import styles from '@/styles/catalog.module.scss';
// import Link from 'next/link';
// import ImageItemCategory from '../imageItemCategory';

// const HoverImage: React.FC = ({
//   item,
//   index,
//   handleHoverOnImage,
//   hoveredIndex,
//   setHoveredIndex,
// }) => {
//   /**
//    *
//    */

//   const uniqueFilterId = `redFilter-${0}`;

//     const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
//     const [hoverShowInfo, setHoverShowInfo] = useState<ICatalogItem | null>(null);

//     const handleHoverOnImage = (item: any, index: number) => {
//       setHoveredIndex(index);
//       setHoverShowInfo(item);
//     };

//   return (
//     <div className={styles.flexItem}>
//       <div
//         key={item.id}
//         onMouseEnter={() => handleHoverOnImage(item, index)}
//         onMouseLeave={() => setHoveredIndex(null)}
//         className={styles.flexCol}
//       >
//         <Link href='/catalog/catalogItem'>
//           <img
//             src={item.image}
//             alt={item.name}
//             className={` ${styles.itemImage} `}
//             style={{
//               filter:
//                 hoveredIndex === index ? `url(#${uniqueFilterId})` : 'none',
//             }}
//           />
//           <ImageItemCategory itemId={uniqueFilterId} />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default HoverImage;
