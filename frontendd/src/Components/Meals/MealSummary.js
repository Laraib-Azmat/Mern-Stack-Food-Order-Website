import { motion } from 'framer-motion';
import styles from './MealSummary.module.css'

const MealSummary = () => {
    return (
        <motion.section
        initial={{ opacity: 0, scale:0 }}
        animate={{opacity:1,scale:1}}
        transition={
          {type:'spring', delay:0.3, damping:10, stiffness:120}
         }
        className={styles.summary}>
          <h2>Delicious Food, Delivered To You</h2>
          <p>
            Choose your favorite meal from our broad selection of available meals
            and enjoy a delicious lunch or dinner at home.
          </p>
          <p className={styles.hidePara}>
            All our meals are cooked with high-quality ingredients, just-in-time and
            of course by experienced chefs!
          </p>
        </motion.section>
      );
}

export default MealSummary;