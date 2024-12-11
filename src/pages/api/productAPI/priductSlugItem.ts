// Get getProductSlugAPI

export const getProductSlugAPI = async (slug: string) => {
    try {
        const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backEndUrl}/products-view/slug/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Server responded with a non-2xx status code.');
        }

        return await response.json();
    } catch (error) {
        new Error(`${error}`);
        return null;
    }
};
