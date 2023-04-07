// Component styles
import styles from './CloseButton.module.scss'
// Next components
import Image from 'next/image'
// Redux components
import { useDispatch } from 'react-redux'
import { toggleSearch } from '@/store/slices/search.slice'

export default function CloseButton() {
    const dispatch = useDispatch()

    return (
        <button className={styles.closebtn} onClick={() => dispatch(toggleSearch())}>
            <Image alt='Close' src={require(`/public/images/ui/close.svg`)} width="48" height="48" />
        </button>
    )
}