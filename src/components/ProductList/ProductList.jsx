import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addToCart } from "../../redux/cartSlice";
import { Grid, Card, CardContent, CardMedia, Typography, Button, Skeleton, Alert } from "@mui/material";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <Grid container spacing={2}>
        {[...Array(4)].map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (status === "failed") {
    return <Alert severity="error">Error: {error}</Alert>;
  }

  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <Card>
            <CardMedia component="img" sx={{objectFit: "contain",margin: "10px 0"}} height="200" image={product.image} alt={product.title} />
            <CardContent>
              <Typography variant="h6">{product.title.split(" ").slice(0,5).join(" ")}</Typography>
              <Typography color="textSecondary">${product.price}</Typography>
              <Button variant="contained" color="primary" fullWidth onClick={() => dispatch(addToCart(product))}>
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
