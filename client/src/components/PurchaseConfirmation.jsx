import React from 'react';
import { Link } from 'react-router-dom';

const PurchaseConfirmation = () => {
    return (
        <div>
            <h2>¡Compra realizada exitosamente!</h2>
            <p>Gracias por tu compra.</p>
            <Link to="/profile/purchases">
                <button>Ver compras</button>
            </Link>
        </div>
    );
};

export default PurchaseConfirmation;
