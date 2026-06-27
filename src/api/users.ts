import type { NewUserData } from "../App";

type RandomUserApiResponse = {
  results: Array<{
    gender: "male" | "female";
    name: {
      first: string;
      last: string;
    };
    email: string;
    dob: {
      date: string;
    };
    phone: string;
    location: {
      street: {
        name: string;
        number: number;
      };
      postcode: string;
      city: string;
      country: string;
    };
    picture: {
      large: string;
    };
  }>;
};

function mapGender(gender: "male" | "female"): string {
  return gender === "male" ? "Männlich" : "Weiblich";
}

async function getRandomUserTemplate(): Promise<NewUserData> {
  const response = await fetch(
    "https://randomuser.me/api/?nat=de&inc=gender,name,location,email,dob,phone,picture",
  );

  if (!response.ok) {
    throw new Error("Random User API konnte nicht geladen werden.");
  }

  const data = (await response.json()) as RandomUserApiResponse;
  const user = data.results[0];

  return {
    username: `${user.name.first} ${user.name.last}`,
    birthdate: user.dob.date.slice(0, 10),
    gender: mapGender(user.gender),
    email: user.email,
    address: `${user.location.street.name} ${user.location.street.number}, ${user.location.postcode} ${user.location.city}, ${user.location.country}`,
    phone: user.phone,
    website: "",
    avatarUrl: user.picture.large,
  };
}

function getUsers() {
  return fetch("/api/users")
    .then((response) => response.json())
    .then((data) => data.users);
}

function createUser(newUser: NewUserData) {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => response.json())
    .then((data) => data.user);
}

function updateUser(userId: string, updatedData: NewUserData) {
  return fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => response.json())
    .then((data) => data.user);
}

function deleteUser(userId: string) {
  return fetch(`/api/users/${userId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => data.user);
}

export { getUsers, createUser, updateUser, deleteUser, getRandomUserTemplate };
