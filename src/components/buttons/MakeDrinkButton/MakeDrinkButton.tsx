// Component styles
import styles from './MakeDrinkButton.module.scss';
// Next components
import Image from 'next/image';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function MakeDrinkButton () {
    return (
        <button className={styles.MakeDrinkButton}>
            <Image 
                alt="Make a Drink" 
                src={require('/public/images/ui/select-ingredients.webp')} 
                width="0" 
                height="48" 
                onLoadingComplete={e => updateWidth(e)} />
            <span>Make A Drink!</span>
        </button>
    );
}