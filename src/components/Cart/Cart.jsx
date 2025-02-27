import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import { List, ListItem, ListItemText, Typography, Button, Divider, TextField } from "@mui/material";

const Cart = () => {
  const { cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div style={{width: "70%" , margin: "100px auto"}}>
      <Typography variant="h4">Shopping Cart</Typography>
      <Typography variant="subtitle1">Total Items: {totalQuantity}</Typography>
      <Typography variant="subtitle1">Total Price: ${totalPrice.toFixed(2)}</Typography>
      <Divider />

      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id} divider>
            <ListItemText primary={item.title} secondary={`$${item.price}`} />
            <TextField
              type="number"
              value={item.quantity}
              onChange={(e) => dispatch(updateQuantity({ id: item.id, amount: Number(e.target.value) }))}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: 60, mr: 2 }}
            />
            <Button variant="contained" color="secondary" onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Cart;
