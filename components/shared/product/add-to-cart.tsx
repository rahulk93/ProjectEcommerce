'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus, Minus, Loader } from 'lucide-react';
import { Cart, CartItem } from '@/types';
import { toast } from "sonner"; 
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { useTransition } from 'react'

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem}) => {
const router = useRouter();

const [isPending, startTransition] = useTransition();
    
const handleAddToCart = async () => {
  startTransition(async () => { 
    const res = await addItemToCart(item);

if (!res.success) {
      toast.error(res.message); 

      return;  
    }
    // Handling success add to cart
    toast(res.message,{ 
        action: (
        <Button
          className="bg-primary text-white hover:bg-gray-800"
          onClick={() => router.push("/cart")}
        >
          Go to cart
        </Button>
        ),
    });
  })
}

// Remove item from cart
const handleRemoveFromCart = async () => {
  startTransition(async () => {
  const res = await removeItemFromCart(item.productId);

  if (res.success) {
      toast.success(res.message);
    }

  return;
  })
};

//Check if item is in cart
const existItem = cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
  <div>
    <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
      {isPending ? (
        <Loader className='w-4 h-4  animate-spin' />
      ) : (
        <Minus className='w-4 h-4' />
      )}
    </Button>
    <span className='px-2'>{existItem.qty}</span>
    <Button type='button' variant='outline' onClick={handleAddToCart}>
      {isPending ? (
        <Loader className='w-4 h-4  animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}
    </Button>
  </div>
) : (
  <Button className='w-full' type='button' onClick={handleAddToCart}>
          {isPending ? (
        <Loader className='w-4 h-4  animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}{' '}
    Add to cart
  </Button>
);
}

export default AddToCart;