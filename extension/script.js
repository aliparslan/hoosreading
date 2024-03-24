import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                "role": "system",
                "content": "You are a helpful assistant. Take the following text and modify it so it is of a elementary school (age 10) reading comprehension but contains the same content."
            },
            {
                "role": "user",
                "content": "Photosynthesis is a complex biochemical process through which plants, algae, and some bacteria convert carbon dioxide and water into glucose and oxygen, using sunlight as an energy source. This reaction not only fuels the organism's own cellular activities but also contributes to the global oxygen and carbon cycles, playing a crucial role in maintaining the Earth's atmosphere and ecological balance."
            }],
        model: "gpt-3.5-turbo",
    });

    // console.log(completion)
    console.log(completion.choices[0]);
}
main();