'use client'; // to make it a client side app
import Image from "next/image";
import { useState, useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Modal, Stack, Button, TextField, Typography } from "@mui/material";
import { collection, doc, deleteDoc, getDocs, getDoc, query, setDoc } from "firebase/firestore";

export default function Home() {

  // Declares a state variable named inventory that is initialized with an empty array
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  // Gets a snapshot of the collection by making a query to Firebase
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  };

  // Helper function to add an item to the inventory and update its quantity
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    // If the item exists in the db then we increase the quantity of that item by 1
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      // If the item doesn't exist in the db yet, set the quantity to 1
      await setDoc(docRef, { quantity: 1 });
    }
    // Update the inventory to reflect the items added / increase in their quantity
    await updateInventory();
  };

  // Helper function that lets us remove items from our list
  const removeItems = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    // If the quantity of the item is 1, we delete it
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity == 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

       <Box 
       
       width="350vw"
       height="250vh"
     
     
     
    
      backgroundColor ="pink"
      gap={2}>




    <Box
      width="250vw"
      height="250vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor =""
      gap={2}
    >  
  
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          backgroundColor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)"
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleOpen}>
        Add new item
      </Button>
      <Box border="1px solid #333">
        <Box
          width="800px"
          height="100px"
          bgcolor="#f1d302"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" color="#">
            Inventory Items
          </Typography>
        </Box>
      

      <Stack width="800px" height="300px" spacing={1} overflow="auto">



      <Box> 

      
          
          
      <Box
            key={name}
            width="50%"
            minHeight="150px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="#"
            padding={2}
          >     
          
          <Typography
          variant="h5"
          color="Black"
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          >
           Item Name
          </Typography>

          <Typography
          variant="h5"
          color="Black"
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          >
           Quantity 
          </Typography>


          </Box>  

         




</Box>
        {inventory.map(({ name, quantity }) => (
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="#"
            padding={3}
          >
            



            <Typography
              variant="h3"
              color="black"
              textAlign="center"
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>

            <Typography
              variant="h3"
              
              textAlign="center"
            >
               {quantity}
            </Typography>
            <Button variant = "contained" onClick={ () => addItem(name)

            }> 
            +
            </Button>
            <Button variant = "contained" onClick={() => removeItems(name)}>
              -
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>


    </Box>


   


   </Box>
  );
}
