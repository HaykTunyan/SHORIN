import React from 'react';
import {useRouter} from 'next/router';

interface IBtnPrimary {
    href: string,
    name: string,
    color?: string
}

const BtnPrimary = ({href, color, name}: IBtnPrimary) => {
    const router = useRouter();
    
    return (
        <button
            className={'btn'}
            onClick={() => router.push(`/${href}`)}
        >
            <div className={'btnInnerContainer'}>
                <span style={{color}}>{name}</span>
                <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M3 13.875H25M25 13.875L18.125 7M25 13.875L18.125 20.75' stroke='black'
                          strokeWidth='2'
                          strokeLinecap='square'/>
                </svg>
            </div>
            <div className={'bottomLine'}></div>
        </button>
    );
};

export default BtnPrimary;
