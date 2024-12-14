export const fetchUserData = async () => {
  const email = window.localStorage.getItem('email');
  try {
    const response = await fetch(`http://localhost:3000/api/user/getuser?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error fetching user data:', err);
  }
};

export const fetchMotherData = async (motherId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/mother/getMother/${motherId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const motherInfo = await response.json();
    return motherInfo;
  } catch (err) {
    console.log('Error fetching mother data:', err);
  }
};
export const fetchInfantData = async (infantId) => {
  try {
    const response = await fetch(`http://localhost:3000/api/infant/getChild/${infantId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const infantInfo = await response.json()
    return infantInfo
  }catch(err) {
    console.log(err)
  }
}
