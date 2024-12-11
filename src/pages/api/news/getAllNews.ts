export const getAllNews = async (offset: number, limit: number) => {
    try {
        const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backEndUrl}/news?range=[${offset}, ${offset + limit}]`, {
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
            news: data.rows.map((item: any) => {
                return {
                    id: item.id,
                    title: item.title,
                    publication: item.publication,
                    slug: item.slug,
                    shortDescription: item.shortDescription,
                    image: item.image.url,
                };
            })
        };
    } catch (error) {
        new Error(`${error}`);
        return null;
    }
};
