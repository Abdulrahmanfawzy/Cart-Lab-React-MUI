import { Container, Typography } from "@mui/material";
import ProductList from "../ProductList/ProductList";
import Cart from "../Cart/Cart";

export default function Home() {
  return (
    <div style={{margin: "50px 0"}}>
      
      <Container>
      <Typography variant="h3" textAlign="center" my={4}>
      </Typography>
      <ProductList />
      </Container>

    </div>
  )
}
