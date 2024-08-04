'use client'; // to ake it a client sied app 
import Image from "next/image";
import {useState,useEffect} from "react";
import{firestore} from "@/firebase";
import {Box, Modal, Stack, Button,TextField, Typography} from "@mui/material";
import { collection, deleteDoc, getDocs, query, setDoc } from "firebase/firestore";

export default function Home() {

  // declares a state variable named inventory that is initialized with an empty array
  // the fucntion setInventory updates the list 
  const [inventory, setInventory] = useState([]);
  // 
  const [open,setOpen] = useState(true)

  // declare a state variable named itemName and a function to update it
  // useState('') initializes itemName with an empty string 
  const [itemName, setItemName] = useState('')

  // gets a snapshot of the collection by making a query to firebase
  const updateInventory = async () => {

    const snapshot = query(collection(firestore,"inventory"))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
      name: doc.id,
      ...doc.data(),

      })

    })
    setInventory(inventoryList)
  }


// helper function to add an item to the inventory and update its quantity
const addItems = async(item) => {

  const docRef = doc(collection(firestore, "inventory"), item)
  const docSnap = await getDoc(docRef)

  // if the item exists in the db then we increase the quanity of that item by 1 
  if(docSnap.exists()){
    const {quantity} = docSnap.data()
    await setDoc(docRef, {quantity: quanity+1})
  }// if the item doesnt exist in the db yet i.e its being added for the first time, set the quantity to 1 
  else {
    await setDoc(docref,{quantity:1})
  }
  // update the inventory to reflect the items added / increase in thei quantity 
    await updateInventory()
}

// helper fucntion that lets us remove items from our list 
const removeItems = async(item) => {

  const docRef = doc(collection(firestore, "inventory"), item)
  const docSnap = await getDoc(docRef)
// if the quantity of the item is = 1, we delete
  if(docSnap.exists()){
    const {quantity} = docSnap.data()
    if (quantity===1)
    {
      await deleteDoc(docRef)
    
    }
    else
    {
        await setDoc(docRef, {quantity: quanity-1})
    }
  }
    await updateInventory()
}





  useEffect( () => {
    updateInventory()
  },[])

  const handleOpen = () =>setOpen(true)
  const handleClose = () =>setOpen(false)

  return( 
  <Box width= "100vw"
   height = "100vh" 
   display="flex" 
   justifyContent="center" 
   alignItems ="center"
   gap={2}
  > 

  <Modal open={open} onClose={handleClose}> 


    <Box position ="absolute"
      top ="50%" 
      left="50%"
      width={400} 
      bgcolor="white" 
      border="2px solid #0000" 
      boxShadow ={24} 
      p={4}
      display = "flex"
      flexDirection = "column"
      gap ={3}
      sx={{
        transform:"translate(-50%,50%)" 
      }}
    >  

      <Typography variant="h6">Add Item</Typography>

      <Stack width ="100%" direction="row" spacing={2}> 
          <TextField  
          variant="outlined"
          fullWidth
          value ={itemName}
          onChange = {(e)=>{

            setItemName(e.target.value)

          }}
          />

       <Button 
        variant ="outlined"

       onClick={() =>{
         addItem(itemName)
         setItemName('')
         handleClose()

       }}
       
       >Add</Button>
    
      </Stack>
    
    </Box>
  </Modal>



    
    <Typography variant = "h1">Pantry Mangement</Typography>
   

    </Box>
  )
}
