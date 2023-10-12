import OpenAI from 'openai'

const fetchGPTResponse = async (prompt) => {

    const openai = new OpenAI({
        apiKey: `${process.env.REACT_APP_KEY}`,
        dangerouslyAllowBrowser: true
    });

    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',
        });
        return chatCompletion.choices[0].message.content;
    } catch (error) {
        console.log(error);
    }
}

export default fetchGPTResponse;