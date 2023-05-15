// Component styles
import styles from './NavMenuCategory.module.scss'
// Redux components
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
// Next components
import Image from 'next/image'
import Link from 'next/link'
// Local components
import NavMenuItem from '@/components/navmenu/item/NavMenuItem'
// Type interfaces
import { IngredientDict, Type, Item } from '@/types/index';

export default function NavMenuCategory(props: {type: string}) {
    // Import props
    const {type} = props
    const storedIngredients: IngredientDict = useSelector((state: RootState) => state.ingredients.stored);

    const imagePath = require(`/public/images/ui/expand_more.svg`)

    const menuItems = (() => {
        const links: Item[] = [];
        
        Object.keys(storedIngredients[type]).forEach(key => {
            storedIngredients[type][key].forEach(item => {
                links.push(item);
            })
        })

        return links;
    })()

    return (
        <li className={styles.category}>
            <button>
                <span>{type}</span>
                <Image alt='Expand' src={imagePath} width="40" height="40" />
            </button>
            <ul>
                { menuItems.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link href={`/${item.Name.toLowerCase()}`}>
                                <NavMenuItem item={item.Name} />
                            </Link>
                        </li>
                    );
                }) }
            </ul>
        </li>
    )
}