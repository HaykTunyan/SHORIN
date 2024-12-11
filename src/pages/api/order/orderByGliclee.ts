// Create Order By GIclee.

export const createOrderByGiclee = async (orderData: any) => {
    try {
      const backEndUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  
      if (!backEndUrl) {
        throw new Error('Backend URL is not defined.');
      }
  
      const response = await fetch(`${backEndUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }
  
      const data = await response.json();
  
      return data;
    } catch (error) {
      throw error;
    }
  };
