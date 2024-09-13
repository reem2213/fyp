import axios from 'axios';

export const getGPTResponse = async (messages, temperature = 0.3) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You generate gym workout programs. You create a 5-day per week workout plan based on the user's gender, age, weight, height, goal, medical condition, and place of exercise. The plan should specify the muscle group targeted each day, the name of the exercise, the duration of the exercises, sets and reps, and the level of difficulty. Format the response clearly and concisely."
          },
          ...messages
        ],
        temperature: temperature,
      },
      {
        headers: {
          'Authorization': `Bearer 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`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching GPT response:', error);
    throw error;
  }
};
