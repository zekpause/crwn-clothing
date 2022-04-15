import { CategoryContainer, CategoryTitle } from './category.styles';
import ProductCard from '../../components/product-card/product-card.component';
import { useEffect, useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';
import Spinner from '../../components/spinner/spinner.component';


const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            {
                isLoading
                    ?
                    (<Spinner />)
                    :
                    (<CategoryContainer>
                        {
                            products &&
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            )
                            )
                        }
                    </CategoryContainer>)


            }
        </Fragment>
    )
}


export default Category;