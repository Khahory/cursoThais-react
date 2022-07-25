export default function cartReducer(cart, action){
    switch (action.type){
        case 'empty':
            return [];
        case 'add':
            const {id, sku} = action;
            const itemInCart = cart.find((i) => i.sku === sku);
            // valida mos que tenemos algo
            if (itemInCart){
                // crearemos una copia nueva de los item pero con un campo cambaindo su valor
                return cart.map((i) =>
                    i.sku === sku ? {...i, quantity: i.quantity + 1} : i
                );
            } else  {
                //return new array with the new item insertadp
                return [...cart, {id, sku, quantity: 1}]
            }
    
        //cambiamos la cantidad del item, retornamos la copia de los item actual
        //lo buscamo para saber cual es (en el carrito tenemos varios item)
        //cuando esta identificado pues agregamos su cantidad que seleccionamos donde ns
        //todo viene desde el hijo
        case 'updateQuantity': {
            const {quantity, sku} = action;
            //en caso de que quiera eliminarlo
            if (quantity === 0){
                return cart.filter((i) => i.sku !== sku);
            }
            return cart.map((i) => (i.sku === sku ? {...i, quantity} : i))
        }
    
        default:
            throw new Error('Que accion es esa palomo: ' +action.type);
    }
}
