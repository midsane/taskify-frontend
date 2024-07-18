import { defer, json, redirect } from "react-router-dom";
export const baseURl = "https://taskify-backend-nu.vercel.app/";

export const addImageToDb = async (pfp) => {
  const token = localStorage.getItem("token");
  const response = await fetch(baseURl + "profile/pfp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ pfp }),
  });

  if (response.status == 403) {
    throw json({ message: "user not authenticated" }, { status: 403 });
  }
  if (!response.ok) {
    throw json({ message: "internal server error" }, { status: 500 });
  }
};

export const updateUsername = async (username) => {
  console.log(username);
  const token = localStorage.getItem("token");
  const response = await fetch(baseURl + "profile/username", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ username }),
  });

  if (response.status == 403) {
    throw json({ message: "user not authenticated" }, { status: 403 });
  }
  if (!response.ok) {
    throw json({ message: "internal server error" }, { status: 500 });
  }
};

export const addTask = async (data) => {
  const token = localStorage.getItem("token");
  const response = await fetch(baseURl + "profile/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  if (response.status == 403) {
    throw json({ message: "user not authenticated" }, { status: 403 });
  }
  if (!response.ok) {
    throw json({ message: "internal server error" }, { status: 500 });
  }
};

export const ChangeStatus = async (status, taskId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(baseURl + "profile/tasks/status/update", {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId, status }),
  });
};

export const getUsersRankfnc = async () => {
  const response = await fetch(baseURl + "top-users");
  const resData = await response.json();

  const userRankList = resData.userlist.sort(
    (user1, user2) => user2.taskifyPoints - user1.taskifyPoints
  );

  return userRankList;
};

export const getUsersRank = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/auth?mode=login");
  }
  return {
    userRankList: getUsersRankfnc(),
  };
};

export const updateTaskBody = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(baseURl + "profile/tasks/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok)
      throw json({ message: "could not update the task" }, { status: 300 });
  } catch {
    throw json(
      {
        message:
          "something went wrong in updating the task, internal server error",
      },
      { status: 500 }
    );
  }

  return redirect("/profile");
};

export const deleteTaskBody = async (taskId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(baseURl + "profile/tasks", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ taskId }),
    });

    if (!response.ok)
      throw json({ message: "could not delete the task" }, { status: 300 });
  } catch {
    throw json(
      {
        message:
          "something went wrong in deleting the task, internal server error",
      },
      { status: 500 }
    );
  }
};
