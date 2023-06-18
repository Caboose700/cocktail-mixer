// Page styles
import styles from '@/styles/Ingredients.module.scss';
// Next components
import type { NextPage } from 'next';
// React components
import { useEffect, useCallback } from 'react';
// Redux components
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllIngredientsQuery, useLazyGetMultipleDrinkInfoQuery } from '@/store/api/api';
import { RootState } from '@/store/store';
import { addPossibleDrink } from '@/store/slices/drinks.slice';
// Type interfaces
import { Item, Drink } from '@/types/index';
// Local components
import Footer from '@/components/footer/Footer';
import IngredientsTitle from '@/components/ui/IngredientsPage/IngredientsTitle/IngredientsTitle';
import IngredientsSection from '@/components/ui/IngredientsPage/IngredientsSection/IngredientsSection';
import LoadingAnimation from '@/components/loading/LoadingAnimation';
import ServerError from '@/components/error/ServerError';

const IngredientsPage: NextPage = () => {
    const allIngredients = useGetAllIngredientsQuery();
    const storedIngredients = useSelector((state: RootState) => state.ingredients.stored);
    const dispatch = useDispatch();
    const [getDrinkInfo, result] = useLazyGetMultipleDrinkInfoQuery();

    useEffect(() => {
        if (result && result.data) {
            for (const drink of result.data) {
                dispatch(addPossibleDrink(drink));
            }
        }
    }, [result, dispatch]);

    const getDrinks = useCallback((ids: string) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append('ingredients', ids);

        fetch('https://api.makedr.ink/drinks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: urlencoded,
            redirect: 'follow'
        }).then(res => {
            return res.json();
        }).then(data => {
            const ids: number[] = [];

            data.Drinks.forEach((drink: Drink) => {
                ids.push(drink.Id);
            })

            getDrinkInfo(ids);
        }).catch(err => {
            console.log(err);
        });
    }, [getDrinkInfo]);

    useEffect(() => {
        const ingredientIds: number[] = [];

        for (const type of Object.keys(storedIngredients)) {
            for (const key of Object.keys(storedIngredients[type])) {
                for (let i = 0; i < storedIngredients[type][key].length; i++) {
                    const id = storedIngredients[type][key][i].Id;
                    
                    if (id) {
                        ingredientIds.push(id);
                    }
                }
            }
        }

        if (ingredientIds.length) {
            getDrinks(ingredientIds.join());
        }
    }, [storedIngredients, getDrinks, dispatch]);

    return (
        <>
            { allIngredients.data && 
                <main className={styles.IngredientsPage}>
                    <IngredientsTitle />
                    <IngredientsSection 
                        section='Alcohol' 
                        ingredients={(allIngredients.data as Item[])} />
                    <IngredientsSection 
                        section='Mixers' 
                        ingredients={(allIngredients.data as Item[])} />
                    <Footer />
                </main> }
            { allIngredients.isLoading &&
                <main className={styles.IngredientsPage}>
                    <LoadingAnimation />
                </main> }
            { allIngredients.isError &&
                <main className={styles.IngredientsPage}>
                    <ServerError />
                </main> }
        </>
    );
}

export default IngredientsPage;
