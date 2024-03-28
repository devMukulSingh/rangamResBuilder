import axios from "axios";

export const setGoalInCookies = async (goal: string) => {
  try {
    const { data } = await axios.post(`/api/set-goal`, {
      goal,
    });
    return data;
  } catch (e) {
    console.log(`Error in setGoal POST req ${e}`);
  }
};
