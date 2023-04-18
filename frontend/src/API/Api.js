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
    )
  } catch (err) {
    console.log(err)
  }
  return response.data["0"]
}

export const getTrucksByEmail = async (email) => {
  let response
  try {
    response = await axios.get(
      url + `/user_trucks?email=${email}`
    )
  } catch (err) {
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
    )
  } catch (err) {
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
    )
  } catch (err) {
    console.log(err)
  }
  return response.data["0"]
};

// update password at '/user?email='someEmail'' with parameter password
export const updatePassword = async (email, password) => {
  const data = { password: `${password}` }
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

export const getUsers = () => {
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

export const updateTruckAvailability = async (truck_id, is_available) => {
  try {
    const response = await axios.put(url + `/truck/update_availability?truck_id=${truck_id}&is_available=${is_available}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
