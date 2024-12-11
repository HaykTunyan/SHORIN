import {ICatalogItem} from '@/pages/catalog';

export function reformatIndexes(arrayOfArrays: ICatalogItem[][]): ICatalogItem[][] {
    return arrayOfArrays.map(smallArray =>
        smallArray.map((obj, idx) => ({
            ...obj,
            index: idx
        }))
    );
}
