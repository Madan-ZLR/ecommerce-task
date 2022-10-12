import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
  CardContent,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Marquee from "react-fast-marquee";
import { Products } from "./Items";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

const ItemsPage = () => {
  const [value, setValue] = useState(0);
  const [productId, SetProductId] = useState(null);
  const [ItemDetail, SetItemDetail] = useState({});
  const [Product, SetProducts] = useState([]);
  const [Brand, SetBrand] = useState([]);
  const [CartItemsError, SetCartItemsError] = useState("");
  const [Search, SetSearch] = useState("All");
  const [SelectProduct, SetSelectedProduct] = useState(null);
  const [SelectBrand, SetSelectedBrand] = useState(null);
  const [SelectMinPrice, SetSelectedMinPrice] = useState(null);
  const [SelectMaxPrice, SetSelectedMaxPrice] = useState(null);
  const [SearchItems, SetSearchItems] = useState([]);
  const [CartItems, SetCartItems] = useState([]);
  const [totalMoney, SetTotalMoney] = useState(0);
  const [FilterItems,SetFilterItems]=useState([])
  const [ShowFilter,setShowFilter]=useState(0)
  //gettting data for Dropdowns
  useEffect(() => {
    var arr1 = [];
    var arr2 = [];
    for (let i = 0; i < Products.length; i++) {
      arr1.push(Products[i].name);
      arr2.push(Products[i].brand);
    }
    SetProducts([...new Set(arr1)]);
    SetBrand([...new Set(arr2)]);
  }, [0]);

  //getting users search items data
  useEffect(() => {
    if (Search === "All" || Search === "") {
      SetSearchItems(Products);
    } else {
      let arr = Products.filter((data) => {
        return (
          (Search.toLocaleLowerCase() === data.name.toLocaleLowerCase() ||
            Search === "All") &&
          (SelectProduct === data.name || SelectProduct === null) &&
          (SelectBrand === data.brand || SelectBrand === null) &&
          (data.price >= SelectMinPrice || SelectMinPrice === null) &&
          (data.price <= SelectMaxPrice || SelectMaxPrice === null)
        );
      });
      SetSearchItems(arr);
    }
  }, [Search]);

  // Getting Specific Item Details
  useEffect(() => {
    for (let i = 0; i < Products.length; i++) {
      if (productId === Products[i].id) {
        SetItemDetail(Products[i]);
      }
    }
  }, [productId]);

  const getFilterItems = () => {
   setValue(5)
    let arr = Products.filter((data) => {
      return (
        (Search.toLocaleLowerCase() === data.name.toLocaleLowerCase() || Search === "All") &&
        (SelectProduct === data.name || SelectProduct === null) &&
        (SelectBrand === data.brand || SelectBrand === null) &&
        (data.price >= SelectMinPrice || SelectMinPrice === null) &&
        (data.price <= SelectMaxPrice || SelectMaxPrice === null)
      );
    });
    console.log(arr);
    SetFilterItems(arr)
  };

  const AddToCart = (data) => {
    SetCartItems([...CartItems, data]);
    console.log(SetCartItems([...CartItems, data]));
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "orange",
          minWidth: "300px",
          display: "flex",
          flexDirection: "column",
          padding:2
        }}
        id="header"
      >
        <Marquee>
          <Typography variant="h4" color="secondary">
            Find Your Best Products and Buy it here
          </Typography>
        </Marquee>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "cennter",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <Button
            onClick={() => {
              setValue(0);
            }}
          >
            <HomeIcon fontSize="large" />
          </Button>
          <Button
            onClick={() => {
              setValue(2);
            }}
          >
            <ShoppingCartIcon fontSize="large" />
          </Button>
        </Stack>
      </Box>

      {/* Searchbar and Filter Fields Content  */}

      {(value === 0 || value===5) && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: "300px",
            justifyContent: "center",
            padding: 2,
            gap: 2,
          }}
        >
          <TextField
            type="text"
            placeholder="Search Products"
            onChange={(e) => {
              
              if (e.target.value !== "") SetSearch(e.target.value);
              else {
                SetSearch("All");
              }
            }}
          />
          <FormControl sx={{ m: 1, minWidth: 180, marginTop: 0 }}>
            <InputLabel>Product</InputLabel>
            <Select
              label="Product"
              onChange={(e) => {
                if (e.target.value !== "") SetSelectedProduct(e.target.value);
                else {
                  SetSelectedProduct(null);
                }
              }}
            >
              {Product.map((data, index) => {
                return (
                  <MenuItem key={index} value={data}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 180, marginTop: 0 }}>
            <InputLabel>Brand</InputLabel>
            <Select
              label="Brand"
              onChange={(e) => {
                if (e.target.value !== "") SetSelectedBrand(e.target.value);
                else {
                  SetSelectedBrand(null);
                }
              }}
            >
              {Brand.map((data, index) => {
                return (
                  <MenuItem key={index} value={data}>
                    {data}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>{" "}
          <TextField
            type="number"
            placeholder="Minmum Price"
            onChange={(e) => {
              if (e.target.value !== "") SetSelectedMinPrice(e.target.value);
              else {
                SetSelectedMinPrice(null);
              }
            }}
          />
          <TextField
            type="number"
            placeholder="Maximum Price"
            onChange={(e) => {
              if (e.target.value !== "") SetSelectedMaxPrice(e.target.value);
              else {
                SetSelectedMaxPrice(null);
              }
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={getFilterItems}
          >
            Apply Filters
          </Button>
        </Box>
      )}

      {
        value === 5 && <Box sx={{display:"flex",flexWrap:"wrap"}}>{FilterItems.map((data, index) => {
          return (
            <Card key={index} sx={{ width: 300, height: 400 }}>
              <CardMedia
                component="img"
                width="150"
                height="220"
                image={data.img}
                alt="Paella dish"
              />
              <CardContent>
                <Typography> Product Name :{data.name}</Typography>
                <Typography> Brand:{data.brand}</Typography>
                <Typography> Brand:{data.price}</Typography>
                <Stack spacing={2}>
                  <Button
                    size="medium"
                    variant="contained"
                    onClick={() => {
                      SetProductId(data.id);
                      setValue(1);
                    }}
                  >
                    View
                  </Button>
                  <Button
                    size="medium"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      AddToCart(data);
                    }}
                  >
                    Add To Cart
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          );
        })}</Box>
      }

      {value === 0 && (
        <Box
          sx={{
            border: 2,
            minWidth: 300,
            minHeight: 600,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {SearchItems.length > 0 ? (
            <>
              {SearchItems.map((data, index) => {
                return (
                  <Card key={index} sx={{ width: 300, height: 400 }}>
                    <CardMedia
                      component="img"
                      width="150"
                      height="220"
                      image={data.img}
                      alt="Paella dish"
                    />
                    <CardContent>
                      <Typography> Product Name :{data.name}</Typography>
                      <Typography> Brand:{data.brand}</Typography>
                      <Typography> Brand:{data.price}</Typography>
                      <Stack spacing={2}>
                        <Button
                          size="medium"
                          variant="contained"
                          onClick={() => {
                            SetProductId(data.id);
                            setValue(1);
                          }}
                        >
                          View
                        </Button>
                        <Button
                          size="medium"
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            AddToCart(data);
                          }}
                        >
                          Add To Cart
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })}
            </>
          ) : (
            " No Items "
          )}
        </Box>
      )}

      {/* Specifice Item Overview Functionality */}

      {value === 1 && (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Card sx={{ width: 600, height: 400 }}>
            <CardMedia
              component="img"
              height="350"
              image={ItemDetail.img}
              alt="Paella dish"
            />
          </Card>
          <Card sx={{ width: 600, height: 400 }}>
            <CardContent>
              <Typography variant="h5" color="primary">
                {" "}
                Product Name : {ItemDetail.name}
              </Typography>
              <Typography variant="h5" color="primary">
                {" "}
                Product ID : {ItemDetail.id}
              </Typography>
              <Typography variant="h5" color="primary">
                {" "}
                Product Price : {ItemDetail.price}
              </Typography>
              <Typography variant="h5" color="primary">
                Product Brand :{ItemDetail.brand}
              </Typography>
              <Typography variant="h5" color="primary">
                Product Description :{ItemDetail.pdes}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Cart Items View Functionality */}

      {value === 2 && (
        <Box sx={{ minWidth: "300px", display: "flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2}}>
          <Typography variant="h4" color="secondary">
            Your Cart Items
          </Typography>
          <Box
            sx={{
              border: 2,
             
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "300px",
            }}
          >
            {CartItems.length > 0 ? (
              <>
                {CartItems.map((data, index) => {
                  return (
                    <Card sx={{ width: 300, height: 300 }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={data.img}
                        alt="Paella dish"
                      />
                      <CardContent>
                        <Typography>Product Name : {data.name}</Typography>
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              SetTotalMoney(
                                (totalMoney) => totalMoney + data.price
                              );
                            } else {
                              SetTotalMoney(
                                (totalMoney) => totalMoney - data.price
                              );
                            }
                          }}
                        />
                      </CardContent>
                    </Card>
                  );
                })}
              </>
            ) : (
              "Your Cart Is Empty !"
            )}
          </Box>
          <Stack spacing={2}>
           
            <Typography variant="h4" color="secondary">
              Total Money : {totalMoney}{" "}
            </Typography>
            <Button
              variant="contained"
              fontSize="large"
              color="secondary"
              onClick={() => {
                if (totalMoney > 0) {
                  setValue(4);
                  SetCartItemsError("");
                } else {
                  SetCartItemsError(
                    "Please Select Atleast one Product to Place the Order"
                  );
                }
              }}
            >
              Place Order
            </Button>
          </Stack>
          {CartItemsError && (
            <Typography color="error">
              {CartItemsError}
            </Typography>
          )}
        </Box>
      )}

      {/* Order Confirmation Functionality */}

      {value === 4 && (
        <Stack sx={{ marginTop: 35, marginLeft: 80 }}>
          <Typography color="primary" fontSize="40px">
            Order Confirmed
          </Typography>
          <Typography color="primary" fontSize="40px">
            Thanks for Choseing our Website
          </Typography>
        </Stack>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "skyblue",
          minHeight: 80,
        }}
      >
        <Typography color="primary">JOhnStore.com</Typography>
        <Typography color="primary">JOhnStore.com @ Private Limited</Typography>
      </Box>
    </>
  );
};

export default ItemsPage;
