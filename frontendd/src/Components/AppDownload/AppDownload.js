import React from 'react';
import appStyle from './AppDownload.module.css';
import { assets } from '../../assets/assets';
import { delay, motion } from 'framer-motion';

const AppDownload = () => {
  return (
    <div className={appStyle['app-download']} id='app-download'>
        <motion.p
        initial={{ opacity: 0, y: -50 }}
        whileInView={{opacity:1,y:0}}
        transition={
          {type:'spring', delay:0.2, damping:10, stiffness:120}
         }
        >For Better Experience Download <br/> <span style={{color:'#8a2b06',fontWeight:600}}>OrdFoo. App</span></motion.p>

        <div className={appStyle['app-platform']}>

            <motion.img
            initial={{ opacity: 0, x: -40 }}
            whileInView={{opacity:1,x:0}}
            whileHover={{scale:1.1}}
            transition={
              {type:'spring', delay:0.2, damping:10, stiffness:120}
             }
            src={assets.play_store} alt='play-store' />
            <motion.img
            initial={{ opacity: 0, x: 40 }}
            whileInView={{opacity:1,x:0}}
            whileHover={{scale:1.1}}
            transition={
              {type:'spring', delay:0.2, damping:10, stiffness:120}
             }
            src={assets.app_store} alt='app-store' />

        </div>
        
    </div>
  )
}

export default AppDownload