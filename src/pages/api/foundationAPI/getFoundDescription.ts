// Get Found Description.

export const getFoundDescription = async () => {
    try {
        const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backEndUrl}/about-fond`, {
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
            createdAt: data.createdAt,
            deletedAt: data.deletedAt,
            id: data.id,
            text: data.text,
            updatedAt: data.updatedAt,
        };

    } catch (error) {
        new Error(`${error}`);
        return null;
    }
};
