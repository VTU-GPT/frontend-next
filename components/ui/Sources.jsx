import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const Sources = ({filename,link}) => {
    return (
        <div className='source-div'>
           <a href={link} target="_blank" rel="noopener noreferrer">
                <h4>{filename}</h4>
                <div>
                    <Image src='https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://vtu.ac.in//&size=128' width={20} height={20}/>
                    <p>. 1</p>
                </div>
            </a>
        </div>
    )
}

export default Sources