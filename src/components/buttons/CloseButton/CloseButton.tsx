// Component styles
import styles from './CloseButton.module.scss';
// Next components
import Image from 'next/image';
// Redux components
import { useDispatch } from 'react-redux';
import { toggleSearch } from '@/store/slices/search.slice';
// Helper functions
import updateWidth from '@/helpers/updateWidth';

export default function CloseButton() {
    const dispatch = useDispatch();

    return (
        <button className={styles.CloseButton} onClick={() => dispatch(toggleSearch())}>
            <Image 
                alt='Close' 
                src={require('/public/images/ui/close.svg')} 
                width="0" 
                height="48" 
                onLoadingComplete={e => updateWidth(e)} />
        </button>
    );
}