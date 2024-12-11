export const getSlides = async () => {
    try {
        const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backEndUrl}/slides`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Server responded with a non-2xx status code.');
        }

        const data = await response.json();

        return data.rows.map((item: any) => {
            return {
                id: item.id,
                name: item.name,
                year: item.year,
                image: item.image.url,
                link: item.link ? item.link : ''
            };
        });
    } catch (error) {
        new Error(`${error}`);
        return null;
    }
};
