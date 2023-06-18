// Component styles
import styles from './AddDrinkCard.module.scss';
// Redux components
import { useGetAllIngredientsQuery } from '@/store/api/api';
// React components
import { useState, useEffect, useCallback } from 'react';
// Type interfaces
import { Item } from '@/types/index';
// Local components
import IngredientField from './IngredientField/IngredientField';
import DirectionField from './DirectionField/DirectionField';

export default function AddDrinkCard () {
    const [recipeCount, setRecipeCount] = useState(Array.from(Array(1).keys()));
    const [directionCount, setDirectionCount] = useState(Array.from(Array(1).keys()));
    const allIngredients = useGetAllIngredientsQuery();
    const [ingredients, setIngredients] = useState([] as Item[]);

    useEffect(() => {
        if (allIngredients.isSuccess) {
            setIngredients(allIngredients.data);
        }
    }, [allIngredients]);

    useEffect(() => {
        console.log(recipeCount);
    }, [recipeCount]);

    const removeDirection = useCallback((e: React.MouseEvent<HTMLButtonElement>, i: number) => {
        e.preventDefault();
        
        if (directionCount.length > 1) {
            for (let j = i; j <= directionCount.length; j++) {
                const container = document.getElementById(`dir-${j}-container`) as HTMLDivElement;
                const direction = document.getElementById(`dir-${j}`) as HTMLInputElement;

                container?.id === `dir-${j - 1}-container`;
                direction?.id === `dir-${j - 1}`;

                if (j < recipeCount.length) {
                    direction.value = (document.getElementById(`dir-${j + 1}`) as HTMLInputElement)?.value;
                }
            }

            setDirectionCount((prev: number[]) => prev.slice(0, (prev.length - 1)));
        }
    }, [directionCount.length, recipeCount.length]);

    const addIngredient = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setRecipeCount((prev: number[]) => [...prev, (prev.length)]);
    }, []);

    const addDirection = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDirectionCount((prev: number[]) => [...prev, (prev.length)]);
    }, []);

    const removeIngredient = useCallback((e: React.MouseEvent<HTMLButtonElement>, i: number) => {
        e.preventDefault();
        
        if (recipeCount.length > 1) {
            for (let j = i; j <= recipeCount.length; j++) {
                const container = document.getElementById(`item-${j}-container`) as HTMLDivElement;
                const name = document.getElementById(`item-${j}-name`) as HTMLSelectElement;
                const amount = document.getElementById(`item-${j}-amount`) as HTMLInputElement;
                const unit = document.getElementById(`item-${j}-unit`) as HTMLSpanElement;

                container?.id === `item-${j - 1}-container`;
                name?.id === `item-${j - 1}-name`;
                amount?.id === `item-${j - 1}-amount`;
                unit?.id === `item-${j - 1}-unit`;

                if (j < recipeCount.length) {
                    name.value = (document.getElementById(`item-${j + 1}-name`) as HTMLSelectElement)?.value;
                    amount.value = (document.getElementById(`item-${j + 1}-amount`) as HTMLInputElement)?.value;
                    unit.innerHTML = (document.getElementById(`item-${j + 1}-unit`) as HTMLSpanElement)?.innerHTML;
                }
            }

            setRecipeCount((prev: number[]) => prev.slice(0, (prev.length - 1)));
        }
    }, [recipeCount.length]);

    return (
        <div className={styles.AddDrinkCard}>
            <header>
                <strong>Add New Drink</strong>
            </header>
            <form action="" method="post">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Name"/><br/>
                <label htmlFor="recipe-credit">Recipe Credit:</label>
                <input type="text" id="recipe-credit" name="recipe-credit" placeholder="Add Credit (Optional)"/><br/>
                <fieldset>
                    <legend>Recipe</legend>
                    { recipeCount.map((i: number) => {
                        return (
                            <IngredientField 
                            key={i} 
                            i={i} 
                            ingredients={ingredients} 
                            removeIngredient={removeIngredient} />
                        );
                    }) }
                    <button onClick={addIngredient}>
                        <span>Add Ingredient</span>
                    </button>
                </fieldset><br/>
                <fieldset>
                    <legend>Directions</legend>
                    { directionCount.map((i: number) => {
                        return (
                            <DirectionField 
                                key={i} 
                                i={i} 
                                removeDirection={removeDirection} />
                        );
                    }) }
                    <button onClick={addDirection}>
                        <span>Add Direction</span>
                    </button>
                </fieldset>
                <label htmlFor="image">Image:</label>
                <input type="file" id="image" name="image" accept=".webp"/><br/>
                <label htmlFor="img-credit">Image Credit:</label>
                <input 
                    type="text" 
                    id="img-credit" 
                    name="img-credit" 
                    placeholder="Add Image Credit (Optional)"/><br/>
                <input 
                    type="submit" 
                    value="Submit" 
                    className={styles.submit} />
            </form>
        </div>
    );
}