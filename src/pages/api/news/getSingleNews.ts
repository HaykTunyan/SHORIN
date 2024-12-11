export const getSingleNews = async (slug: string) => {
    try {
        const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backEndUrl}/news/slug/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Server responded with a non-2xx status code.');
        }

        const item = await response.json();

        return {
            id: item.id,
            title: item.title,
            publication: item.publication,
            slug: item.slug,
            description: item.description,
            image: item.image.url,
        };
    } catch (error) {
        new Error(`${error}`);
        return null;
    }
};
