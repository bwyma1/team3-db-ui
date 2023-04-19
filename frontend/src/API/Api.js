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

 export const addUser = (user) => {
    axios.post(url + '/user', user).then((res) => {
      console.log(JSON.stringify(res.data))
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
    )} catch (err) {
        console.log(err)
    }
    return response.data["0"]
}

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

export const getTruckReviews = async (truck_id) => {
  let response
  try {
    response = await axios.get(
    url + `/truck_review?truck_id=${truck_id}`
  )} catch (err) {
    console.log(err)
  }
  return response.data
}

export const addTruckReview = async (user_id,truck_id,review_text,review_rating) => {
  const data = {user_id:user_id, review_text:`${review_text}`,review_rating:`${review_rating}`}
  let response
  try {
    response = await axios.post(
    url + `/truck_review?truck_id=${truck_id}`, data
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

export const createVehicleBundle = async (email,discount_percent,discount_flat) => {
  const data = {email:`${email}`, discount_percent:discount_percent,discount_flat:discount_flat}
  let response
  try {
    response = await axios.post(
    url + `/vehicle_bundle`, data
  )} catch (err) {
    console.log(err)
  }
  return response.data
}

export const updateProfile = async (email, bio, prof_pic_choice, location, phone) => {
  const data = {bio:`${bio}`, prof_pic_choice: prof_pic_choice, location:`${location}`, phone:`${phone}`}
  let response
  try {
    response = await axios.put(
  url + `/user?email=${email}`, data
  )} catch (err) {
      console.log(err)
  }
  return response.data
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

  export const getAmenitiesByTruckId = async (truck_id) => {
    let response;
    try {
      response = await axios.get(url + `/amenities?truck_id=${truck_id}`);
    } catch (err) {
      console.log(err);
    }
    console.log(response);
    return response.data;
  };
  