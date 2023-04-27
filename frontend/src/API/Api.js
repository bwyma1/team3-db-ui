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

export const addUser = async (user) => {
  try {
    const response = await axios.post(url + "/user", user);
    console.log("addUser response:", response); // Add this line
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error: User data not saved properly.");
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
};


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
  return response.data[0]
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
  //console.log(response);
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

export const addTruck = async (user_id, model, make, year, mileage, max_miles, long_discount_days, long_discount_percent, long_discount_flat,truck_image, truck_capacity,cargo_capacity,price) => {
  const data = {user_id:user_id, model:`${model}`, make:`${make}`, year:`${year}`, mileage:`${mileage}`, max_miles:max_miles, long_discount_days:long_discount_days, 
    long_discount_percent:long_discount_percent, long_discount_flat:long_discount_flat,truck_image:`${truck_image}`,truck_capacity:truck_capacity,cargo_capacity:cargo_capacity,price:price}
  let response
  try {
    response = await axios.post(
    url + `/truck`, data
  )} catch (err) {
    console.log(err)
  }
  return response
}

export const updateTruckById = async (id, year, make, model, mileage, maxMiles, ldDays, ldFlat, ldPercent, truck_capacity, cargo_capacity, price, truck_image) => {
  const data = { year: `${year}`, 
    make: `${make}`,
    model: `${model}`,
    mileage: `${mileage}`,
    max_miles: `${maxMiles}`,
    long_discount_days: `${ldDays}`,
    long_discount_flat: `${ldFlat}`,
    long_discount_percent: `${ldPercent}`,
    truck_capacity:`${truck_capacity}`,
    cargo_capacity:`${cargo_capacity}`,
    price:`${price}`,
    truck_image:`${truck_image}`
}
  let response
  try {
    console.log("DATA: ", data);
    response = await axios.put(
      url + `/truck?truck_id=${id}`, data
    )
  } catch (err) {
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
  const data = {bundle_id, truck_id}
  console.log("data: ", data);
  try {
    await axios.delete(
    url + `/vehicle_to_bundle`, {data:data}
  )} catch (err) {
    console.log(err)
  }
}

export const getAllBundles = async () => {
  let response;
  try {
    response = await axios.get(url + `/all_bundles`);
  } catch (err) {
    console.log(err);
  }
  return response.data;
};

export const addToUserBundleTrucks = async (user_id, trucks, startDate, endDate, city) => {
  const rentedTrucksPromises = trucks.map((truck) =>
    axios.post(url + '/user_rented_trucks', {
      user_id: user_id,
      truck_id: truck.truck_id,
      start_date: startDate,
      end_date: endDate,
      city: city,
    })
  );
  return Promise.all(rentedTrucksPromises);
};

export const updateBundleAvailability = async (bundle_id, is_available) => {
  try {
    const response = await axios.put(url + `/update_bundle_availability`, { bundle_id, is_available });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};


// Add a rented truck by user_id, truck_id, start_date, and end_date
export const addToUserRentedTrucks = async (user_id, truck_id, start_date, end_date, city) => {
  const data = { user_id, truck_id, start_date, end_date, city };
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

// Update rented truck information by truck_rent_id
export const updateUserRentedTruck = async (truck_rent_id, end_date, city) => {
  const data = { end_date, city };
  let response;
  try {
    response = await axios.put(`${url}/user_rented_trucks/${truck_rent_id}`, data);
  } catch (err) {
    console.log(err);
  }
  return response.data;
};


export const postCity = async (name) => {
  try {
      const response = await axios.post(`${url}/city`, {name});
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('Error while posting city:', error);
  }
};

export const getCity = async (name) => {
  try {
      const response = await axios.get(`${url}/city?name=${name}`);
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('Error while getting city:', error);
  }
};

// Add a truck-city relationship
export const postTruckCity = async (truck_id, city_id) => {
  try {
      const response = await axios.post(`${url}/truck_city`, {truck_id, city_id});
      console.log(response.data);
  } catch (error) {
      console.error('Error while posting truck-city relationship:', error);
  }
};