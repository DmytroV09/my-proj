import styles from "./buttonStyles.css";

const Button = () => {
  return (
    <button className={styles.redButton}>
      Click me
    </button>
  );
};

import styles from './AddToCartButton.module.css';

const AddToCartButton = () => {
  return (
    <button className={styles.button}>
      Додати в кошик
    </button>
  );
};

import styles from './ProductList.module.css';

const ProductList = ({products}) => {
  return (
    <div className={styles.container}>
      {products.map(product => (
        <div key={product.id} className={styles.product}>
          <img src={product.image} alt={product.name} className={styles.image}/>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.price}>Ціна: {product.price} грн</p>
        </div>
      ))}
    </div>
  );
};

import styles from './ProductPage.module.css';

const ProductPage = ({product}) => {
  return (
    <div className={styles.container}>
      <img src={product.image} alt={product.name} className={styles.image}/>
      <h2 className={styles.name}>{product.name}</h2>
      <p className={styles.description}>{product.description}</p>
      <p className={styles.price}>Ціна: {product.price} грн</p>
      <button className={styles.button}>Додати в кошик</button>
    </div>
  );
};

import styles from './OrderForm.module.css';

const OrderForm = () => {
  return (
    <form className={styles.form}>
      <input type="text" placeholder="Ім'я" className={styles.input}/>
      <input type="email" placeholder="Електронна пошта" className={styles.input}/>
      <textarea placeholder="Адреса доставки" className={styles.textarea}/>
      <button className={styles.button}>Замовити</button>
    </form>
  );
};
