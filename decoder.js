// Import the nodeJS filesystem module
const fs = require("fs");

// Function to split an array of number/word pairs into an object containing key:value pairs
function splitArray(array) {
  return array.reduce((result, element) => {
    // Split the element into number and word
    const [number, word] = element.split(" ");
    // Convert the number to a numeric value and assign it as key with word as value
    result[parseInt(number)] = word;
    return result;
  }, {});
}

// Function that generates the keys based on the pyramid structure
function cipher(input) {
  const keys = [];

  for (let i = 1, index = 0; index < input.length; i++) {
    keys.push(index + i);
    index += i;
  }

  return keys;
}

// Function to decode the message using the generated keys
function decode(input) {
  try {
    // Read the content of the input file
    const content = fs.readFileSync(input, "utf8");
    // Split the content into lines
    const lines = content.split("\n");

    // Generate keys using the cipher function
    const code = cipher(lines);
    // Split the lines into key:value pairs
    const keyPairs = splitArray(lines);

    // Decode the key:value pairs using the cipher and join the words into a string
    const message = code.map((key) => keyPairs[key]).join(" ");
    console.log(message);
    return message;
  } catch (error) {
    // Handle errors related to file reading
    console.error("Error reading file:", error.message);
  }
}

// Call the decode function with the input file
decode("input.txt");
