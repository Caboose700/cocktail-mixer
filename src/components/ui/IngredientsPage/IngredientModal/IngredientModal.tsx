// Component styles
import styles from './IngredientModal.module.scss';
// Next components
import Image from 'next/image';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleIngredientModal } from '@/store/slices/ingredientModal.slice';
import { useGetAllIngredientsQuery } from '@/store/api/api';
// Local components
import Ingredient from '@/components/ui/IngredientsPage/Ingredient/Ingredient';
// Type interfaces
import { Item } from '@/types/index';

export default function IngredientModal() {
    // Redux selectors
    const ingredientModalOpen = useSelector((state: RootState) => state.ingredientModal.open);
    const modalIngredient = useSelector((state: RootState) => state.ingredientModal.ingredient);
    // Redux API data
    const { data, isLoading, error } = useGetAllIngredientsQuery();

    const dispatch = useDispatch();
    const imagePath = require('/public/images/ui/close.svg');

    function slug (item: Item) {
        return `${item.Name.toLowerCase().replaceAll(' ', '-').replaceAll('/', '-')}`;
    }

    return (
        <>
            { ingredientModalOpen && data && modalIngredient &&
                <div className={styles.background}>
                    <div className={styles.modal}>
                        <button onClick={() => dispatch(toggleIngredientModal())}>
                            <Image 
                                alt="Close Modal" 
                                src={imagePath} />
                        </button>
                        <div className={styles.header}>
                            <span>{modalIngredient.Name}</span>
                            <Image 
                                alt={modalIngredient.Name} 
                                src={require(`/public/images/ui/${slug(modalIngredient)}.webp`)} />
                        </div>
                        <div className={styles.childList}>
                            { data.filter((ingredient: Item) => ingredient.AliasId === modalIngredient.Id)
                                .map(ingredient => <Ingredient key={ingredient.Id} item={ingredient} section={[]} />) }
                        </div>
                    </div>
                </div> }
            { isLoading &&
                <h1>Loading...</h1> }
            { error &&
                <h1>Error!</h1> }
        </>
    );
}