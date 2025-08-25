export const createUser = async (user: any) => {
  console.log("Test 1");
  const result = await fetch(
    "https://backend-ecommerce-mobile-app.onrender.com/user/create-user/",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  console.log("Test 5", result);
  // console.log("Hii");
  // return result;
};
