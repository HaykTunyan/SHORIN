import React from 'react';
import {useRouter} from 'next/router';

interface IBtnPrimary {
    href: string,
    name: string,
    color: string
}

const BtnSec = ({href, name, color}: IBtnPrimary) => {
    const router = useRouter();

    return (
        <button
            className={'btnSec'}
            onClick={() => router.push(`/${href}`)}
        >
            <div className={'secBtnInner'}>
                <span style={{color}}>{name}</span>
            </div>
            <div className={'bottomLine2'}></div>
        </button>
    );
};

export default BtnSec;
