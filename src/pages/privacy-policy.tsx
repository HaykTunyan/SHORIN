import React from 'react';
import Layout from '@/components/layout';
import Privacy from '@/components/privacy';

const PrivacyPolicy = () => {
    const navId = 0;

    return (
        <Layout navId={navId}>
            <Privacy/>
        </Layout>
    );
};

export default PrivacyPolicy;
