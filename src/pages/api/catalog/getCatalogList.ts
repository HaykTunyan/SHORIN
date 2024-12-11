export const getCatalogList = async (searchInput: string, sort?: string, direction?: string) => {
    try {
        const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backEndUrl}/products-view/?sort=${direction}&orderBy=${sort}&q=${searchInput}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Server responded with a non-2xx status code.');
        }

        const data = await response.json();

        return {
            count: data.count,
            catalogItems: data.rows.map((item: any, index: number) => {
                return {
                    index: index,
                    id: item.id,
                    name: item.name ? item.name : '',
                    year: item.year ? item.year : '',
                    slug: item.slug ? item.slug : '',
                    image: item.image ? item.image.url : '',
                    width: item.width ? item.width : '',
                    height: item.height ? item.height : '',
                    material: item.material ? item.material : '',
                };
            })
        };
    } catch (error) {
        new Error(`${error}`);
        return null;
    }
};
