import { Item } from '@/types/index'
import styles from './Ingredient.module.scss'
import Image from 'next/image'
import IngredientCheckbox from '@/components/inputs/IngredientCheckbox/IngredientCheckbox'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleIngredientModal, setModalIngredient } from '@/store/slices/ingredientModal.slice'
import { RootState } from '@/store/store'

export default function Ingredient (props: { item: Item, section: Item[] }) {
    const { item, section } = props
    const [hasChildren, setHasChildren] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()
    const { availableIngredients } = useSelector((state: RootState) => state.ingredients)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const state = localStorage.getItem(`${item['Name']}`)

            if (state) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        }

        section.forEach(ingredient => {
            if (ingredient['AliasId'] === item['Id']) {
                setHasChildren(true)

                if (localStorage.getItem(`${ingredient['Name']}`)) {
                    setIsChecked(true);
                }
            }
        })
    }, [])

    function changeLocalStorage() {
        const prevValue = JSON.parse(localStorage.getItem(item['Name']) || 'false')
        
        if (prevValue) {
            setIsChecked(false)
            localStorage.removeItem(item['Name'])
        } else {
            setIsChecked(true)
            localStorage.setItem(item['Name'], 'true')
        }
    }

    function handleClick () {
        if (hasChildren) {
            dispatch(setModalIngredient(item))
            dispatch(toggleIngredientModal())
        } else {
            changeLocalStorage()
        }
    }

    return (
        <li className={styles.Ingredient}>
            <button className={styles.info} onClick={ () => handleClick()}>
                { hasChildren && <Image className={styles.children} alt="Show Varieties" src={require(`/public/images/ui/more_vert.svg`)} width="8" height="64" /> }
                <div className={styles.icon}>
                    <Image alt={item['Name']} src={require(`/public/images/ui/${item['Name'].toLowerCase().split(" ").join("-").replaceAll("/", "-")}.webp`)} />
                </div>
                <IngredientCheckbox item={item} isChecked={isChecked} />
            </button>
            <span>{item['Name']}</span>
        </li>
    )
}