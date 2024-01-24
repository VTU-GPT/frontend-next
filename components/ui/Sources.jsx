import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
const Sources = () => {
    return (
        <div className='source-div'>
            <Link href='/'>
                <h4>About VTU Visvesvaraya..</h4>
                <div>
                    <Image src='https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://vtu.ac.in//&size=128' width={20} height={20}/>
                    <p>. 1</p>
                </div>
            </Link>
        </div>
    )
}

export default Sources