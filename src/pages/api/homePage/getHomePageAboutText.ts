export const getHomePageAboutText = async () => {
    try {
        const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const response = await fetch(`${backEndUrl}/main-page-text`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Server responded with a non-2xx status code.');
        }

        const data = await response.json();

        return data.text;
    } catch (error) {
        new Error(`${error}`);
        return null;
    }
};
