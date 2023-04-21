import axios from "axios";
const url = 'http://localhost:8000'

export const checkAPI = () => {
    axios.get(url + '/').then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
}


export const sendJSON = (user) => {
    console.log(user)
    axios.put(url + '/parse', user).then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
}


///██╗░░░██╗░██████╗███████╗██████╗░
///██║░░░██║██╔════╝██╔════╝██╔══██╗
///██║░░░██║╚█████╗░█████╗░░██████╔╝
///██║░░░██║░╚═══██╗██╔══╝░░██╔══██╗
///╚██████╔╝██████╔╝███████╗██║░░██║
///░╚═════╝░╚═════╝░╚══════╝╚═╝░░╚═╝

export const addUser = (user) => {
   axios.post(url + '/user', user).then((res) => {
     console.log(JSON.stringify(res.data))
   }).catch((err) => {
         console.log(err)
  })
}

  export  const getUsers = () => {
    axios.get(url + '/users').then((res) => {
      alert(JSON.stringify(res.data))
    }).catch((err) => {
      console.log(err)
    })
  }

 export const clearUsers = () => {
    axios.delete(url + '/users/clear').then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

// get user with '/user?email='someEmail'
export const getUserByEmail = async (email) => {
  let response
  try {
    response = await axios.get(
      url + `/user?email=${email}`
    )
  } catch (err) {
    console.log(err)
  }
  return response.data["0"]
}

// login user with '/user?email='someEmail'&password='somePassword'
export const login = async (email, password) => {
  let response
  try {
    response = await axios.get(
  url + `/login?email=${email}&password=${password}`
  )} catch (err) {
      console.log(err)
  }
  return response.data["0"]
};

// get user with '/user?user_id='someUser_id'
export const getUserById = async (user_id) => {
  let response
  try {
    response = await axios.get(
  url + `/user?user_id=${user_id}`
  )} catch (err) {
      console.log(err)
  }
  return response.data["0"]
}

// update password at '/user?email='someEmail'' with parameter password
export const updatePassword = async (email, password) => {
  const data = {password:`${password}`}
  let response
  try {
    response = await axios.put(
  url + `/user?email=${email}`, data
  )} catch (err) {
      console.log(err)
  }
  return response.data
}

export const updateProfile = async (email, bio, prof_pic_choice, location, phone) => {
  const data = { bio: `${bio}`, prof_pic_choice: prof_pic_choice, location: `${location}`, phone: `${phone}` }
  let response
  try {
    response = await axios.put(
      url + `/user?email=${email}`, data
    )
  } catch (err) {
    console.log(err)
  }
  return response.data
}


///████████╗██████╗░██╗░░░██╗░█████╗░██╗░░██╗░░░░██╗░█████╗░███╗░░░███╗███████╗███╗░░██╗██╗████████╗██╗░░░██╗
///╚══██╔══╝██╔══██╗██║░░░██║██╔══██╗██║░██╔╝░░░██╔╝██╔══██╗████╗░████║██╔════╝████╗░██║██║╚══██╔══╝╚██╗░██╔╝
///░░░██║░░░██████╔╝██║░░░██║██║░░╚═╝█████═╝░░░██╔╝░███████║██╔████╔██║█████╗░░██╔██╗██║██║░░░██║░░░░╚████╔╝░
///░░░██║░░░██╔══██╗██║░░░██║██║░░██╗██╔═██╗░░██╔╝░░██╔══██║██║╚██╔╝██║██╔══╝░░██║╚████║██║░░░██║░░░░░╚██╔╝░░
///░░░██║░░░██║░░██║╚██████╔╝╚█████╔╝██║░╚██╗██╔╝░░░██║░░██║██║░╚═╝░██║███████╗██║░╚███║██║░░░██║░░░░░░██║░░░
///░░░╚═╝░░░╚═╝░░╚═╝░╚═════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░░░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝╚═╝░░╚══╝╚═╝░░░╚═╝░░░░░░╚═╝░░░

export const getTrucksByEmail = async (email) => {
  let response
  try {
    response = await axios.get(
    url + `/user_trucks?email=${email}`
  )} catch (err) {
    console.log(err)
  }
  return response.data
}

export const getTruckById = async (truck_id) => {
  let response
  try {
    response = await axios.get(
    url + `/truck?truck_id=${truck_id}`
  )} catch (err) {
    console.log(err)
  }
  return response.data
}

//Gets all trucks that are currently available for rent
export const getAvailableTrucks = async () => {
  let response
  try {
    response = await axios.get(
  url + `/trucks`
  )} catch (err) {
      console.log(err)
  }
  return response.data
}

export const getReviewsByTruckId = async (truck_id) => {
  try {
    const response = await axios.get(url + `/reviews?truck_id=${truck_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// to truck listing
export const addReview = async (user_id, truck_id, userName, rating, comment) => {
  try {
    const response = await axios.post(url + '/reviews', {
      user_id,
      truck_id,
      userName,
      review_rating: rating,
      review_text: comment,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAmenitiesByTruckId = async (truck_id) => {
  let response;
  try {
    response = await axios.get(url + `/amenity?truck_id=${truck_id}`);
  } catch (err) {
    console.log(err);
  }
  console.log(response);
  return response.data;
};

export const addTruckAmenity = async (truck_id,amenity_name,amenity_price) => {
  const data = { amenity_name:`${amenity_name}`,amenity_price:amenity_price}
  let response
  try {
    response = await axios.post(
    url + `/amenity?truck_id=${truck_id}`, data
  )} catch (err) {
    console.log(err)
  }
  return response.data
}

export const addTruck = async (email, model, make, year, mileage, max_miles, long_discount_days, long_discount_percent, long_discount_flat,truck_image) => {
  const data = {email:`${email}`, model:`${model}`, make:`${make}`, year:`${year}`, mileage:`${mileage}`, max_miles:max_miles, long_discount_days:long_discount_days, 
    long_discount_percent:long_discount_percent, long_discount_flat:long_discount_flat,truck_image:`${truck_image}`}
  let response
  try {
    response = await axios.post(
    url + `/truck`, data
  )} catch (err) {
    console.log(err)
  }
  return response.data
}


///██████╗░██╗░░░██╗███╗░░██╗██████╗░██╗░░░░░███████╗░██████╗
///██╔══██╗██║░░░██║████╗░██║██╔══██╗██║░░░░░██╔════╝██╔════╝
///██████╦╝██║░░░██║██╔██╗██║██║░░██║██║░░░░░█████╗░░╚█████╗░
///██╔══██╗██║░░░██║██║╚████║██║░░██║██║░░░░░██╔══╝░░░╚═══██╗
///██████╦╝╚██████╔╝██║░╚███║██████╔╝███████╗███████╗██████╔╝
///╚═════╝░░╚═════╝░╚═╝░░╚══╝╚═════╝░╚══════╝╚══════╝╚═════╝░

/// creates a truck bundle for a user
export const createVehicleBundle = async (email,discount_percent,discount_flat) => {
  const data = {email:`${email}`, discount_percent:discount_percent,discount_flat:discount_flat}
  let response
  try {
    response = await axios.post(
    url + `/vehicle_bundle_profile`, data
  )} catch (err) {
    console.log(err)
  }
  return response.data
}

/// gets all truck bundles of a user
export const getUserTruckBundles = async (email) => {
  let response
  try {
    response = await axios.get(
    url + `/vehicle_bundle_profile?email=${email}`
  )} catch (err) {
    console.log(err)
  }
  return response.data
}

/// adds a vehicle to a bundle given a bundle_id and the truck_id of the truck you wish to add
export const addVehicleToBundle = async (bundle_id,truck_id) => {
  const data = {bundle_id:bundle_id, truck_id:truck_id}
  let response
  try {
    response = await axios.post(
    url + `/vehicle_to_bundle`, data
  )} catch (err) {
    console.log(err)
  }
  return response.data
}

/// return a list of the trucks in a bundle
export const getBundleTrucks = async (bundle_id) => {
  let response
  try {
    response = await axios.get(
    url + `/bundle_vehicle?bundle_id=${bundle_id}`
  )} catch (err) {
    console.log(err)
  }
  return response.data
}

// to remove from rental page when rented
export const updateTruckAvailability = async (truck_id, is_available) => {
  try {
    const response = await axios.put(url + `/truck/update_availability?truck_id=${truck_id}&is_available=${is_available}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getTruckCities = async (truck_id) => {
  try {
    const response = await axios.get(url + `/truck_cities?truck_id=${truck_id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};


/// removes a vehicle to a bundle given a bundle_id and the truck_id of the truck you wish to delete
export const removeVehicleFromBundle = async (bundle_id,truck_id) => {
  const data = {bundle_id:bundle_id, truck_id:truck_id}
  let response
  try {
    response = await axios.delete(
    url + `/vehicle_to_bundle`, data
  )} catch (err) {
    console.log(err)
  }
  return response.data
}

// Add a rented truck by user_id, truck_id, start_date, and end_date
export const addToUserRentedTrucks = async (user_id, truck_id, start_date, end_date) => {
  const data = { user_id, truck_id, start_date, end_date };
  let response;
  try {
    response = await axios.post(url + '/user_rented_trucks', data);
  } catch (err) {
    console.log(err);
  }
  return response.data;
};

// Get user rented trucks by user_id
export const getUserRentedTrucks = async (user_id) => {
  let response;
  try {
    response = await axios.get(url + `/user_rented_trucks?user_id=${user_id}`);
  } catch (err) {
    console.log(err);
  }
  return response.data;
};
